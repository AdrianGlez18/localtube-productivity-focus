import { useState, useEffect } from "react";
import { deleteLikedVideo, getLikedVideos } from "@/db/liked-videos";
import { LikedVideo } from "@/types/sqlite-schemas";
import { useNavigate } from "react-router-dom";
import VideoCollectionGrid from "@/components/VideoCollectionGrid";
import { toast } from "sonner";

const LikedVideosPage = () => {
  const [videos, setVideos] = useState<LikedVideo[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    async function fetchLikedVideos() {
      try {
        setIsLoading(true);
        const likedVideos = await getLikedVideos();
        setVideos(likedVideos);
      } catch (err) {
        setError("Failed to load liked videos");
        toast.error("Failed to load liked videos");
      } finally {
        setIsLoading(false);
      }
    }

    fetchLikedVideos();
  }, []);

  const handleVideoClick = (youtubeId: string) => {
    navigate(`/video/${youtubeId}`);
  };

  const handleDelete = (id: number) => {
    try {
      setIsLoading(true);
      deleteLikedVideo(id);
      setVideos((prevVideos) => prevVideos.filter((video) => video.id !== id));
      setTimeout(() => {
        toast.success("Video deleted");
      }, 500);
    } catch (error) {
      toast.error("Failed to delete video");
      setIsLoading(false);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <VideoCollectionGrid
      page="liked"
      title="Liked Videos"
      error={error}
      isLoading={isLoading}
      videos={videos}
      handleDelete={handleDelete}
      handleVideoClick={handleVideoClick}
    />
  );
};

export default LikedVideosPage;
