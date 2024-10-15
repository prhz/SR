import * as data from "lib/data"
import Image from "next/image"
import PortfolioCard from "components/portfolio-card"
import { Suspense } from "react"
import { revalidatePath } from "next/cache"

import "@/app/globals.css"

export default async function Home() {
    revalidatePath('/') // clear cache

    // if drive id not provided, throw error
    if (process.env.DRIVE_ID === undefined)
        throw new Error('DRIVE_ID is undefined')

    const folders = await data.listFolders(process.env.DRIVE_ID) //  get folders in main folder
    return (
        <main className="min-h-[79dvh] flex flex-col">
            <text id="portfolio" className="px-2 pt-[60px] text-sm"> PORTFÓLIO </text>
            <div className="flex flex-col flex-wrap w-full gap-[4px] justify-center my-5">
                {folders.map(folder => (
                    <Suspense key={folder.id} fallback={
                        <div className="h-[300px] min-w-[300px] relative rounded flex-grow">
                            <Image
                                src="/img/placeholder_dark.png"
                                className="hidden dark:block"
                                alt="placeholder" fill
                            />
                            <Image
                                src="/img/placeholder_light.png"
                                className="dark:hidden"
                                alt="placeholder" fill
                            />
                        </div>
                    }>
                        <PortfolioCard key={folder.id} folder={folder} />
                    </Suspense>
                ))}
            </div>
        </main>
    )
}
