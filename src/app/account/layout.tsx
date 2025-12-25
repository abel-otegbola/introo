import Sidebar from "@/components/sidebar/sidebar"

function AcoountLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="flex">
        <Sidebar />
        <div className="flex-1 p-6">
            { children }
        </div>
    </div>
  )
}

export default AcoountLayout