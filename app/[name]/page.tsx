import * as data from "lib/data"
import Portfolio from "./portfolio"
import { redirect } from "next/navigation"
import { revalidatePath } from "next/cache"

import "@/app/globals.css"

export default async function Page({ params }: { params: { name: string } }) {
    revalidatePath(`/${params.name}`) // clear cache

    const folder = await data.getFolder(decodeURI(params.name)) // get folder
    if (folder === undefined) redirect('/') // redirect to home if folder is not found

    const photos = await data.listPhotos(folder.id) ?? [] //  get photos inside folder

    return (
        <main className="min-h-[79dvh] flex flex-col">
            <text 
                id="portfolio" 
                className="pt-[60px] px-2 text-sm"
            > 
                PORTFÓLIO / {decodeURI(params.name).toUpperCase()} 
            </text>
            <Portfolio photos={photos} />
        </main>
    )
}