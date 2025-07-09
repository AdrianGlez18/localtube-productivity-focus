import { LikedVideo } from "@/types/sqlite-schemas";
import { YoutubeAPIVideo } from "@/types/youtube-api";
import Database from "@tauri-apps/plugin-sql";

export async function getLikedVideos() {
    try {
        const db = await Database.load("sqlite:database.db");
        const dbLikedVideos = await db.select<LikedVideo[]>("SELECT * FROM liked_videos");
        return dbLikedVideos;
    } catch (error) {
        console.log(error);
        return [];
    }
}

export async function setLikedVideo(video: YoutubeAPIVideo) {
    try {
        const db = await Database.load("sqlite:database.db");

        await db.execute("INSERT INTO liked_videos (title, thumbnail, youtube_id, date_liked) VALUES ($1, $2, $3, $4)", [
            video.snippet.title,
            video.snippet.thumbnails.standard?.url || video.snippet.thumbnails.medium?.url || video.snippet.thumbnails.default?.url,
            video.id,
            Date.now()
        ]);

        return true;
    } catch (error) {
        console.log(error);
        return false;
    }
}