import type { Photo, Folder } from "lib/definitions"
import * as utils from "lib/utils"
import { google } from "googleapis"

// google drive API authentication
const googleAuth = new google.auth.JWT(
    process.env.CLIENT_EMAIL,
    undefined,
    process.env.PRIVATE_KEY,
    ['https://www.googleapis.com/auth/drive.readonly']
)
// google drive API access
const driveAPI = google.drive({ version: 'v3', auth: googleAuth })

// list photos by parent folder idk
export async function listPhotos(folderId: string): Promise<Photo[]> {
    const response = await driveAPI.files.list({
        q: `'${folderId}' in parents`,
        fields: 'nextPageToken,files(id,webContentLink,imageMediaMetadata)',
        key: process.env.API_KEY
    })

    // if files is undefined, null or empty, log API response and throw error
    if (!response.data.files) {
        console.log(response)
        throw new Error('response.data.files is undefined, null or empty')
    }

    return response.data.files
        .filter((file) => {
            // if photo data fails validation, log data and return false
            if (!utils.validatePhotoData(file)) {
                console.log(file)
                console.log(utils.colorConsoleForeground('[!] photo failed validation [!]', 9))
                return false
            }
            return true
        })
        .map(({ id, webContentLink, imageMediaMetadata }) => ({
            id: id!,
            url: webContentLink!.replace('&export=download', ''),
            width: imageMediaMetadata!.width!,
            height: imageMediaMetadata!.height!
        }))
}

// get folder by name in main drive
export async function getFolder(name: string): Promise<Folder | undefined> {
    const response = await driveAPI.files.list({
        q: `'${process.env.DRIVE_ID}' in parents and name='${name}'`,
        pageSize: 1,
        fields: 'files(id,name)',
        key: process.env.API_KEY
    })

    // if files is undefined, log API response and return undefined
    if (!response.data.files) {
        console.log(response)
        console.log(utils.colorConsoleForeground('response.data.files is undefined, null or empty', 9))
        return
    }

    // if folder data fails validation, log folder data and return undefined
    if (!utils.validateFolderData(response.data.files[0])) {
        console.log(response.data.files[0])
        console.log(utils.colorConsoleForeground('folder data failed validation', 9))
        return
    }

    return {
        id: response.data.files[0].id!,
        name: response.data.files[0].name!
    }
}

// list folders by parent folder id
export async function listFolders(folderId: string): Promise<Folder[]> {
    const response = await driveAPI.files.list({
        q: `'${folderId}' in parents`,
        fields: 'files(kind,id,name,webContentLink)',
        key: process.env.API_KEY
    })
    // if files is undefined, log API response and throw error
    if (response.data.files === undefined || response.data.files === null) {
        console.log(response)
        throw new Error('response.data.files is undefined or null')
    }

    console.table(response.data.files)

    const folders = (await Promise.all(
        response.data.files
            .filter(file => file.webContentLink === undefined)
            .map(async (file) => ({
                id: file.id!,
                name: file.name!,
                backgroundImage: await getBackgroundImage(file.id!)
            }))
    ))

    // return only validated folders
    return folders.filter(utils.validateFolderData)
}

// get folders first image url by folder id
export async function getBackgroundImage(folderId: string): Promise<string | undefined> {
    const response = await driveAPI.files.list({
        q: `'${folderId}' in parents`,
        pageSize: 1,
        fields: 'files(webContentLink)',
        key: process.env.API_KEY
    })
    // if files is undefined, log API response and throw error
    if (!response.data.files) {
        console.log(response)
        console.log(utils.colorConsoleForeground('response.data.files is null, undefined or empty', 9))
        return
    }

    return response.data.files[0].webContentLink?.replace('&export=download', '')
}