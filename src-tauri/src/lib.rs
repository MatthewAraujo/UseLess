use serde::{Deserialize, Serialize};
use std::process::Command;

#[derive(Serialize, Deserialize)]
struct AppInfo {
    Id: u32,
    ProcessName: String,
    MainWindowTitle: String,
    Path: Option<String>,
}

#[tauri::command]
fn get_windows_apps_visible() -> Vec<AppInfo> {
    let output = Command::new("powershell.exe")
        .args(&[
            "-Command",
            "Get-Process | Where-Object { $_.MainWindowTitle } | Select-Object Id, ProcessName, MainWindowTitle, Path | ConvertTo-Json"
        ])
        .output()
        .expect("Failed to execute PowerShell command");

    if output.status.success() {
        let stdout = String::from_utf8_lossy(&output.stdout);
        // Parse JSON, pode ser array ou objeto único se só 1 processo
        match serde_json::from_str::<serde_json::Value>(&stdout) {
            Ok(json_value) => {
                if json_value.is_array() {
                    serde_json::from_value(json_value).unwrap_or_default()
                } else {
                    // Se só um objeto, retorna um vetor com um único elemento
                    serde_json::from_value::<AppInfo>(json_value)
                        .map(|v| vec![v])
                        .unwrap_or_default()
                }
            }
            Err(_) => vec![],
        }
    } else {
        vec![]
    }
}


#[cfg_attr(mobile, tauri::mobile_entry_point)]
pub fn run() {
    tauri::Builder::default()
        .setup(|app| {
            if cfg!(debug_assertions) {
                app.handle().plugin(
                    tauri_plugin_log::Builder::default()
                        .level(log::LevelFilter::Info)
                        .build(),
                )?;
            }
            Ok(())
        })
        .invoke_handler(tauri::generate_handler![
            get_windows_apps_visible,
        ])
        .run(tauri::generate_context!())
        .expect("error while running tauri application");
}