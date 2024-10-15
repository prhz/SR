import Image from "next/image"

export default function Expand() {
    const styles = [
        'w-full h-full',
        'flex items-center justify-center',
        'transition-all delay-50 ease-in',
        'absolute z-5',
        'opacity-0 group-hover:opacity-100'
    ]

    return (
        <div className={styles.join(' ')}>
            <div className="h-[40px] w-[40px] flex items-center justify-center bg-[#000000] opacity-75 rounded-full">
                <Image src="/svg/expand.svg" alt="expand" width={20} height={20} />
            </div>
        </div>
    )
}