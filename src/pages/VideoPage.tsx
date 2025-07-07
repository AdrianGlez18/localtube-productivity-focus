import { useParams, useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import VideoDetails from '../components/VideoDetails';
import type { YoutubeAPIVideo } from '../types/youtube-api';
import { fetchVideoById } from '../lib/youtube';

const VideoPage = () => {
  const { id } = useParams() || '';
  const navigate = useNavigate();
  const [video, setVideo] = useState<YoutubeAPIVideo | null>(null);

  async function getVideo() {
    try {
      const data = await fetchVideoById(id!);
      setVideo(data);
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    getVideo();
  }, [id]);

  if (!video) return <div>Loading...</div>;

  return (
    <div>
      <button
        onClick={() => navigate(-1)}
        className="text-sm text-blue-600 mb-4 hover:underline"
      >
        ← Back
      </button>
      <VideoDetails video={video} />
    </div>
  );
};

export default VideoPage;