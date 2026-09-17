'use client'
import Link from 'next/link';
import AnimateHeading from '../animations/animateHeading';
// import ThemeSelector from '../themeSelector/themeSelector';
// import Image from 'next/image';
import { FacebookLogoIcon, InstagramLogoIcon, TwitterLogoIcon } from '@phosphor-icons/react';

export default function Footer() {
    
    const socialLinks = [
        { id: 'facebook', href: 'https://facebook.com', icon: FacebookLogoIcon },
        { id: 'instagram', href: 'https://instagram.com', icon: InstagramLogoIcon },
        { id: 'twitter', href: 'https://x.com', icon: TwitterLogoIcon },
    ];
    
    return (
        <footer className="child md:pb-0 pb-[32px] dark:bg-[#121212] lg:px-[10%] md:px-[5%] px-6 py-16">
            <div className="grid md:grid-cols-4 sm:grid-cols-3 gap-12 py-[40px]">

            <div className="flex flex-col gap-5">
                <p className="font-medium opacity-50 leading-[24px] tracking-[-0.1%] text-sm uppercase">
                Products
                </p>
                <div className="flex flex-col text-sm">
                    {
                        ["features", "solutions", "pricing", "releases"].map(link => (
                            <Link href={`/${link.replaceAll(" ", "-")}`} className="capitalize font-medium leading-[120%] tracking-[-2%] py-2 hover:text-primary opacity-75" key={link}>{link}</Link>
                        ))
                    }
                </div>            
            </div>
            
            <div className="flex flex-col gap-5">
                <p className="font-medium opacity-50 leading-[24px] tracking-[-0.1%] text-sm uppercase">
                Company
                </p>
                <div className="flex flex-col text-sm">
                    {
                        ["About Us", "Careers", "Contact"].map(link => (
                            <Link href={`/${link.replaceAll(" ", "-")}`} className="capitalize font-medium leading-[120%] tracking-[-2%] py-2 hover:text-primary opacity-75" key={link}>{link}</Link>
                        ))
                    }
                </div>
            </div>

            <div className="flex flex-col gap-5">
                <p className="font-medium opacity-50 leading-[24px] tracking-[-0.1%] text-sm uppercase">
                Resources
                </p>
                <div className="flex flex-col text-sm">
                    {
                        ["blog", "newsletter", "help center"].map(link => (
                            <Link href={`/${link.replaceAll(" ", "-")}`} className="capitalize font-medium leading-[120%] tracking-[-2%] py-2 hover:text-primary opacity-75" key={link}>{link}</Link>
                        ))
                    }
                </div>
            </div>
            
            <div className="flex flex-col gap-5">
                <Link href={"/"} className="flex items-center gap-2 md:min-w-[10%]">
                    {/* <Image src="/Introo.svg" width={26} height={26} alt="Introo Logo" className="w-[26px] h-[26px] rounded" /> */}
                    <div className="flex flex-col gap-0">
                        <AnimateHeading tag={"h1"} className="tracking-[10%] font-bold text-[16px] uppercase">Introo.</AnimateHeading>
                    </div>
                </Link>
                <div className="flex items-center gap-2">
                    {
                        socialLinks.map((link) => (
                            <Link key={link.id} href={link.href} title={link.id} aria-label={link.id} target="_blank" rel="noopener noreferrer" className="p-2 rounded-full border border-gray-500/[0.2]">
                                <link.icon className="h-4 w-4" />
                            </Link>
                        ))
                    }
                </div>
                {/* <ThemeSelector /> */}
            </div>

        </div>

        <div className="flex md:flex-row flex-col gap-8 justify-center md:items-end py-12 border-t border-gray-500/[0.2]">
            <p className="font-medium md:px-8">2026 &copy; Introo. All rights reserved.</p>
        </div>
      </footer>
    )
}