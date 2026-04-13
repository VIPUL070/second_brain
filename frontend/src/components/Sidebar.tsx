import DocumentIcon from "../icons/DocumentIcon";
import LinkIcon from "../icons/LinkIcon";
import TagIcon from "../icons/TagIcon";
import TwitterIcon from "../icons/TwitterIcon";
import VideoIcon from "../icons/VideoIcon";
import SidebarItem from "./SidebarItem";
import Logo from "./ui/Logo";

const itemList = [
  { text: "Tweets", icon: <TwitterIcon /> },
  { text: "Video", icon: <VideoIcon /> },
  { text: "Documents", icon: <DocumentIcon /> },
  { text: "Links", icon: <LinkIcon /> },
  { text: "Tags", icon: <TagIcon /> },
];

const Sidebar = () => {
  return (
    <div className="h-screen border-r max-w-72 border-slate-200 bg-offwhite-font fixed inset-0 p-4">
      <div className="flex flex-col gap-8">
        <Logo />
        <div className="flex flex-col gap-8 p-4 mb-auto">
          {itemList.map((item) => {
            return <SidebarItem key={item.text} text={item.text} icon={item.icon} />
          })}
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
