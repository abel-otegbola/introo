'use client';
import { useState } from "react"

function DashboardPage() {
  const [active, setActive] = useState("For you")

  return (
    <div className="flex flex-col gap-6 min-h-screen">
        <div className="flex lg:flex-row flex-col gap-4 md:px-4 h-full">
          <div className="lg:w-[65%] w-full p-4 mt-4 flex flex-col gap-4 mb-6 md:rounded-lg">
            <div>
              <h1 className="text-2xl font-medium mb-2">Discover</h1>
              <p className="opacity-[0.6]">Check out new sermons for you.</p>
            </div>

            <div className="flex gap-4 w-full border-b border-gray-500/[0.2] text-[14px]">
              {
                ["For you", "Popular"].map(tab => (
                  <button 
                    onClick={() => setActive(tab)} 
                    key={tab}
                    className={`py-4 cursor-pointer border-b ${active === tab ? "border-secondary font-medium" : "border-transparent opacity-50"}`}
                  >{tab}</button>
                ))
              }
            </div>

            {
              [
                { id: 1, title: "The Power of Faith", description: "Discover the transformative power of faith in your life.", author: "John Doe", date: "2023-09-15",  },
                { id: 2, title: "Overcoming Challenges", description: "Learn how to overcome life's challenges with resilience.", author: "Jane Smith", date: "2023-09-14" },
                { id: 3, title: "The Path to Inner Peace", description: "Explore the journey to inner peace and tranquility.", author: "Emily Johnson", date: "2023-09-13" },
              ].map(() => {
                
              })
            }
          </div>
        </div>
    </div>
  )
}

export default DashboardPage