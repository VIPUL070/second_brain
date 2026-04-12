import "./App.css";
import Card from "./components/Card";
import Button from "./components/ui/Button";
import PlusIcon from "./icons/PlusIcon";
import ShareIcon from "./icons/ShareIcon";

function App() {
  return (
    <div className="p-4">
      <div className="flex justify-end gap-4">
        <Button
          variant="primary"
          title="Add Content"
          size="md"
          startIcon={<PlusIcon size="lg"/>}
        />
        <Button
          variant="secondary"
          title="Share brain"
          size="md"
          startIcon={<ShareIcon size="lg"/>}
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
  );
}

export default App;
