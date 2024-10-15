import Image from "next/image"
import Expand from "components/expand"
import { Photo } from "lib/definitions"

export default function PhotoCard({ photo, onClick }: { photo: Photo, onClick: () => void }) {
    return (
        <div
            key={photo.id}
            className="group flex float-left relative w-full h-fit p-[2px] rounded cursor-pointer"
            onClick={onClick}
        >
            <div className="relative w-full rounded bg-[#dfdfdf] dark:bg-[#3a3a3a]">
                <Expand />
                <Image
                    src={photo.url} alt={photo.id}
                    width={photo.width} height={photo.height}
                    className="w-full h-auto rounded"
                    quality={100}
                    loading="lazy"
                />
            </div>
        </div>
    )
}