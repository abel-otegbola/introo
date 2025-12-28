import LeftSidebar from '@/components/createVideo/LeftSidebar';

function CreateVideoPage() {
  return (
    <div className="flex h-screen overflow-hidden">
      {/* Left Sidebar */}
      <LeftSidebar />
      
      {/* Main Content Area - Placeholder for now */}
      <div className="flex-1 flex items-center justify-center bg-gray-50 dark:bg-[#24222D]">
        <div className="text-center">
          <h2 className="text-2xl font-semibold text-gray-700 dark:text-gray-300">
            Canvas Area
          </h2>
          <p className="text-gray-500 dark:text-gray-400 mt-2">
            Main content will be displayed here
          </p>
        </div>
      </div>
      
      {/* Right Sidebar - Placeholder for now */}
      <div className="w-72 bg-white dark:bg-[#1a1a1a] border-l border-gray-200 dark:border-gray-800 flex items-center justify-center">
        <p className="text-gray-500 dark:text-gray-400">Right Sidebar</p>
      </div>
    </div>
  )
}

export default CreateVideoPage