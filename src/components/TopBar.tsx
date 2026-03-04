'use client';

import { useState, useEffect } from 'react';
import { 
  Activity, 
  Search, 
  Bell, 
  Command,
  Sun,
  Moon,
  User
} from 'lucide-react';
import { useDashboardStore } from '@/store/dashboardStore';

export default function TopBar() {
  const [currentTime, setCurrentTime] = useState(new Date());
  const { toggleCommandBar, searchQuery, setSearchQuery } = useDashboardStore();
  
  useEffect(() => {
    const timer = setInterval(() => setCurrentTime(new Date()), 60000);
    return () => clearInterval(timer);
  }, []);

  // Keyboard shortcut for command bar
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        toggleCommandBar();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [toggleCommandBar]);

  return (
    <header className="h-14 bg-gray-900 border-b border-gray-800 flex items-center justify-between px-4 sticky top-0 z-50">
      {/* Left: Logo */}
      <div className="flex items-center space-x-3">
        <div className="flex items-center space-x-2">
          <Activity className="w-5 h-5 text-blue-500" />
          <span className="font-semibold text-white">Mission Control</span>
        </div>
      </div>

      {/* Center: Search/Command Bar */}
      <div className="flex-1 max-w-xl mx-4">
        <div 
          className="flex items-center space-x-2 bg-gray-800 border border-gray-700 rounded-lg px-3 py-1.5 cursor-pointer hover:border-gray-600 transition-colors"
          onClick={toggleCommandBar}
        >
          <Search className="w-4 h-4 text-gray-400" />
          <span className="text-sm text-gray-400 flex-1">Ask OpenClaw or search...</span>
          <div className="flex items-center space-x-1">
            <kbd className="text-xs bg-gray-700 px-1.5 py-0.5 rounded text-gray-400">⌘</kbd>
            <kbd className="text-xs bg-gray-700 px-1.5 py-0.5 rounded text-gray-400">K</kbd>
          </div>
        </div>
      </div>

      {/* Right: Controls */}
      <div className="flex items-center space-x-3">
        <div className="text-xs text-gray-400">
          {currentTime.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
        </div>
        
        <button className="p-2 text-gray-400 hover:text-white hover:bg-gray-800 rounded-lg transition-colors">
          <Bell className="w-4 h-4" />
        </button>
        
        <button className="p-2 text-gray-400 hover:text-white hover:bg-gray-800 rounded-lg transition-colors">
          <Command className="w-4 h-4" />
        </button>
        
        <div className="flex items-center space-x-2 pl-3 border-l border-gray-800">
          <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center">
            <span className="text-xs font-bold text-white">R</span>
          </div>
        </div>
      </div>
    </header>
  );
}
