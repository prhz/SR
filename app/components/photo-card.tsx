import Image from "next/image"
import Expand from "components/expand"
import { Photo } from "lib/definitions"

export default function PhotoCard({ photo, onClick }: { photo: Photo, onClick: () => void }) {
    return (
        <div
            key={photo.id}
            className="relative float-left flex py-[2px] rounded w-full h-fit cursor-pointer group"
            onClick={onClick}
        >
            <div className="relative bg-[#dfdfdf] dark:bg-[#3a3a3a] rounded w-full">
                <Expand />
                <Image
                    src={photo.url} alt={photo.id}
                    width={photo.width} height={photo.height}
                    quality={100}
                    loading="lazy"
                    className="rounded w-full h-auto"
                />
            </div>
        </div>
    )
}