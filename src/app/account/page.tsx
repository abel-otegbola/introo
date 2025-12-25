'use client';
import { UserCircleIcon, UploadSimpleIcon, AddressBookIcon, VideoCameraIcon } from "@phosphor-icons/react";

function DashboardPage() {
  const steps = [
    {
      title: "Set up your profile",
      description: "Add your personal information and professional details to get started",
      icon: UserCircleIcon,
    },
    {
      title: "Upload project portfolio & visuals",
      description: "Showcase your best work with project images and details",
      icon: UploadSimpleIcon,
    },
    {
      title: "Enter lead information",
      description: "Add your prospect's details to personalize your pitch",
      icon: AddressBookIcon,
    },
    {
      title: "Create your video pitch",
      description: "Generate an AI-powered video that wins clients",
      icon: VideoCameraIcon,
    },
  ];

  return (
    <div className="flex flex-col items-center justify-center gap-6 min-h-screen p-6">
        <div className="flex flex-col gap-6 max-w-4xl w-full">
            <div className="flex flex-col gap-2 text-center">
              <h1 className="font-bold text-2xl">Welcome Janet</h1>
              <p className="text-gray-500">Get started in four simple steps</p>
            </div>

            <div className="grid md:grid-cols-2 gap-4 mt-4">
              {steps.map((step, index) => {
                const Icon = step.icon;
                return (
                  <div key={index} className="flex gap-4 p-6 border border-gray-200 dark:border-gray-800 rounded-xl hover:border-gray-300 dark:hover:border-gray-700 transition-colors">
                    <div className="w-12 h-12 rounded-full bg-secondary/10 flex items-center justify-center flex-shrink-0">
                      <Icon size={24} className="text-secondary" weight="duotone" />
                    </div>
                    <div className="flex flex-col gap-2">
                      <div className="flex items-center gap-2">
                        <span className="text-sm font-semibold text-secondary">Step {index + 1}</span>
                      </div>
                      <h3 className="font-medium text-lg">{step.title}</h3>
                      <p className="text-sm text-gray-500">{step.description}</p>
                    </div>
                  </div>
                );
              })}
            </div>
        </div>
    </div>
  )
}

export default DashboardPage