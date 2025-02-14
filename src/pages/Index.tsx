
import { PunchableImage } from "@/components/PunchableImage";

const Index = () => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-b from-gray-50 to-gray-100 p-4">
      <div className="text-center mb-8 animate-fade-in">
        <h1 className="text-4xl font-bold mb-2 bg-clip-text text-transparent bg-gradient-to-r from-gray-800 to-gray-600">
          Punch Me!
        </h1>
        <p className="text-gray-600 mb-6">
          Click anywhere on the image to throw a punch
        </p>
      </div>

      <div className="w-full max-w-lg animate-scale-in">
        <PunchableImage />
      </div>
      
      <p className="text-gray-500 text-sm mt-8 animate-fade-in">
        Don't worry, no real faces were harmed in the making of this website
      </p>
    </div>
  );
};

export default Index;
