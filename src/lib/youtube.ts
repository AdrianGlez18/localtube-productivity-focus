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

export const fetchYoutubeSearchResults = async (
    query: string,
    pageToken?: string
  ): Promise<{
    items: YoutubeAPIVideo[];
    nextPageToken?: string;
    prevPageToken?: string;
  }> => {
    const params = new URLSearchParams({
      key: YOUTUBE_API_KEY,
      q: query,
      part: 'snippet',
      type: 'video',
      maxResults: '20',
    });
  
    if (pageToken) params.set('pageToken', pageToken);
  
    const response = await fetch(
      `https://www.googleapis.com/youtube/v3/search?${params.toString()}`
    );
  
    const data = await response.json();
  
    const items: YoutubeAPIVideo[] = data.items.map((item: any) => ({
      ...item,
      id: item.id.videoId || item.id, // Normalize id
    }));
  
    return {
      items,
      nextPageToken: data.nextPageToken,
      prevPageToken: data.prevPageToken,
    };
  } 

export const fetchChannelData = async (channelId: string) => {
  const url = `https://www.googleapis.com/youtube/v3/channels?part=snippet,statistics&id=${channelId}&key=${YOUTUBE_API_KEY}`;

  try {
    const response = await fetch(url);
    const data = await response.json();
    return data.items?.[0] || {};
  } catch (error) {
    console.error('Error fetching channel data:', error);
    return {};
  }
};