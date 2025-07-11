import { fetchChannelData } from "@/lib/youtube";
import { Subscription } from "@/types/sqlite-schemas";
import { YoutubeAPIVideo } from "@/types/youtube-api";
import Database from "@tauri-apps/plugin-sql";

export async function getSubscriptions() {
    try {
        const db = await Database.load("sqlite:database.db");
        const dbSubs = await db.select<Subscription[]>("SELECT * FROM subscriptions");
        return dbSubs;
    } catch (error) {
        console.log(error);
        return [];
    }
}

export async function setSubscription(video: YoutubeAPIVideo) {
    try {
        const db = await Database.load("sqlite:database.db");

        const channel = await fetchChannelData(video.snippet.channelId);

        console.log(channel);

        await db.execute("INSERT INTO subscriptions (name, channel_id, image_url, date_sub) VALUES ($1, $2, $3, $4)", [
            video.snippet.channelTitle,
            video.snippet.channelId,
            channel.snippet.thumbnails.default.url,
            Date.now()
        ]);

        return true;
    } catch (error) {
        console.log(error);
        return false;
    }
}

export async function checkIfSubscribed(id: string) {
    try {
        const db = await Database.load("sqlite:database.db");
        const result = await db.select<{ count: number }[]>("SELECT COUNT(*) as count FROM subscriptions WHERE channel_id = $1", [id]);
        return result[0].count > 0;
    } catch (error) {
        console.log(error);
        return false;
    }
}

export async function deleteSubscription(youtubeId: string) {
    try {
        const db = await Database.load("sqlite:database.db");
        await db.execute("DELETE FROM subscriptions WHERE channel_id = $1", [youtubeId]);
        return true;
    } catch (error) {
        console.log(error);
        return false;
    }
}
