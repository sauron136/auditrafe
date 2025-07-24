import { Play } from 'lucide-react';
import { ImageWithFallback } from './figma/ImageWithFallback';

export function FeaturedSection() {
  return (
    <div className="relative h-80 bg-gradient-to-br from-purple-600 via-blue-600 to-purple-800 rounded-lg overflow-hidden mb-8">
      {/* Background pattern */}
      <div className="absolute inset-0 bg-black bg-opacity-20"></div>
      
      {/* Content */}
      <div className="relative h-full flex items-center p-8">
        <div className="flex-1">
          <p className="text-blue-200 text-sm mb-2">Your Music</p>
          <h1 className="text-4xl font-bold text-white mb-4">On Repeat</h1>
          <p className="text-blue-100 text-lg mb-6 max-w-md">
            Your most played tracks, ready to play again
          </p>
          
          <button className="flex items-center space-x-3 bg-green-500 hover:bg-green-600 text-black px-8 py-3 rounded-full font-medium transition-colors">
            <Play size={20} fill="currentColor" />
            <span>Play</span>
          </button>
        </div>
        
        {/* Featured image */}
        <div className="hidden md:block">
          <div className="w-48 h-48 rounded-lg overflow-hidden">
            <ImageWithFallback
              src="https://picsum.photos/300/300?random=featured"
              alt="On Repeat"
              className="w-full h-full object-cover"
            />
          </div>
        </div>
      </div>
    </div>
  );
}