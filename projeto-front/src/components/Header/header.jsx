import { React } from 'react'
import Image from 'next/image'
import logo2 from '@/images/logoamazonia.png'

export default function Header() {
    return (
        <header className="w-full grid justify-items-stretch bg bg-[#DFDFDF] p-1">
            <Image className="justify-self-center" src={logo2} alt="Logo" width={250} height={100} />
        </header>
    )
}
