import YouTubeCard from '../components/YoutubeCard';
import { YoutubeAPIVideo } from '../types/youtube-api';
import { useEffect, useState } from 'react';
import { fetchHomePage } from '../lib/youtube';

const saveToWatchLater = (video: YoutubeAPIVideo) => {
  // TODO CALL DB
};

const saveToCollection = (video: YoutubeAPIVideo) => {
  // TODO DESIGN MODAL AND FORM
};

const HomePage = () => {
  const [videos, setVideos] = useState<any>([]);

  async function getVideos() {
    try {
      const data: YoutubeAPIVideo[] = await fetchHomePage();
      console.log("data: ", data)
      setVideos(data);
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    getVideos();
  }, []);

  return (
    <div className="p-4 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
      {videos.map((video: YoutubeAPIVideo) => (
        <YouTubeCard
          key={video.id}
          video={video}
          videoId={video.id}
          saveToWatchLater={saveToWatchLater}
          saveToCollection={saveToCollection}
        />
      ))}
    </div>
  );
};

export default HomePage;