#[cfg_attr(
    all(not(debug_assertions), target_os = "windows"),
    windows_subsystem = "windows"
)]
use flate2::read::GzDecoder;
use std::fs::File;
use std::io::prelude::*;

#[tauri::command]
fn load_gzipped_file(file_path: String) -> Vec<u8> {
    let mut file = File::open(file_path).expect("failed to open file");

    let mut gz = GzDecoder::new(&file);
    let mut contents = Vec::new();
    gz.read_to_end(&mut contents).expect("failed to read file");

    contents
}

#[async_std::main]
async fn main() {
    tauri::Builder::default()
        .plugin(tauri_plugin_sql::Builder::default().build())
        .run(tauri::generate_context!())
        .expect("error while running tauri application");
}
