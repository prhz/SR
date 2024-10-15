import Image from "next/image"
import * as dotenv from "dotenv"
import type { Metadata } from "next"
import { Unbounded } from "next/font/google"

import "./globals.css"

dotenv.config()

const unbounded = Unbounded({
    subsets: ['latin']
})

export const metadata: Metadata = {
    title: "SR Fotografia",
    description: "",
}

const contacts = [
    {
        text: '(00) 9 1234-5678',
        icon: 'phone'
    },
    {
        text: 'example@email.com',
        icon: 'email'
    }
]

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
    return (
        <html lang="en">
            <body className={`${unbounded.className} antialiased flex flex-col items-center`}>
                <header className="w-full h-[60px] py-3 pr-7 pl-6 flex justify-between items-center fixed top-0 bg-[#fefefe] dark:bg-[#0a0a0a] z-10">
                    <div>
                        <a title="home" href="/">
                            <Image src="/svg/logo_d.svg" alt="logo" width={75} height={0} className="logo hidden dark:block" />
                            <Image src="/svg/logo_l.svg" alt="logo" width={75} height={0} className="logo block dark:hidden" />
                        </a>
                    </div>
                    <nav className="flex gap-5 no-underline">
                        <div className="group w-fit flex flex-col items-center justify-center">
                            <a href="#portfolio" className="text-xs">PORTFÓLIO</a>
                            <div className="w-0 group-hover:w-full transition-all delay-100 ease-out  h-[2px] bg-[#0a0a0a] dark:bg-[#fafafa]" />
                        </div>
                        <div className="group w-fit flex flex-col items-center justify-center">
                            <a href="#contato" className="text-xs">CONTATO</a>
                            <div className="w-0 group-hover:w-full transition-all delay-50 ease-out  h-[2px] bg-[#0a0a0a] dark:bg-[#fafafa]" />
                        </div>
                    </nav>
                </header>
                {children}
                <footer className="w-full bottom-0 flex flex-col gap-4 dark:bg-[#1f1f1f] bg-[#f1f1f1] min-h-[200px]">
                    <text id="contato">CONTATO</text>
                    <div>
                        {contacts.map(con => (
                            <div key={con.icon} className={`flex items-center gap-2 ${unbounded.className} text-sm`}>
                                <Image
                                    key={con.text}
                                    src={`/svg/${con.icon}_l.svg`}
                                    loading="lazy"
                                    alt={`${con.icon} icon`} height={15} width={15}
                                    className="w-[15px] h-[15px] block dark:hidden"
                                />
                                <Image
                                    key={con.text}
                                    src={`/svg/${con.icon}_d.svg`}
                                    loading="lazy"
                                    alt={`${con.icon} icon`} height={15} width={15}
                                    className="w-[15px] h-[15px] dark:block hidden"
                                />
                                <text>{con.text}</text>
                            </div>
                        ))}
                    </div>
                </footer>
            </body>
        </html>
    )
}