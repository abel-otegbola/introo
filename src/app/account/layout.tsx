'use client'
import Button from "@/components/button/Button";
import Sidebar from "@/components/sidebar/sidebar"
import { BellIcon } from "@phosphor-icons/react";
import Link from "next/link";

function AcoountLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="flex">
        <Sidebar />
        <div className="flex-1">
            <div className="flex flex-wrap sticky top-0 gap-4 justify-between items-center p-4 border-b border-gray-500/[0.1]">
              <span></span>

              <div className="flex items-center gap-6">
                <Button href="/account/create-video">Create Pitch</Button>
                <Link href="/inbox"> <button className="p-[8px] rounded-full bg-gray-100 dark:bg-gray-500/[0.05] border border-gray-500/[0.1]"><BellIcon size={20} /></button></Link>
                <div className="flex gap-2 items-center md:mr-0 mr-[64px]">
                  <div className="h-8 w-8 rounded-full bg-gray-100 dark:bg-gray-500/[0.05] outline outline-offset-2 outline-secondary/[0.2]"></div>
                  <div className="flex-col gap-1 md:flex hidden">
                    <p className="font-semibold">Thomas Bill</p>
                    <p className="text-[12px] opacity-[0.7]">ThomasBill@gmail.com</p>
                  </div>
                </div>
              </div>
            </div>
            { children }
        </div>
    </div>
  )
}

export default AcoountLayout