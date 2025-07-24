import { Home, Search, Heart, User, Settings, LogOut } from 'lucide-react';

interface SidebarProps {
  activeSection: string;
  onSectionChange: (section: string) => void;
}

export function Sidebar({ activeSection, onSectionChange }: SidebarProps) {
  const menuItems = [
    { id: 'home', label: 'Home', icon: Home },
    { id: 'search', label: 'Search', icon: Search },
    { id: 'library', label: 'Your Library', icon: Heart },
    { id: 'playlists', label: 'New Playlist', icon: User },
    { id: 'liked', label: 'Liked Songs', icon: Heart },
  ];

  return (
    <div className="w-64 h-full bg-[#1a1a1a] text-white flex flex-col">
      {/* Logo */}
      <div className="p-6">
        <h1 className="text-xl font-bold">Auditra</h1>
      </div>

      {/* Navigation */}
      <nav className="flex-1 px-4">
        <ul className="space-y-2">
          {menuItems.map((item) => {
            const Icon = item.icon;
            return (
              <li key={item.id}>
                <button
                  onClick={() => onSectionChange(item.id)}
                  className={`w-full flex items-center space-x-3 px-4 py-3 rounded-lg transition-colors ${
                    activeSection === item.id
                      ? 'bg-[#333] text-white'
                      : 'text-gray-400 hover:text-white hover:bg-[#2a2a2a]'
                  }`}
                >
                  <Icon size={20} />
                  <span>{item.label}</span>
                </button>
              </li>
            );
          })}
        </ul>
      </nav>

      {/* Bottom section */}
      <div className="p-4 border-t border-gray-700">
        <button className="w-full flex items-center space-x-3 px-4 py-3 text-gray-400 hover:text-white hover:bg-[#2a2a2a] rounded-lg transition-colors">
          <Settings size={20} />
          <span>Settings</span>
        </button>
        <button className="w-full flex items-center space-x-3 px-4 py-3 text-gray-400 hover:text-white hover:bg-[#2a2a2a] rounded-lg transition-colors">
          <LogOut size={20} />
          <span>Log out</span>
        </button>
      </div>
    </div>
  );
}