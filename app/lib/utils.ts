import { photoProps, folderProps } from "lib/definitions"

export const validatePhotoData = ({ id, webContentLink, imageMediaMetadata }: photoProps): boolean => {
    return [id, webContentLink, imageMediaMetadata, imageMediaMetadata?.width, imageMediaMetadata?.height].every(attr => attr)
}

export const validateFolderData = ({ id, name }: folderProps): boolean => {
    return [id, name].every(attr => (attr !== null) && (attr !== undefined) && (attr !== ""))
}

export const verifyColor = (color: number): boolean => Number.isInteger(color) && (color >= 0) && (color <= 255)

export const colorConsole = (text: string, fg: number, bg: number) => {
    if (!verifyColor(fg) || !verifyColor(bg))
        return text

    return `\x1b[38;5;${fg}m\x1b[48;5;${bg}m${text}\x1b[0m` // *
}

export const colorConsoleForeground = (text: string, color: number): string => {
    if (!verifyColor(color))
        return text

    return `\x1b[38;5;${color}m${text}\x1b[0m` // *
}

export const colorConsoleBackground = (text: string, color: number): string => {
    if (!verifyColor(color))
        return text

    return `\x1b[48;5;${color}m${text}\x1b[0m` // *
}

// * https://en.wikipedia.org/wiki/ANSI_escape_code#8-bit