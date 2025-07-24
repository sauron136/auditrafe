import { useState, useEffect } from 'react';
import { Settings } from 'lucide-react';
import { Sidebar } from './components/Sidebar';
import { FeaturedSection } from './components/FeaturedSection';
import { MusicGrid } from './components/MusicGrid';
import { GenrePage } from './components/GenrePage';
import { AdminPanel } from './components/AdminPanel';

export default function App() {
  const [activeSection, setActiveSection] = useState('home');
  const [isGenrePage, setIsGenrePage] = useState(false);
  const [genreId, setGenreId] = useState('');
  const [isAdminPanelOpen, setIsAdminPanelOpen] = useState(false);
  
  // Mock user role - in real app this would come from authentication
  const [userRole, setUserRole] = useState<'admin' | 'user'>('user');

  // Check if this is a genre page based on URL
  useEffect(() => {
    const path = window.location.pathname;
    const genreMatch = path.match(/\/genre\/(.+)/);
    
    if (genreMatch) {
      setIsGenrePage(true);
      setGenreId(decodeURIComponent(genreMatch[1]));
    }
  }, []);

  // Mock function to toggle user role (for demo purposes)
  const toggleUserRole = () => {
    setUserRole(prev => prev === 'admin' ? 'user' : 'admin');
  };

  // If this is a genre page, render the genre component
  if (isGenrePage) {
    return <GenrePage genreId={genreId} />;
  }

  // Main application layout
  return (
    <div className="h-screen bg-black text-white overflow-hidden flex relative">
      {/* Sidebar */}
      <Sidebar 
        activeSection={activeSection}
        onSectionChange={setActiveSection}
      />
      
      {/* Main content area */}
      <div className="flex-1 flex flex-col h-full">
        {/* Top bar */}
        <div className="h-16 bg-[#1a1a1a] flex items-center justify-between px-6 border-b border-gray-800">
          <div className="flex items-center space-x-4">
            <h2 className="text-lg font-medium">
              {activeSection === 'home' && 'Home'}
              {activeSection === 'search' && 'Search'}
              {activeSection === 'library' && 'Your Library'}
              {activeSection === 'playlists' && 'Playlists'}
              {activeSection === 'liked' && 'Liked Songs'}
            </h2>
          </div>
          
          <div className="flex items-center space-x-4">
            {/* Demo role toggle button */}
            <button
              onClick={toggleUserRole}
              className={`px-3 py-1 rounded-full text-xs font-medium transition-colors ${
                userRole === 'admin' 
                  ? 'bg-red-600 text-white' 
                  : 'bg-gray-600 text-gray-300'
              }`}
            >
              {userRole === 'admin' ? 'Admin' : 'User'}
            </button>
            
            <div className="w-8 h-8 bg-purple-600 rounded-full flex items-center justify-center">
              <span className="text-sm font-medium">
                {userRole === 'admin' ? 'A' : 'U'}
              </span>
            </div>
          </div>
        </div>
        
        {/* Content area with viewport constraint */}
        <div className="flex-1 overflow-hidden">
          {activeSection === 'home' && (
            <div className="h-full overflow-y-auto px-6 py-6">
              <FeaturedSection />
              <MusicGrid category="all" />
            </div>
          )}
          
          {activeSection === 'search' && (
            <div className="h-full overflow-y-auto px-6 py-6">
              <div className="mb-6">
                <h2 className="text-2xl font-bold mb-4">Search</h2>
                <input 
                  type="text"
                  placeholder="What do you want to listen to?"
                  className="w-full max-w-md bg-[#2a2a2a] border border-gray-600 rounded-lg px-4 py-3 text-white placeholder-gray-400 focus:outline-none focus:border-green-500"
                />
              </div>
              <MusicGrid category="search" />
            </div>
          )}
          
          {activeSection === 'library' && (
            <div className="h-full overflow-y-auto px-6 py-6">
              <div className="mb-6">
                <h2 className="text-2xl font-bold mb-2">Your Library</h2>
                <p className="text-gray-400">Your saved music and playlists</p>
              </div>
              <MusicGrid category="library" />
            </div>
          )}
          
          {activeSection === 'playlists' && (
            <div className="h-full overflow-y-auto px-6 py-6">
              <div className="mb-6">
                <h2 className="text-2xl font-bold mb-2">Your Playlists</h2>
                <p className="text-gray-400">Create and manage your playlists</p>
              </div>
              <MusicGrid category="playlists" />
            </div>
          )}
          
          {activeSection === 'liked' && (
            <div className="h-full overflow-y-auto px-6 py-6">
              <div className="mb-6">
                <h2 className="text-2xl font-bold mb-2">Liked Songs</h2>
                <p className="text-gray-400">Songs you've liked</p>
              </div>
              <MusicGrid category="liked" />
            </div>
          )}
        </div>
      </div>

      {/* Admin Toggle Button - Only visible to admins */}
      {userRole === 'admin' && (
        <button
          onClick={() => setIsAdminPanelOpen(true)}
          className="fixed bottom-6 right-6 w-14 h-14 bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 rounded-full flex items-center justify-center shadow-lg transition-all duration-300 hover:scale-105 z-40"
          title="Admin Panel"
        >
          <Settings className="text-white" size={24} />
        </button>
      )}

      {/* Admin Panel */}
      <AdminPanel 
        isOpen={isAdminPanelOpen}
        onClose={() => setIsAdminPanelOpen(false)}
      />
    </div>
  );
}