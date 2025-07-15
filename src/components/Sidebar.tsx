import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import {
  Home,
  Bookmark,
  Clock,
  ThumbsUp,
  Users,
  Menu,
  Settings
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
    <aside className="h-screen items-center justify-center hidden sm:flex">
      <div className={`
        min-h-1/2 bg-white border border-black m-4 rounded-2xl overflow-hidden
         hover:shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]
         hover:translate-x-[2px] hover:translate-y-[2px]
        transition-all duration-300 flex flex-col ${expanded ? 'w-60' : 'w-16'}`}>
        <div className="flex items-center justify-between px-4 py-4">
          {expanded && <h1 className="text-xl font-bold font-handwritten">FOCUSTUBE</h1>}
          <button onClick={() => setExpanded(!expanded)}>
            <Menu />
          </button>
        </div>
        <div className="flex flex-col flex-1 justify-between">
          <nav className="mt-4">
            {items.map(({ name, path, icon }) => (
              <Link
                key={path}
                to={path}
                className={`flex items-center gap-3 px-4 py-2 text-sm hover:bg-gray-100 ${pathname === path ? 'bg-gray-100 font-medium' : ''
                  } ${!expanded && 'justify-center'}`}
              >
                {icon}
                {expanded && <span>{name}</span>}
              </Link>
            ))}
          </nav>
          <div className="mb-4">
            <Link
              to={'/settings'}
              className={`flex items-center gap-3 px-4 py-2 text-sm hover:bg-gray-100 ${pathname === '/settings' ? 'bg-gray-100 font-medium' : ''
                } ${!expanded && 'justify-center'}`}
            >
              <Settings size={20} />
              {expanded && <span>Settings</span>}
            </Link>
          </div>
        </div>
      </div>
    </aside>
  );
};

export default Sidebar;