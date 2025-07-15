import { Outlet } from 'react-router-dom';
import Sidebar from './Sidebar';
import BottomNav from './BottomNav';

const Layout = () => {
  return (
    <div className="flex">
      <Sidebar />
      <main className="flex-1 p-6 overflow-y-auto h-screen pb-12 sm:pb-0">
        <Outlet />
      </main>
      <BottomNav />
    </div>
  );
};

export default Layout;