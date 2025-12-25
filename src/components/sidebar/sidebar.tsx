'use client'
import { useContext, useState, type ReactElement } from "react";
import { useOutsideClick } from "../../customHooks/useOutsideClick";
import { AuthContext } from "@/contexts/AuthContext";
import { usePathname } from "next/navigation";
import { DatabaseIcon, GearIcon, HouseIcon, Icon, LinkSimpleIcon, SidebarIcon, SignOutIcon, VideoCameraIcon, XCircleIcon } from "@phosphor-icons/react";
import Link from "next/link";
import ThemeSelector from "../themeSelector/ThemeSelector";

export interface Link {
    id: number; label: string; icon: ReactElement<Icon>, link: string, subtext?: string
}

function Sidebar() {
    const [open, setOpen] = useState(false)
    const pathname = usePathname();
    const { user, logOut } = useContext(AuthContext);

    // Get user's initials for avatar
    const getUserInitial = () => {
        if (user?.firstname && typeof user.firstname === 'string') {
            return user.firstname.charAt(0).toUpperCase();
        } else if (user?.email && typeof user.email === 'string') {
            return user.email.charAt(0).toUpperCase();
        }
        return 'U';
    };

    const generalLinks: Link[] = [
        { id: 0, label: "Dashboard", icon: <HouseIcon size={20} />, link: "/account" },
        { id: 2, label: "Projects", icon: <DatabaseIcon size={20} />, link: "/account/projects" },
        { id: 3, label: "Videos", icon: <VideoCameraIcon size={20} />, link: "/account/videos" },
        { id: 4, label: "Links", icon: <LinkSimpleIcon size={20} />, link: "/account/links" },
    ]
    
    const otherLinks: Link[] = [
        { id: 1, label: "Settings", icon: <GearIcon size={20} />, link: "/account/settings" },
    ]
    const modalRef = useOutsideClick(setOpen, false)

    return (
        <div className={`md:sticky top-0 left-0 h-screen w-0 duration-500 text-[13px] ${open ? "sm:w-[104px]": "sm:w-[250px]"}`}>
            <button className={`md:absolute fixed sm:top-4 top-3 md:right-5 right-5 flex flex-col justify-center items-center backdrop-blur-md gap-1 w-5 h-8 z-[50] p-[2px] px-[13px] rounded-full`} onClick={() => setOpen(!open)}>
                { open ?
                <XCircleIcon size={24} color="currentColor" />
                :
                <SidebarIcon size={20} color="currentColor" />
                }
            </button>

            <div  className={`fixed top-0 right-0 md:hidden bg-[#000]/[0.5] duration-300 ${open ? "w-full h-full" : "w-0 h-full"}`}></div>
            <div ref={modalRef} className={`flex flex-col justify-between md:h-full bg-white dark:bg-[#000]/[0.2] border-x border-gray-500/[0.1] dark:border-gray-500/[0.2] h-[100vh] md:sticky fixed md:shadow-none shadow-lg md:top-0 top-0 py-4 px-3 right-0 overflow-y-auto overflow-x-hidden z-[5] transition-all duration-700 ${open ? "sm:w-[70px] w-[280px] translate-x-[0px] opacity-[1]": "sm:w-full translate-x-[400px] md:translate-x-[0px] md:opacity-[1] opacity-[0]"}`}>  
                <Link href={"/"} className="flex items-center mb-2">
                    {/* <LogoIcon className="text-primary 2xl:w-[40px] md:w-[32px] w-[24px]" /> */}
                    <h1 className={`font-bold text-[24px] leading-[32px] tracking-[-1%] text-secondary ${open ? "sm:text-[16px]" : ""}`}>Introo.</h1>
                </Link>

                {/* Navigation Links */}
                <div className="flex-1 flex flex-col gap-6">
                    <div className="flex flex-col gap-2">
                        <p className={`text-gray-200 text-[12px] mb-2 ${open ? "sm:opacity-0" : ""}`}>MAIN</p>
                        {
                        generalLinks.map(link => {
                                return (
                                <Link key={link.id} onClick={() => setOpen(false)} href={ link.link} className={`relative flex items-center justify-between px-3 py-[10px] md:rounded-[8px] duration-300 ${pathname.includes(link.link) ? "bg-primary dark:bg-secondary text-white" : "font-medium hover:bg-secondary/[0.2]"}`}>
                                    <div className="flex items-center gap-3">
                                        <span className={`w-[18px] ${pathname.includes(link.link) ? "text-white opacity-100" : ""}`}>{link.icon}</span>
                                        <span className={`flex-1 py-1 break-normal duration-500 ${open ? "sm:hidden" : ""}`}>{link.label} </span>
                                    </div>
                                    { link.subtext ? <span className="flex items-center justify-center bg-primary text-white text-[9px] rounded-full px-[6px]">{link.subtext}</span> : ""}
                                </Link>
                                )
                        })
                        }
                        <p className={`text-gray-200 text-[12px] mb-2 mt-6 ${open ? "sm:opacity-0" : ""}`}>OTHERS</p>
                        {
                       otherLinks.map(link => {
                                return (
                                <Link key={link.id} onClick={() => setOpen(false)} href={ link.link} className={`relative flex items-center justify-between px-3 py-[10px] md:rounded-[8px] duration-300 ${pathname.includes(link.link) ? "bg-primary dark:bg-secondary text-white" : "font-medium hover:bg-secondary/[0.2]"}`}>
                                    <div className="flex items-center gap-3">
                                        <span className={`w-[18px] ${pathname.includes(link.link) ? "text-white opacity-100" : ""}`}>{link.icon}</span>
                                        <span className={`flex-1 py-1 break-normal duration-500 ${open ? "sm:hidden" : ""}`}>{link.label} </span>
                                    </div>
                                    { link.subtext ? <span className="flex items-center justify-center bg-primary text-white text-[9px] rounded-full px-[6px]">{link.subtext}</span> : ""}
                                </Link>
                                )
                        })
                        }
                        
                        <button onClick={() => {setOpen(false); logOut()}} className={`relative flex items-center justify-between px-3 py-[10px] md:rounded-[8px] duration-300 font-medium hover:bg-secondary/[0.2]`}>
                            <div className="flex items-center gap-3">
                                <span className={`w-[18px]`}><SignOutIcon size={20} /></span>
                                <span className={`flex-1 py-1 break-normal duration-500 ${open ? "sm:hidden" : ""}`}>Logout </span>
                            </div>
                        </button>
                    </div>
                </div>

                {/* User Info & Theme Toggle */}
                <div className="flex flex-col gap-3 pt-4 mt-4 border-t border-gray-200 dark:border-gray-800">
                    
                    {/* Theme Selector */}
                    <div className={`${open ? "sm:hidden" : ""}`}>
                        <ThemeSelector />
                    </div>

                    {/* User Info */}
                    {user && (
                        <div className={`flex items-center gap-3 p-1`}>
                            {/* User Avatar */}
                            <div className="w-10 h-10 rounded-full bg-gradient-to-br from-primary to-fuchsia-400 flex items-center justify-center text-white font-bold  flex-shrink-0">
                                {getUserInitial()}
                            </div>
                            
                            {/* User Details */}
                            <div className={`flex-1 min-w-0 ${open ? "sm:hidden" : ""}`}>
                                <p className="font-medium  mb-1">
                                    <span className=" capitalize">{user?.firstname || user?.email?.split('@')[0]}</span>
                                </p>
                                <p className="text-xs text-gray-500 dark:text-gray-400 truncate">
                                    {user.email || ''}
                                </p>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    )
}

export default Sidebar
