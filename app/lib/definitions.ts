export type Folder = {
    id: string
    name: string
    backgroundImage?: string
}

export type Photo = {
    id: string
    url: string
    width: number
    height: number
}

export type photoProps = {
    id?: string | null
    webContentLink?: string | null
    imageMediaMetadata?: {
        width?: number
        height?: number
    } | null
}

export type folderProps = {
    id?: string | null
    name?: string | null
}

