import { Play, MoreHorizontal } from 'lucide-react';
import { ImageWithFallback } from './figma/ImageWithFallback';

interface MusicCardProps {
  id: string;
  title: string;
  artist?: string;
  description?: string;
  imageUrl: string;
  type: 'track' | 'playlist' | 'genre';
  onClick?: () => void;
}

export function MusicCard({ id, title, artist, description, imageUrl, type, onClick }: MusicCardProps) {
  const handleClick = () => {
    if (type === 'genre') {
      // Open genre in new window
      window.open(`/genre/${id}`, '_blank');
    } else {
      onClick?.();
    }
  };

  return (
    <div 
      className="group relative bg-[#1a1a1a] rounded-lg p-4 hover:bg-[#2a2a2a] transition-all duration-300 cursor-pointer"
      onClick={handleClick}
    >
      {/* Image */}
      <div className="relative aspect-square mb-4 overflow-hidden rounded-lg">
        <ImageWithFallback
          src={imageUrl}
          alt={title}
          className="w-full h-full object-cover"
        />
        
        {/* Play button overlay */}
        <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-40 transition-all duration-300 flex items-center justify-center">
          <button className="w-12 h-12 bg-green-500 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transform translate-y-2 group-hover:translate-y-0 transition-all duration-300">
            <Play size={20} className="text-black ml-1" fill="currentColor" />
          </button>
        </div>
      </div>

      {/* Content */}
      <div className="space-y-1">
        <h3 className="text-white font-medium truncate">{title}</h3>
        {artist && (
          <p className="text-gray-400 text-sm truncate">{artist}</p>
        )}
        {description && (
          <p className="text-gray-400 text-xs truncate">{description}</p>
        )}
      </div>

      {/* More options */}
      <button className="absolute top-4 right-4 w-8 h-8 bg-black bg-opacity-0 group-hover:bg-opacity-60 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300">
        <MoreHorizontal size={16} className="text-white" />
      </button>
    </div>
  );
}