#[tauri::command]
fn greet(name: &str) -> String {
    format!("Hello, {}! You've been greeted from Rust!", name)
}

#[cfg_attr(mobile, tauri::mobile_entry_point)]
pub fn run() {
    tauri::Builder::default()
        .plugin(tauri_plugin_sql::Builder::new().add_migrations("sqlite:database.db", vec![
            tauri_plugin_sql::Migration {
                version:1,
                description:"initialize tables",
                sql:include_str!("../migrations/001--initialize_tables.sql"), 
                kind: tauri_plugin_sql::MigrationKind::Up },
        ]).build())
        .plugin(tauri_plugin_opener::init())
        .invoke_handler(tauri::generate_handler![greet])
        .run(tauri::generate_context!())
        .expect("error while running tauri application");
}
