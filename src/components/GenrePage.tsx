import { useState, useEffect } from 'react';
import { ArrowLeft, Play, Shuffle } from 'lucide-react';
import { MusicCard } from './MusicCard';

interface GenrePageProps {
  genreId: string;
}

export function GenrePage({ genreId }: GenrePageProps) {
  const [tracks, setTracks] = useState<Array<{
    id: string;
    title: string;
    artist: string;
    duration: string;
    imageUrl: string;
  }>>([]);

  useEffect(() => {
    // Mock data for genre-specific tracks
    const mockTracks = Array.from({ length: 20 }, (_, i) => ({
      id: `${genreId}-track-${i}`,
      title: `${genreId} Track ${i + 1}`,
      artist: `Artist ${i + 1}`,
      duration: `${Math.floor(Math.random() * 3) + 2}:${Math.floor(Math.random() * 60).toString().padStart(2, '0')}`,
      imageUrl: `https://picsum.photos/300/300?random=${genreId}-${i}`,
    }));
    
    setTracks(mockTracks);
  }, [genreId]);

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#1a1a1a] to-black text-white">
      {/* Header */}
      <div className="bg-gradient-to-b from-purple-600 to-[#1a1a1a] p-8">
        <button 
          onClick={() => window.close()}
          className="flex items-center space-x-2 text-white hover:text-gray-300 mb-6"
        >
          <ArrowLeft size={20} />
          <span>Back</span>
        </button>
        
        <div className="flex items-end space-x-6">
          <div className="w-48 h-48 bg-gray-800 rounded-lg overflow-hidden">
            <img 
              src={`https://picsum.photos/300/300?random=${genreId}`}
              alt={genreId}
              className="w-full h-full object-cover"
            />
          </div>
          
          <div className="flex-1">
            <p className="text-sm text-gray-300 mb-2">Playlist</p>
            <h1 className="text-5xl font-bold mb-4">{genreId}</h1>
            <p className="text-gray-300 mb-4">
              The best {genreId.toLowerCase()} tracks curated for you
            </p>
            <p className="text-sm text-gray-400">
              Auditra • {tracks.length} songs
            </p>
          </div>
        </div>
        
        {/* Action buttons */}
        <div className="flex items-center space-x-4 mt-6">
          <button className="w-14 h-14 bg-green-500 hover:bg-green-600 rounded-full flex items-center justify-center transition-colors">
            <Play size={24} className="text-black ml-1" fill="currentColor" />
          </button>
          <button className="w-12 h-12 border border-gray-600 hover:border-white rounded-full flex items-center justify-center transition-colors">
            <Shuffle size={20} />
          </button>
        </div>
      </div>

      {/* Track list */}
      <div className="p-8">
        <div className="space-y-2">
          {tracks.map((track, index) => (
            <div 
              key={track.id}
              className="flex items-center space-x-4 p-3 rounded-lg hover:bg-[#2a2a2a] transition-colors group cursor-pointer"
            >
              <span className="w-6 text-gray-400 text-sm">{index + 1}</span>
              
              <div className="w-12 h-12 bg-gray-800 rounded overflow-hidden">
                <img 
                  src={track.imageUrl}
                  alt={track.title}
                  className="w-full h-full object-cover"
                />
              </div>
              
              <div className="flex-1 min-w-0">
                <p className="text-white truncate">{track.title}</p>
                <p className="text-gray-400 text-sm truncate">{track.artist}</p>
              </div>
              
              <span className="text-gray-400 text-sm">{track.duration}</span>
              
              <button className="w-8 h-8 opacity-0 group-hover:opacity-100 transition-opacity">
                <Play size={16} className="text-white" />
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}