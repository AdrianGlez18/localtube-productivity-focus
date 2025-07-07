import { YoutubeAPIVideo } from "../types/youtube-api";

const YOUTUBE_API_KEY = import.meta.env.VITE_YOUTUBE_API_KEY;

export const fetchHomePage = async () => {

    const url = `https://www.googleapis.com/youtube/v3/videos?part=snippet&chart=mostPopular&maxResults=20&key=${YOUTUBE_API_KEY}`;

    try {
        const response = await fetch(url);
        const data = await response.json();
        return data.items;
    } catch (error) {
        console.error('Error fetching YouTube data:', error);
        return [];
    }
}

export const fetchVideoById = async (videoId: string) => {
    const url = `https://www.googleapis.com/youtube/v3/videos?part=snippet&id=${videoId}&key=${YOUTUBE_API_KEY}`;

    try {
        const response = await fetch(url);
        const data = await response.json();
        return data.items?.[0] || {};
    } catch (err) {
        console.error('Failed to fetch video:', err);
        return {};
    }
};