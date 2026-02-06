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
            <div className="flex flex-wrap gap-4 justify-between items-center p-3 border-b border-gray-500/[0.1]">
              <span></span>

              <div className="flex items-center gap-6">
                <Button href="/account/create-video">Create Pitch</Button>
                <button><Link href="/some-path"><BellIcon size={20} /></Link></button>
                <div className="flex gap-2 items-center">
                  <div className="h-10 w-10 rounded-full bg-gray-100 outline outline-offset-2 outline-secondary/[0.2]"></div>
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