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

        await db.execute("INSERT INTO liked_videos (title, thumbnail, youtube_id, author, date_liked) VALUES ($1, $2, $3, $4, $5)", [
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

export async function checkIfVideoLiked(id: string) {
    try {
        const db = await Database.load("sqlite:database.db");
        const result = await db.select<{ count: number }[]>("SELECT COUNT(*) as count FROM liked_videos WHERE youtube_id = $1", [id]);
        return result[0].count > 0;
    } catch (error) {
        console.log(error);
        return false;
    }
}

export async function deleteLikedVideo(id: number) {
    try {
        const db = await Database.load("sqlite:database.db");
        await db.execute("DELETE FROM liked_videos WHERE id = $1", [id]);
        return true;
    } catch (error) {
        console.log(error);
        return false;
    }
}