CREATE TABLE IF NOT EXISTS liked_videos (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    title TEXT NOT NULL,
    thumbnail TEXT NOT NULL,
    youtube_id TEXT NOT NULL,
    author TEXT NOT NULL,
    date_liked TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
CREATE TABLE IF NOT EXISTS watch_later (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    title TEXT NOT NULL,
    thumbnail TEXT NOT NULL,
    youtube_id TEXT NOT NULL,
    author TEXT NOT NULL,
    date_added TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
CREATE TABLE IF NOT EXISTS video_collection (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    title TEXT NOT NULL,
    description TEXT,
    notes TEXT,
    tags TEXT,
    author TEXT NOT NULL,
    thumbnail TEXT NOT NULL,
    youtube_id TEXT NOT NULL,
    date_added TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
CREATE TABLE IF NOT EXISTS subscriptions (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT NOT NULL,
    channel_id TEXT NOT NULL,
    image_url TEXT NOT NULL,
    date_sub TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);