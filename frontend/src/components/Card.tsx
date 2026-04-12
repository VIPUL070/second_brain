import ShareIcon from "../icons/ShareIcon";
import TrashIcon from "../icons/TrashIcon";

interface CardProps {
  type: "twitter" | "youtube";
  title: string;
  link: string;
}

const Card = ({ title, type, link }: CardProps) => {
  return (
    <div>
      <div className="bg-offwhite-font rounded-md shadow-md border-gray-200 p-4 min-w-72 max-w-72 min-h-48 border-r text-black">
        <div className="flex justify-between items-center text-md">
          <div className="flex items-center gap-4 text-gray-icon">
            <ShareIcon size="lg" />
            {title}
          </div>

          <div className="flex items-center gap-2 text-gray-icon">
            <a href={link} target="_blank">
            <ShareIcon size="lg"/>
            </a>
            <TrashIcon size="lg" />
          </div>
        </div>

        <div className="pt-6">
          {type === "youtube" && (
            <iframe
              className="w-full rounded-sm"
              src={link.replace("youtu.be" , "www.youtube.com/embed")}
              title="YouTube video player"
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              referrerPolicy="strict-origin-when-cross-origin"
              allowFullScreen
            ></iframe>
          )}

          {type === "twitter" && (
            <blockquote className="twitter-tweet" data-cards="hidden">
              <p lang="en" dir="ltr">Loading tweet...</p>
              <a href={link.replace("x.com", "twitter.com")} rel="noopener noreferrer"></a>
            </blockquote>
          )}
        </div>
      </div>
    </div>
  );
};

export default Card;
