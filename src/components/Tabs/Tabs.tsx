import { FC } from "react"
import { TabsInterface } from "./Tabs.interface"
import { Link, useLocation } from "react-router-dom"

export const Tabs: FC<TabsInterface> = ({ tabsInfo = [] }) => {
  const { pathname } = useLocation()

  return (
    <div className="flex justify-start w-full">
      {tabsInfo.map((tab) => (
        <Link to={tab.href} key={tab.href}>
          <button
            className={`flex items-center justify-center gap-2 border-b border-primary h-11 p-4 my-2 transition-all duration-200 hover:text-dark hover:bg-warning ${
              pathname.includes(tab.href) ? "text-dark bg-primary" : "bg-dark"
            }`}
          >
            {tab.title}
          </button>
        </Link>
      ))}
    </div>
  )
}