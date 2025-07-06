use tauri_plugin_sql::{Migration, MigrationKind};

#[tauri::command]
fn greet(name: &str) -> String {
    format!("Hello, {}! You've been greeted from Rust!", name)
}

#[cfg_attr(mobile, tauri::mobile_entry_point)]
pub fn run() {
    let migrations = vec![
        Migration {
            version: 1,
            description: "Initialize liked_videos table",
            sql: "CREATE TABLE IF NOT EXISTS liked_videos (
                id INTEGER PRIMARY KEY AUTOINCREMENT,
                title TEXT NOT NULL,
                thumbnail TEXT NOT NULL,
                url TEXT NOT NULL,
                date_liked TIMESTAMP DEFAULT CURRENT_TIMESTAMP
            )",
            kind: MigrationKind::Up,
        },
        Migration {
            version: 2,
            description: "Initialize video_collection table",
            sql: "CREATE TABLE IF NOT EXISTS video_collection (
                id INTEGER PRIMARY KEY AUTOINCREMENT,
                title TEXT NOT NULL,
                description TEXT,
                notes TEXT,
                tags TEXT,
                author TEXT NOT NULL,
                thumbnail TEXT NOT NULL,
                url TEXT NOT NULL,
                date_added TIMESTAMP DEFAULT CURRENT_TIMESTAMP
            )",
            kind: MigrationKind::Up,
        }
    ];
    
    tauri::Builder::default()
        .plugin(tauri_plugin_sql::Builder::new().add_migrations("sqlite:database.db", migrations).build())
        .plugin(tauri_plugin_opener::init())
        .invoke_handler(tauri::generate_handler![greet])
        .run(tauri::generate_context!())
        .expect("error while running tauri application");
}
