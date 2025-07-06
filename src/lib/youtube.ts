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