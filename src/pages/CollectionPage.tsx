import { getCollection } from "@/db/collection";
import { CollectionVideo } from "@/types/sqlite-schemas";
import { useEffect, useState } from "react";

const CollectionPage = () => {
    const [videos, setVideos] = useState<CollectionVideo[]>([]);
    
    useEffect(() => {
        const fetchVideos = async () => {
            const videos = await getCollection();
            setVideos(videos);
        };
        fetchVideos();
    }, []);

    return (
        <div className="flex flex-col gap-4">
            <h1 className="text-xl font-semibold">Collection</h1>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {videos.map((video) => (
                    <div key={video.id} className="bg-white rounded-lg shadow-md overflow-hidden">
                        <img src={video.thumbnail} alt={video.title} className="w-full h-48 object-cover" />
                        <div className="p-4">
                            <h2 className="text-lg font-semibold">{video.title}</h2>
                            <p className="text-sm text-gray-600">{video.author}</p>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default CollectionPage;