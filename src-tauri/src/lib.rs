use serde::{Deserialize, Serialize};
use std::process::Command;
use std::thread;
use std::time::Duration;
use tauri::Emitter;

#[derive(Serialize, Deserialize, Clone)]
struct AppInfo {
    Id: u32,
    ProcessName: String,
    MainWindowTitle: String,
    Path: Option<String>,
    StartTime: Option<String>,
}

fn get_windows_apps_data() -> Vec<AppInfo> {
    let output = Command::new("powershell.exe")
        .args(&[
            "-Command",
            "Get-Process | Where-Object { $_.MainWindowTitle } | Select-Object Id, ProcessName, MainWindowTitle, Path, StartTime | ConvertTo-Json"
        ])
        .output();

    match output {
        Ok(output) if output.status.success() => {
            let stdout = String::from_utf8_lossy(&output.stdout);
            match serde_json::from_str::<serde_json::Value>(&stdout) {
                Ok(json_value) => {
                    if json_value.is_array() {
                        serde_json::from_value(json_value).unwrap_or_default()
                    } else {
                        serde_json::from_value::<AppInfo>(json_value)
                            .map(|v| vec![v])
                            .unwrap_or_default()
                    }
                }
                Err(_) => vec![],
            }
        }
        _ => vec![],
    }
}

#[tauri::command]
fn get_windows_apps_visible() -> Vec<AppInfo> {
    get_windows_apps_data()
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

            // Spawn a background thread to emit Windows apps data periodically
           let handle = app.handle().clone();
            thread::spawn(move || {
                loop {
                    let apps_data = get_windows_apps_data();
                    
                    if let Err(e) = handle.emit("windows_apps_update", &apps_data) {
                        eprintln!("Failed to emit windows apps update: {}", e);
                    }
                    
                    // Wait for 30 seconds before next update
                    thread::sleep(Duration::from_secs(10));
                }
            });

            Ok(())
        })
        .invoke_handler(tauri::generate_handler![
            get_windows_apps_visible,
        ])
        .run(tauri::generate_context!())
        .expect("error while running tauri application");
}