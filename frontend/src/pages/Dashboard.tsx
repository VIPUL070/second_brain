import { useState } from "react";
import CreateContentModal from "../components/CreateContentModal";
import Sidebar from "../components/Sidebar";
import PlusIcon from "../icons/PlusIcon";
import Button from "../components/ui/Button";
import ShareIcon from "../icons/ShareIcon";
import Card from "../components/Card";


function Dashboard() {
  const [open, setOpen] = useState(false);

  return (
    <div>
      <Sidebar />

      <div className="p-6 ml-72 min-h-dvh">
      <CreateContentModal open={open} onClose={() => {setOpen(false)}} />
      <div className="flex justify-end gap-4">
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
        />
      </div>

      <div className="flex gap-4">
        <Card
          title="DSA Journey"
          link="https://x.com/vipulsuthar73/status/1841879931854455232?s=20"
          type="twitter"
        />
        <Card
          title="Gaming"
          link="https://youtu.be/HwR9MHDks_E?si=i4TqgkuQAORx04ub"
          type="youtube"
        />
      </div>
    </div>

    </div>
    
  );
}

export default Dashboard;
