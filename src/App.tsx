import { Routes, Route } from 'react-router-dom';
import Layout from './components/Layout'
import CollectionPage from './pages/CollectionPage';
import WatchLaterPage from './pages/WatchLaterPage';
import LikedVideosPage from './pages/LikedVideosPage';
import SubscriptionsPage from './pages/SubscriptionsPage';
import VideoPage from './pages/VideoPage';
import HomePage from './pages/HomePage';
import ChannelPage from './pages/ChannelPage';

const App = () => {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<HomePage />} />
        <Route path="collection" element={<CollectionPage />} />
        <Route path="collection/:id" element={<VideoPage />} />
        <Route path="watch-later" element={<WatchLaterPage />} />
        <Route path="liked-videos" element={<LikedVideosPage />} />
        <Route path="subscriptions" element={<SubscriptionsPage />} />
        <Route path="video/:id" element={<VideoPage />} />
        <Route path="channel/:id" element={<ChannelPage />} />
      </Route>
    </Routes>
  );
};

export default App;