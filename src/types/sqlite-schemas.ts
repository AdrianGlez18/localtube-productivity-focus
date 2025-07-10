export type LikedVideo = {
    id: number;
    title: string;
    thumbnail: string;
    youtube_id: string;
    author: string;
    date_liked: Date;
}

export type Subscription = {
    id: number;
    name: string;
    channel_id: string;
    image_url: string;
    date_sub: Date;
}

export type WatchLaterVideo = {
    id: number;
    title: string;
    thumbnail: string;
    youtube_id: string;
    author: string;
    date_liked: Date;
}

export type CollectionVideo = {
    id: number;
    title: string;
    description?: string;
    notes?: string;
    tags?: string;
    author: string;
    thumbnail: string;
    youtube_id: string;
    date_added: Date;
}
