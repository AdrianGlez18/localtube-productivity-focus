import { Link, useLocation } from 'react-router-dom';
import {
  Home,
  Bookmark,
  Clock,
  ThumbsUp,
  Users,
  Settings
} from 'lucide-react';

const items = [
  { name: 'Home', path: '/', icon: <Home size={20} /> },
  { name: 'Collection', path: '/collection', icon: <Bookmark size={20} /> },
  { name: 'Watch Later', path: '/watch-later', icon: <Clock size={20} /> },
  { name: 'Liked Videos', path: '/liked-videos', icon: <ThumbsUp size={20} /> },
  { name: 'Subscriptions', path: '/subscriptions', icon: <Users size={20} /> },
];

const BottomNav = () => {
  const { pathname } = useLocation();

  return (
    <div className="fixed bottom-0 left-0 right-0 flex sm:hidden bg-white border-t border-black w-full h-12">
      <div className="flex flex-1 justify-around w-full">
        <nav className="flex gap-2 justify-around w-full">
          {items.map(({ path, icon }) => (
            <Link
              key={path}
              to={path}
              className={`flex items-center gap-3 px-4 py-2 text-sm hover:bg-gray-100 ${pathname === path ? 'bg-gray-100 font-medium' : ''}`}
            >
              {icon}
            </Link>
          ))}
          <Link
          to={'/settings'}
          className={`flex items-center gap-3 px-4 py-2 text-sm hover:bg-gray-100 ${pathname === '/settings' ? 'bg-gray-100 font-medium' : ''}`}
        >
          <Settings size={20} />
        </Link>
        </nav>
      </div>
    </div>
  );
};

export default BottomNav;