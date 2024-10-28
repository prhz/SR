'use client'

import Popout from "components/popout"
import PhotoCard from "components/photo-card"
import { useState } from "react"
import { Photo } from "lib/definitions"

import "@/app/globals.css"

export default function Portfolio({ photos }: { photos: Photo[] }) {
    const [popout, setPopout] = useState<Photo | undefined>(undefined)

    // if document is not undefined, block scroll if a popout exists
    if (typeof document !== "undefined")
        document.body.style.overflow = (popout === undefined) ? 'auto' : 'hidden'

    return (
        <>
            {popout && (<Popout popout={popout.url} onClick={() => { setPopout(undefined) }} />)}

            <div className="flex-inline my-5 columns-sm gap-[4px]">
                {photos.map(photo => (<PhotoCard key={photo.id} photo={photo} onClick={() => { setPopout(photo) }} />))}
            </div>
        </>
    )
}