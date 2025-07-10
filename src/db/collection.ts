import Database from "@tauri-apps/plugin-sql";
import { CollectionVideo } from "@/types/sqlite-schemas";

export async function getCollection() {
    try {
        const db = await Database.load("sqlite:database.db");
        const result = await db.select<CollectionVideo[]>("SELECT * FROM video_collection");
        return result;
    } catch (error) {
        console.log(error);
        return [];
    }
}

export async function saveToCollection(video: CollectionVideo) {
    try {
        const db = await Database.load("sqlite:database.db");

        await db.execute("INSERT INTO video_collection (title, description, notes, tags, author, thumbnail, youtube_id, date_added) VALUES ($1, $2, $3, $4, $5, $6, $7, $8)", [
            video.title,
            video.description,
            video.notes,
            video.tags,
            video.author,
            video.thumbnail,
            video.youtube_id,
            Date.now()
        ]);

        return true;
    } catch (error) {
        console.log(error);
        return false;
    }
}