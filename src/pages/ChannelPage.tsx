import { useEffect, useState } from 'react'
import {fetchChannelData, fetchChannelVideos} from '@/lib/youtube';
import { useParams, useNavigate } from 'react-router-dom';
import ChannelDetails from '@/components/ChannelDetails';
import { YoutubeAPIVideo } from '@/types/youtube-api';

const ChannelPage = () => {

    const [channel, setChannel] = useState(null);
    const [videos, setVideos] = useState<YoutubeAPIVideo[]>([]);
    const [nextPageToken, setNextPageToken] = useState<string | undefined>(undefined);
    const [prevPageToken, setPrevPageToken] = useState<string | undefined>(undefined);
    const { id } = useParams() || '';
    const navigate = useNavigate();

    async function getChannel() {
        try {
            console.log('fetching: ', id);
            const data = await fetchChannelData(id!);
            console.log(data);
            setChannel(data);
        } catch (error) {
            console.log(error);
        }
    }

    async function getVideos(page?: string) {
        try {
            console.log('fetching videos: ', id);
            const data = await fetchChannelVideos(id!, page);
            setNextPageToken(data.nextPageToken);
            setPrevPageToken(data.prevPageToken);
            console.log("videos: ", data.items);
            setVideos(data.items);
        } catch (error) {
            console.log(error);
        }
    }

    const goToPage = (token: string | undefined) => {
        if (!token) return;
        getVideos(token);
      };

    useEffect(() => {
        getChannel();
        getVideos();
    }, []);

    if (!channel) return <div>Loading...</div>;

    return (
        <div>
            <button
                onClick={() => navigate(-1)}
                className="text-sm text-blue-600 mb-4 hover:underline"
            >
                ← Back
            </button>
            <ChannelDetails channel={channel} videos={videos} />
            
            <div className="flex justify-center gap-12 my-6">
                <button
                    disabled={!prevPageToken}
                    onClick={() => goToPage(prevPageToken)}
                    className="px-4 py-2 cursor-pointer border border-black dark:border-white rounded hover:bg-black hover:text-white dark:hover:bg-white dark:hover:text-black disabled:opacity-40"
                >
                    ◀ Previous
                </button>
                <button
                    disabled={!nextPageToken}
                    onClick={() => goToPage(nextPageToken)}
                    className="px-4 py-2 cursor-pointer border border-black dark:border-white rounded hover:bg-black hover:text-white dark:hover:bg-white dark:hover:text-black disabled:opacity-40"
                >
                    Next ▶
                </button>
            </div>
        </div>
    );
}

export default ChannelPage