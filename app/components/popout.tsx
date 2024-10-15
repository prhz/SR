import Image from "next/image"

export default function Popout({ popout, onClick }: { popout: string, onClick: () => void }) {
    const styles = [
        'w-[100vw] h-[100vh]',
        'flex justify-center items-center',
        'fixed z-10 inset-0',
        'bg-[#000000] bg-opacity-80 backdrop-blur-sm'
    ]

    return (
        <div className={styles.join(' ')} onClick={onClick}>
            <div className="absolute inset-0">
                <Image
                    src={popout}
                    alt="popout"
                    fill
                    priority
                    className="object-contain p-10"
                />
            </div>
        </div>
    )
}