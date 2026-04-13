import { useEffect, useRef } from "react";
import CrossIcon from "../icons/CrossIcon";
import Button from "./ui/Button";
import Input from "./ui/Input";

interface modalProps {
  open: boolean;
  onClose: () => void;
}

const CreateContentModal = ({ open, onClose }: modalProps) => {
  const ref = useRef<HTMLDivElement>(null);

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
  }, [onClose,open]);

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
              <Input placeholder={"Title"} />
              <Input placeholder={"Link"} />
            </div>

            <div className="mt-auto flex justify-center">
              <Button variant="primary" size="lg" title="Add content" />
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default CreateContentModal;
