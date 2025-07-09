import { WatchLaterVideo } from "@/types/sqlite-schemas";
import { YoutubeAPIVideo } from "@/types/youtube-api";
import Database from "@tauri-apps/plugin-sql";

export async function getWatchLaterVideos() {
    try {
        const db = await Database.load("sqlite:database.db");
        const dbWatchLater = await db.select<WatchLaterVideo[]>("SELECT * FROM watch_later");
        return dbWatchLater;
    } catch (error) {
        console.log(error);
        return [];
    }
}

export async function setWatchLaterVideo(video: YoutubeAPIVideo) {
    try {
        const db = await Database.load("sqlite:database.db");

        await db.execute("INSERT INTO watch_later (title, thumbnail, youtube_id, author, date_added) VALUES ($1, $2, $3, $4, $5)", [
            video.snippet.title,
            video.snippet.thumbnails.standard?.url || video.snippet.thumbnails.medium?.url || video.snippet.thumbnails.default?.url,
            video.id,
            video.snippet.channelTitle,
            Date.now()
        ]);

        return true;
    } catch (error) {
        console.log(error);
        return false;
    }
}