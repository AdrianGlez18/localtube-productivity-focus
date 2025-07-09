export type LikedVideo = {
    id: number;
    title: string;
    thumbnail: string;
    youtube_id: string;
    date_liked: Date;
}

export type Subscription = {
    id: number;
    name: string;
    channel_id: string;
    image_url: string;
    date_sub: Date;
}