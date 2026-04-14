import { useEffect, useRef, useState } from "react";
import CrossIcon from "../icons/CrossIcon";
import Button from "./ui/Button";
import Input from "./ui/Input";
import { toast } from "react-toastify";
import axios from "axios";
import { BACKEND_URL } from "../config";

interface modalProps {
  open: boolean;
  onClose: () => void;
}

const CreateContentModal = ({ open, onClose }: modalProps) => {
  const ref = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLInputElement>(null);
  const linkRef = useRef<HTMLInputElement>(null);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      // If the modal is open AND the click was NOT inside the ref box
      if (open && ref.current && !ref.current.contains(event.target as Node)) {
        onClose();
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [onClose, open]);

  async function addContent() {
    setIsLoading(true);

    const title = titleRef.current?.value;
    const link = linkRef.current?.value;
    const type = link?.startsWith("https://x.com") ? "twitter" : "youtube";

    if (!link || !title) {
      toast.warning("Fill in all the details!");
      setIsLoading(false);
      return;
    }

    try {
      await axios.post(
        `${BACKEND_URL}/api/v1/content`,
        {
          title,
          link,
          type,
        },
        {
          headers: {
            "Authorization": `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );

      toast.success("Content added successfully");
      onClose();
    } catch {
      toast.error("Failed to add content");
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <div>
      {open && (
        <div className="w-screen h-screen fixed bg-slate-500/30 inset-0 backdrop-blur-xs z-40 flex justify-center items-center">
          <div
            ref={ref}
            className="bg-offwhite-font rounded-md text-black p-8 w-1/3 h-1/2 flex flex-col gap-6"
          >
            <div className="flex justify-end w-full">
              <div
                className="w-6 h-6 text-black cursor-pointer"
                onClick={onClose}
              >
                <CrossIcon size="lg" />
              </div>
            </div>

            <div className="flex flex-col gap-12">
              <Input placeholder={"Title"} ref={titleRef} />
              <Input placeholder={"Link"} ref={linkRef} />
            </div>

            <div className="mt-auto flex justify-center">
              <Button
                variant="primary"
                size="lg"
                title="Add content"
                loading={isLoading}
                onClick={() => {
                  addContent();
                }}
              />
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default CreateContentModal;
