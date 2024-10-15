import "@/app/globals.css"

import Image from "next/image"
import { Folder } from "lib/definitions"

export default function PortfolioCard({ folder }: { folder: Folder }) {
    return (
        <a
            className="h-[300px] min-w-[300px] relative rounded bg-[#EEEEEE] dark:bg-[#323232] flex-grow"
            href={`/${folder.name}`}
        >
            <Image
                src={folder.backgroundImage ?? "/img/placeholder_dark.png"}
                alt="" fill className="absolute top-0 left-0 z-1 rounded object-cover hidden dark:block"
            />
            <Image
                src={folder.backgroundImage ?? "/img/placeholder_light.png"}
                alt="" fill className="absolute top-0 left-0 z-1 rounded object-cover block dark:hidden"
            />
            <div className="w-full h-full flex items-end rounded absolute top-0 left-0 z-2 card-gradient">
                <text className="px-4 py-2 h-fit w-fit text-[#fafafa]">
                    {folder.name.toUpperCase()}
                </text>
            </div>
        </a>
    )
}