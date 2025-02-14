
import { PunchableImage } from "@/components/PunchableImage";

const Index = () => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-b from-gray-50 to-gray-100 p-4">
      <div className="text-center mb-8 animate-fade-in">
        <h1 className="text-4xl font-bold mb-2 bg-clip-text text-transparent bg-gradient-to-r from-gray-800 to-gray-600">
          Punch Me Jess!!!
        </h1>
        <p className="text-gray-600 mb-2">
          Feel free to punch me as much as you want!
        </p>
        <p className="text-gray-500 text-sm mb-6">
          Try different punch speeds to see various reactions 🥊
        </p>
      </div>

      <div className="w-full max-w-lg animate-scale-in">
        <PunchableImage />
      </div>
      
      <div className="text-center mt-8 space-y-2 animate-fade-in">
        <p className="text-gray-600 font-medium">
          Punch Intensity Guide:
        </p>
        <ul className="text-gray-500 text-sm space-y-1">
          <li>🥊 Rapid clicks = Super intense punch!</li>
          <li>⚡️ Quick clicks = Strong punch</li>
          <li>✨ Normal clicks = Medium punch</li>
          <li>🤏 Slow clicks = Light tap</li>
        </ul>
        <p className="text-gray-400 text-xs mt-4">
          Don't worry, maarle aaram se!! tujhe shaantii hii milegii.
        </p>
      </div>
    </div>
  );
};

export default Index;
