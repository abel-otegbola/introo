'use client'
import { useState } from 'react';
import ScrollTextReveal from "../animations/scroll-text-reveal";
import Link from "next/link";
import AnimateHeading from "../animations/animateHeading";
import { ChevronDownIcon } from "lucide-react";
import ResourcesSubMenu from "../subMenus/resourcesSubMenu";
import ThemeSelector from "../themeSelector/ThemeSelector";
import Button from '../button/Button';

export default function Topbar() {
    const [open, setOpen] = useState(false)
    const [openSubMenu, setOpenSubMenu] = useState("")

    return (
        <div className="flex items-center justify-between lg:px-[10%] md:px-[5%] px-[5%] backdrop-blur-sm bg-white/80 dark:bg-[#212121]/60 py-2 sticky top-0 z-10">
            <Link href={"/"} className="flex items-center gap-2 md:min-w-[16%]">
                {/* <img src="/logo.png" className="w-[40px] h-[36px]" /> */}
                <div className="flex gap-1 items-center">
                    <h1 className="tracking-[-3%] text-[17px] font-semibold">Introo.</h1>
                </div>
            </Link>
            <div className="items-center gap-4 text-[14px] md:flex hidden">
                {
                    [
                        { id: 0, title: "Discover", href: "#Discover" },
                        { id: 1, title: "Editor", href: "#Editor" },
                        { id: 2, title: "Pricing", href: "#Pricing" },
                        { id: 3, title: "Resources", href: "#", subMenu: <ResourcesSubMenu /> },
                        { id: 4, title: "Templates", href: "/Templates" },
                    ].map(link => (
                        <div key={link.id}>
                            <Link 
                                className="px-2 py-2 capitalize flex gap-1 items-center" 
                                href={link.href}
                                onClick={() => {
                                    // scroll to top of page
                                    
                                    setOpenSubMenu(!link.subMenu ? "" : openSubMenu === link.title ? "" : link.title )
                                    window.scrollTo({ top: 0, behavior: 'smooth' });
                                }}
                            >
                                <span className="font-medium">{link.title}</span>
                                { link?.subMenu && <ChevronDownIcon className={`duration-500 ${!link.subMenu ? "rotate-[180deg]" : openSubMenu === link.title ? "rotate-[180deg]" : ""}` } size={14} /> }
                            </Link>
                            <div className={`lg:w-[70%] md:w-[90%] mx-auto absolute left-[15%] duration-500 ${openSubMenu === link.title ? "top-[54px] opacity-100": "top-[-1000%] opacity-0"} z-[-1]`}>
                                <div className="px-[3%] py-8 w-full bg-white dark:bg-[#101010] border border-gray-500/[0.1] md:rounded-[12px] rounded-md shadow-[0px_20px_120px_0px_#10101020] duration-300">
                                { link?.subMenu && link.subMenu }
                                </div>
                            </div>
                            </div>
                    ))
                }
            </div>
            <div className="md:flex hidden items-center gap-3">
                <ThemeSelector openSidebar={open} />
                <Button size={"sm"} >
                    Sign up
                </Button>
            </div>

            <ul className={`
                md:hidden fixed top-0 right-0 z-20 flex lg:flex-row flex-col justify-between lg:px-0 md:py-0 py-2 pb-8 px-6 bg-white dark:bg-[#000] lg:w-auto md:h-full h-screen w-full overflow-hidden
                ${open ? "translate-y-[0px] w-full" : "lg:translate-y-[0] -translate-y-[120%] lg:w-auto w-0"} duration-500
            `}>
                <AnimateHeading tag={"h1"} repeat={open} className="tracking-[10%] font-bold text-[16px] uppercase p-2">Introo.</AnimateHeading>
                <div className="flex flex-col mx-2">
                <p className="opacity-50 uppercase text-[12px] my-4">menu</p>
                {
                    
                    [
                        { id: 0, title: "Discover", href: "#Discover" },
                        { id: 1, title: "Resources", href: "#resources" },
                        { id: 2, title: "Editor", href: "#Editor" },
                        { id: 3, title: "Pricing", href: "#Pricing" },
                        { id: 4, title: "FAQs", href: "#faqs" },
                        { id: 5, title: "Templates Us", href: "/Templates" },
                    ].map(link => (
                            <Link
                                key={link.id}
                                href={link.href} 
                                className={`py-2 duration-300`}
                                onClick={() => {
                                    setOpen(false)
                                    // scroll to top of page
                                    window.scrollTo({ top: 0, behavior: 'smooth' });
                                }}
                            >
                                <ScrollTextReveal repeat={open} delay={0.1 * (link.id + 1)}>
                                    {link.title}
                                </ScrollTextReveal>
                            </Link>
                    ))
                }
                    <Button variant="tertiary" className="w-full mt-6" >Sign in</Button>  
                    <Button className="w-full mt-6" >Sign up</Button>  
                </div>
                <div className="flex flex-col gap-2">
                    <p className="opacity-50 uppercase text-[12px] mx-2">Templates</p>
                    <Link href="mailto:info@spendy.com" className="mx-2 my-2 text-lg opacity-70">info@introo.com</Link>
                </div>
            </ul>
            
            <button className="md:hidden flex flex-col justify-center items-end gap-1 text-lg w-10 h-10 sm::hidden z-[50]" onClick={() => setOpen(!open)}>
                <span className={`w-[8px] h-[2px] py-[1px] px-[10px] duration-500 transition-all bg-black dark:bg-white rounded-[2px] ${open ? "rotate-[45deg] translate-y-[5px]" : "rotate-[0deg]"}`}></span>
                <span className={`duration-500 transition-all bg-black dark:bg-white rounded-[2px] ${open ? "py-[0px] w-[0px] h-[0px] translate-x-[-24px]" : "py-[1px] px-[8px] w-[8px] h-[2px]"}`}></span>
                <span className={`w-[8px] h-[2px] py-[1px] duration-500 transition-all bg-black dark:bg-white rounded-[2px] ${open ? "rotate-[-45deg] translate-y-[-5px] px-[10px] " : "rotate-[0deg] px-[6px]"}`}></span>
            </button>
        </div>
    )
}