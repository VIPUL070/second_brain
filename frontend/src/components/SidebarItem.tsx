import type { ReactElement} from "react"

interface itemProps {
    text: string,
    icon: ReactElement
}

const SidebarItem = ({text,icon} : itemProps) => {
  return (
    <div className="flex gap-2.5 items-center cursor-pointer hover:text-purple-dark transition-all duration-150">
        <span>
            {icon}
        </span>
        <h2>{text}</h2>
    </div>
  )
}

export default SidebarItem