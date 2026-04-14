import { useState } from "react";
import { useContent } from "../hooks/useContent";
import CreateContentModal from "../components/CreateContentModal";
import Sidebar from "../components/Sidebar";
import PlusIcon from "../icons/PlusIcon";
import Button from "../components/ui/Button";
import ShareIcon from "../icons/ShareIcon";
import Card from "../components/Card";
import { toast } from "react-toastify";
import { BACKEND_URL } from "../config";
import axios from "axios";

interface Content {
  _id: string;
  title: string;
  link: string;
  type: "twitter" | "youtube";
}

function Dashboard() {
  const [open, setOpen] = useState(false);
  const { contents, refresh } = useContent();

  async function shareLink() {
  try {
    const response = await axios.post(
      `${BACKEND_URL}/api/v1/brain/share`,
      { share: true },
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      }
    );
    const shareUrl = `http://localhost:5173/share/${response.data.hash}`;
    await navigator.clipboard.writeText(shareUrl);
    
    toast.success("Link copied to clipboard!");
  } catch (error) {
    toast.error("Unable to share link");
    console.error(error);
  }
}

  return (
    <div>
      <Sidebar />

      <div className="p-6 ml-72 min-h-dvh">
        <CreateContentModal
          open={open}
          onClose={() => {
            setOpen(false);
            refresh();
          }}
        />
        <div className="flex justify-end gap-4 mb-8">
          <Button
            variant="primary"
            title="Add Content"
            size="md"
            startIcon={<PlusIcon size="lg" />}
            onClick={() => setOpen(true)}
          />
          <Button
            variant="secondary"
            title="Share brain"
            size="md"
            startIcon={<ShareIcon size="lg" />}
            onClick={() => {shareLink()}}
          />
        </div>

        <div className="flex gap-4 flex-wrap">
          {contents.map((content:Content) => {
            return (
              <Card
                key={content?._id}
                title={content?.title}
                type={content?.type}
                link={content?.link}
              />
            );
          })}
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
