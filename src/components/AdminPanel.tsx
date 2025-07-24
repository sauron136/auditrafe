import { useState } from 'react';
import { X, Plus, Upload, Edit, Trash2, Music } from 'lucide-react';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Textarea } from './ui/textarea';
import { Card, CardHeader, CardTitle, CardContent } from './ui/card';
import { Badge } from './ui/badge';

interface AdminPanelProps {
  isOpen: boolean;
  onClose: () => void;
}

interface Track {
  id: string;
  title: string;
  artist: string;
  album: string;
  genre: string;
  duration: string;
  uploadDate: string;
}

export function AdminPanel({ isOpen, onClose }: AdminPanelProps) {
  const [activeTab, setActiveTab] = useState<'tracks' | 'upload'>('tracks');
  const [tracks, setTracks] = useState<Track[]>([
    {
      id: '1',
      title: 'Deep Focus Mix',
      artist: 'Ambient Collective',
      album: 'Concentration',
      genre: 'Ambient',
      duration: '3:45',
      uploadDate: '2024-01-15'
    },
    {
      id: '2',
      title: 'Beach Vibes',
      artist: 'Tropical Sounds',
      album: 'Summer Collection',
      genre: 'Chill',
      duration: '4:12',
      uploadDate: '2024-01-20'
    },
    {
      id: '3',
      title: 'Workout Energy',
      artist: 'Fitness Beats',
      album: 'Pump It Up',
      genre: 'Electronic',
      duration: '3:58',
      uploadDate: '2024-01-22'
    }
  ]);

  const [newTrack, setNewTrack] = useState({
    title: '',
    artist: '',
    album: '',
    genre: '',
    duration: ''
  });

  const handleUpload = () => {
    if (newTrack.title && newTrack.artist) {
      const track: Track = {
        id: Date.now().toString(),
        ...newTrack,
        uploadDate: new Date().toISOString().split('T')[0]
      };
      setTracks(prev => [track, ...prev]);
      setNewTrack({ title: '', artist: '', album: '', genre: '', duration: '' });
    }
  };

  const handleDelete = (id: string) => {
    setTracks(prev => prev.filter(track => track.id !== id));
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
      <div className="bg-[#1a1a1a] rounded-lg w-full max-w-4xl h-[80vh] flex flex-col">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-gray-700">
          <div className="flex items-center space-x-3">
            <Music className="text-green-500" size={24} />
            <h2 className="text-xl font-bold text-white">Admin Panel</h2>
          </div>
          <Button
            variant="ghost"
            size="sm"
            onClick={onClose}
            className="text-gray-400 hover:text-white"
          >
            <X size={20} />
          </Button>
        </div>

        {/* Tabs */}
        <div className="flex border-b border-gray-700">
          <button
            onClick={() => setActiveTab('tracks')}
            className={`px-6 py-3 font-medium ${
              activeTab === 'tracks'
                ? 'text-green-500 border-b-2 border-green-500'
                : 'text-gray-400 hover:text-white'
            }`}
          >
            Manage Tracks
          </button>
          <button
            onClick={() => setActiveTab('upload')}
            className={`px-6 py-3 font-medium ${
              activeTab === 'upload'
                ? 'text-green-500 border-b-2 border-green-500'
                : 'text-gray-400 hover:text-white'
            }`}
          >
            Upload New Track
          </button>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto p-6">
          {activeTab === 'tracks' && (
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-medium text-white">Music Library</h3>
                <Badge variant="secondary">{tracks.length} tracks</Badge>
              </div>
              
              <div className="space-y-3">
                {tracks.map((track) => (
                  <Card key={track.id} className="bg-[#2a2a2a] border-gray-700">
                    <CardContent className="p-4">
                      <div className="flex items-center justify-between">
                        <div className="flex-1 grid grid-cols-5 gap-4">
                          <div>
                            <p className="text-white font-medium">{track.title}</p>
                            <p className="text-gray-400 text-sm">{track.artist}</p>
                          </div>
                          <div>
                            <p className="text-gray-300">{track.album}</p>
                          </div>
                          <div>
                            <Badge variant="outline" className="text-xs">
                              {track.genre}
                            </Badge>
                          </div>
                          <div>
                            <p className="text-gray-400">{track.duration}</p>
                          </div>
                          <div>
                            <p className="text-gray-400 text-sm">{track.uploadDate}</p>
                          </div>
                        </div>
                        
                        <div className="flex items-center space-x-2">
                          <Button variant="ghost" size="sm" className="text-gray-400 hover:text-white">
                            <Edit size={16} />
                          </Button>
                          <Button 
                            variant="ghost" 
                            size="sm" 
                            className="text-red-400 hover:text-red-300"
                            onClick={() => handleDelete(track.id)}
                          >
                            <Trash2 size={16} />
                          </Button>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          )}

          {activeTab === 'upload' && (
            <div className="max-w-2xl">
              <h3 className="text-lg font-medium text-white mb-6">Upload New Track</h3>
              
              <div className="space-y-4">
                {/* Audio File Upload */}
                <Card className="bg-[#2a2a2a] border-gray-700">
                  <CardContent className="p-6">
                    <div className="border-2 border-dashed border-gray-600 rounded-lg p-8 text-center">
                      <Upload className="mx-auto text-gray-400 mb-4" size={48} />
                      <p className="text-gray-300 mb-2">Drop your audio file here or click to browse</p>
                      <p className="text-gray-500 text-sm">Supports MP3, FLAC, WAV (Max 50MB)</p>
                      <Button className="mt-4" variant="outline">
                        Choose File
                      </Button>
                    </div>
                  </CardContent>
                </Card>

                {/* Track Metadata */}
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">
                      Track Title *
                    </label>
                    <Input
                      value={newTrack.title}
                      onChange={(e) => setNewTrack(prev => ({ ...prev, title: e.target.value }))}
                      placeholder="Enter track title"
                      className="bg-[#2a2a2a] border-gray-600 text-white"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">
                      Artist *
                    </label>
                    <Input
                      value={newTrack.artist}
                      onChange={(e) => setNewTrack(prev => ({ ...prev, artist: e.target.value }))}
                      placeholder="Enter artist name"
                      className="bg-[#2a2a2a] border-gray-600 text-white"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">
                      Album
                    </label>
                    <Input
                      value={newTrack.album}
                      onChange={(e) => setNewTrack(prev => ({ ...prev, album: e.target.value }))}
                      placeholder="Enter album name"
                      className="bg-[#2a2a2a] border-gray-600 text-white"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">
                      Genre
                    </label>
                    <Input
                      value={newTrack.genre}
                      onChange={(e) => setNewTrack(prev => ({ ...prev, genre: e.target.value }))}
                      placeholder="Enter genre"
                      className="bg-[#2a2a2a] border-gray-600 text-white"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">
                      Duration
                    </label>
                    <Input
                      value={newTrack.duration}
                      onChange={(e) => setNewTrack(prev => ({ ...prev, duration: e.target.value }))}
                      placeholder="e.g., 3:45"
                      className="bg-[#2a2a2a] border-gray-600 text-white"
                    />
                  </div>
                </div>

                <div className="flex justify-end space-x-4 pt-6">
                  <Button variant="outline" onClick={() => setNewTrack({ title: '', artist: '', album: '', genre: '', duration: '' })}>
                    Reset
                  </Button>
                  <Button 
                    onClick={handleUpload}
                    className="bg-green-600 hover:bg-green-700"
                    disabled={!newTrack.title || !newTrack.artist}
                  >
                    <Plus size={16} className="mr-2" />
                    Upload Track
                  </Button>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}