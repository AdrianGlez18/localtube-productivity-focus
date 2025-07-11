import { LikedVideo, WatchLaterVideo } from '@/types/sqlite-schemas';
import LikedVideoCard from './LikedVideoCard';

type VideoCollectionGridProps = {
    page: 'liked' | 'collection' | 'later';
    title: string;
    isLoading: boolean;
    error: string | null;
    videos: LikedVideo[] | WatchLaterVideo[];
    handleVideoClick: (youtubeId: string) => void;
    handleDelete: (id: number) => void;
}

const VideoCollectionGrid = ({
    page,
    title,
    isLoading,
    error,
    videos,
    handleVideoClick,
    handleDelete,
}: VideoCollectionGridProps) => {
    return (
        <div className="px-4 flex flex-col gap-4 @container">
            <h1 className="font-handwritten text-4xl my-4 text-center">{title}</h1>

            {isLoading && (
                <div className="flex justify-center">
                    <p>Loading your videos...</p>
                </div>
            )}

            {error && (
                <div className="text-red-500 mb-4">
                    {error}
                </div>
            )}

            {!isLoading && videos.length === 0 && (
                <p className="text-gray-500 text-center">You haven't saved any videos yet.</p>
            )}

            <div className="grid grid-cols-1 @xl:grid-cols-2 @2xl:grid-cols-3 @6xl:grid-cols-4 gap-6 my-4">
                {videos.map((video) => (
                    page === 'liked' ? (
                        <LikedVideoCard 
                            key={video.id} 
                            video={video}
                            isLoading={isLoading}
                            handleVideoClick={handleVideoClick}
                            handleDelete={handleDelete}
                        />
                    ) : page === 'later' ? (
                        <LikedVideoCard
                            key={video.id}
                            video={video}
                            isLoading={isLoading}
                            handleVideoClick={handleVideoClick}
                            handleDelete={handleDelete}
                        />
                    ) : (
                        <p>Test</p>
                    )
                ))}
            </div>
        </div>
    )
}

export default VideoCollectionGrid;