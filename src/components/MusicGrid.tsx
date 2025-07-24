import { useState, useEffect, useCallback } from 'react';
import { MusicCard } from './MusicCard';

interface Track {
  id: string;
  title: string;
  artist: string;
  imageUrl: string;
  type: 'track' | 'playlist' | 'genre';
  description?: string;
}

interface MusicGridProps {
  category: string;
}

export function MusicGrid({ category }: MusicGridProps) {
  const [tracks, setTracks] = useState<Track[]>([]);
  const [loading, setLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);
  const [page, setPage] = useState(1);

  // Mock data generator
  const generateMockTracks = (startIndex: number, count: number): Track[] => {
    const genres = ['Work Out', 'Techno Do', 'Quiet Hours', 'Rap', 'Deep Focus', 'Beach Vibes', 'Pop Hits', 'Indie Electronic'];
    const moods = ['Energetic', 'Chill', 'Focus', 'Relaxed', 'Upbeat', 'Ambient', 'Peaceful', 'Intense'];
    
    return Array.from({ length: count }, (_, i) => {
      const index = startIndex + i;
      const genre = genres[index % genres.length];
      const mood = moods[index % moods.length];
      
      return {
        id: `track-${index}`,
        title: `${genre}`,
        artist: `${mood} Playlist`,
        description: `Perfect for ${mood.toLowerCase()} moments`,
        imageUrl: `https://picsum.photos/300/300?random=${index}`,
        type: Math.random() > 0.7 ? 'genre' : 'playlist' as const,
      };
    });
  };

  // Load initial tracks
  useEffect(() => {
    setLoading(true);
    setTimeout(() => {
      const initialTracks = generateMockTracks(0, 20);
      setTracks(initialTracks);
      setLoading(false);
    }, 500);
  }, [category]);

  // Load more tracks
  const loadMore = useCallback(() => {
    if (loading || !hasMore) return;

    setLoading(true);
    setTimeout(() => {
      const newTracks = generateMockTracks(tracks.length, 10);
      setTracks(prev => [...prev, ...newTracks]);
      setPage(prev => prev + 1);
      
      // Simulate end of data after 100 items
      if (tracks.length >= 100) {
        setHasMore(false);
      }
      
      setLoading(false);
    }, 800);
  }, [loading, hasMore, tracks.length]);

  // Scroll handler for endless scroll
  const handleScroll = useCallback((e: React.UIEvent<HTMLDivElement>) => {
    const { scrollTop, scrollHeight, clientHeight } = e.currentTarget;
    
    if (scrollHeight - scrollTop <= clientHeight * 1.5 && hasMore && !loading) {
      loadMore();
    }
  }, [hasMore, loading, loadMore]);

  return (
    <div 
      className="h-full overflow-y-auto px-6 py-4"
      onScroll={handleScroll}
    >
      {/* Header */}
      <div className="mb-6">
        <h2 className="text-2xl font-bold text-white mb-2">Your Music</h2>
        <p className="text-gray-400">Discover your next favorite track</p>
      </div>

      {/* Grid */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
        {tracks.map((track) => (
          <MusicCard
            key={track.id}
            id={track.id}
            title={track.title}
            artist={track.artist}
            description={track.description}
            imageUrl={track.imageUrl}
            type={track.type}
          />
        ))}
      </div>

      {/* Loading indicator */}
      {loading && (
        <div className="flex justify-center items-center py-8">
          <div className="w-8 h-8 border-2 border-green-500 border-t-transparent rounded-full animate-spin"></div>
        </div>
      )}

      {/* End of content */}
      {!hasMore && tracks.length > 0 && (
        <div className="text-center py-8">
          <p className="text-gray-400">You've reached the end of the music library!</p>
        </div>
      )}
    </div>
  );
}