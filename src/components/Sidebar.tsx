import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import {
  Home,
  Bookmark,
  Clock,
  ThumbsUp,
  Users,
  Menu,
} from 'lucide-react';

const items = [
  { name: 'Home', path: '/', icon: <Home size={20} /> },
  { name: 'Collection', path: '/collection', icon: <Bookmark size={20} /> },
  { name: 'Watch Later', path: '/watch-later', icon: <Clock size={20} /> },
  { name: 'Liked Videos', path: '/liked-videos', icon: <ThumbsUp size={20} /> },
  { name: 'Subscriptions', path: '/subscriptions', icon: <Users size={20} /> },
];

const Sidebar = () => {
  const [expanded, setExpanded] = useState(true);
  const { pathname } = useLocation();

  return (
    <div className={`h-screen bg-white border-r shadow-sm transition-all duration-300 ${expanded ? 'w-60' : 'w-16'}`}>
      <div className="flex items-center justify-between px-4 py-4">
        {expanded && <h1 className="text-xl font-bold">YouTube Lite</h1>}
        <button onClick={() => setExpanded(!expanded)}>
          <Menu />
        </button>
      </div>
      <nav className="mt-4">
        {items.map(({ name, path, icon }) => (
          <Link
            key={path}
            to={path}
            className={`flex items-center gap-3 px-4 py-2 text-sm hover:bg-gray-100 ${
              pathname === path ? 'bg-gray-100 font-medium' : ''
            }`}
          >
            {icon}
            {expanded && <span>{name}</span>}
          </Link>
        ))}
      </nav>
    </div>
  );
};

export default Sidebar;