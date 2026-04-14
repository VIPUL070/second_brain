import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import { BACKEND_URL } from "../config";
import Card from "../components/Card";

interface ContentItem {
  _id: string;
  title: string;
  link: string;
  type: "twitter" | "youtube";
}

interface ShareResponse {
  message: string;
  username: string;
  content: ContentItem[]; 
}

const SharePage = () => {
  const { shareLink } = useParams();
  const [data, setData] = useState<ShareResponse | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios.get<ShareResponse>(`${BACKEND_URL}/api/v1/brain/${shareLink}`)
      .then(res => {
        setData(res.data);
        setLoading(false);
      })
      .catch(() => {
        setLoading(false);
      });
  }, [shareLink]);

  if (loading) return <div className="flex justify-center mt-20 font-geist">Loading...</div>;
  if (!data) return <div className="flex justify-center mt-20 font-geist">Link not found.</div>;

  return (
    <div className="min-h-screen bg-gray-100 p-8 min-w-dvh">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-3xl font-bold mb-2">Shared Brain</h1>
        <p className="text-gray-600 mb-8">Curated by <span className="text-purple-600 font-semibold">@{data.username}</span></p>
        
        <div className="w-screen flex gap-4 flex-wrap">
          {data.content.map((item) => (
            <Card 
              key={item._id} 
              title={item.title} 
              type={item.type} 
              link={item.link}
              showDelete={true}
            />
          ))}
        </div>
      </div>
    </div>
  );
};
export default SharePage;

