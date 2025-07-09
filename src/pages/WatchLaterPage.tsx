import { useState, useEffect } from "react";
import { LikedVideo } from "@/types/sqlite-schemas";
import { useNavigate } from "react-router-dom";
import VideoCollectionGrid from "@/components/VideoCollectionGrid";
import { getWatchLaterVideos } from "@/db/watch-later";

const WatchLaterPage = () => {
    const [videos, setVideos] = useState<LikedVideo[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const navigate = useNavigate();

    useEffect(() => {
        async function fetchWatchLaterVideos() {
            try {
                setIsLoading(true);
                const watchLaterVideos = await getWatchLaterVideos();
                setVideos(watchLaterVideos);
            } catch (err) {
                setError("Failed to load videos");
                console.error(err);
            } finally {
                setIsLoading(false);
            }
        }

        fetchWatchLaterVideos();
    }, []);

    const handleVideoClick = (youtubeId: string) => {
        navigate(`/video/${youtubeId}`);
    };

    return (
        <VideoCollectionGrid
            page='later'
            title='Watch Later'
            error={error}
            isLoading={isLoading}
            videos={videos}
            handleVideoClick={handleVideoClick}
        />
    );
};

export default WatchLaterPage;