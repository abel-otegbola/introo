import { BookOpenIcon, BriefcaseIcon, InfoIcon, NetworkIcon, SearchCheckIcon, UsersIcon } from "lucide-react";

export default function ResourcesSubMenu() {
    return (
        <div className="grid grid-cols-2 gap-8">
            <div className="flex flex-col gap-2">
                <p className="opacity-50 uppercase text-[12px] p-2">Resources</p>
                {
                    [
                        {
                            id: 0,
                            title: "Financial insights",
                            icon: <BookOpenIcon strokeWidth={1} size={28} />,
                            text: "Practical perspectives to help you understand your money, spot patterns, and make more informed decisions."
                        },
                        {
                            id: 1,
                            title: "Planning guides",
                            icon: <SearchCheckIcon strokeWidth={1} size={28} />,
                            text: "Clear guidance for building a budget, reaching your goals, and creating a financial plan that lasts."
                        },
                        {
                            id: 2,
                            title: "Spendy community",
                            icon: <NetworkIcon strokeWidth={1} size={28} />,
                            text: "Learn alongside people who are building better habits, growing their wealth, and taking control of their future."
                        },
                    ].map(item => (
                        <div key={item.id} className="flex items-start gap-2 p-2 pb-3 hover:bg-muted/[0.5] cursor-pointer rounded-[10px]">
                            {item.icon}
                            <div className="flex flex-col gap-1">
                                <h3 className="font-medium">{item.title}</h3>
                                <p className="opacity-75">{item.text}</p>
                            </div>
                        </div>
                    ))
                }
            </div>
            <div className="flex flex-col gap-2">
                <p className="opacity-50 uppercase text-[12px] p-2">Company</p>
                {
                    [
                        {
                            id: 0,
                            title: "About Spendy",
                            icon: <InfoIcon strokeWidth={1} size={28} />,
                            text: "Discover the thinking behind Spendy and our mission to make confident financial decisions feel simpler."
                        },
                        {
                            id: 1,
                            title: "Careers",
                            icon: <BriefcaseIcon strokeWidth={1} size={28} />,
                            text: "Join a thoughtful team building better tools for how people manage, understand, and grow their money."
                        },
                        {
                            id: 2,
                            title: "Community",
                            icon: <UsersIcon strokeWidth={1} size={28} />,
                            text: "Connect with people sharing practical ideas, honest lessons, and progress on the road to financial clarity."
                        },
                    ].map(item => (
                        <div key={item.id} className="flex items-start gap-2 p-2 pb-3 hover:bg-muted/[0.5] cursor-pointer rounded-[10px]">
                            {item.icon}
                            <div className="flex flex-col gap-1">
                                <h3 className="font-medium">{item.title}</h3>
                                <p className="opacity-75">{item.text}</p>
                            </div>
                        </div>
                    ))
                }
            </div>
        </div>
    )
}