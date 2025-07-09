use sysinfo::{ProcessExt, System, SystemExt};
use std::thread;
use std::time::Duration;

fn main() {
    println!("=== Process Monitor Example ===\n");

    // Example 1: Get all running processes
    println!("1. All running processes:");
    let mut sys = System::new_all();
    sys.refresh_all();

    for (pid, process) in sys.processes() {
        println!("PID: {}, Name: {}, CPU: {:.1}%, Memory: {} KB", 
                 pid, 
                 process.name(), 
                 process.cpu_usage(), 
                 process.memory() / 1024);
    }

    // Example 2: Get top 10 processes by CPU usage
    println!("\n2. Top 10 processes by CPU usage:");
    let mut processes: Vec<_> = sys.processes().iter().collect();
    processes.sort_by(|a, b| b.1.cpu_usage().partial_cmp(&a.1.cpu_usage()).unwrap());
    
    for (i, (pid, process)) in processes.iter().take(10).enumerate() {
        println!("{}. PID: {}, Name: {}, CPU: {:.1}%, Memory: {} KB", 
                 i + 1,
                 pid, 
                 process.name(), 
                 process.cpu_usage(), 
                 process.memory() / 1024);
    }

    // Example 3: Find specific process
    println!("\n3. Looking for 'chrome' processes:");
    for (pid, process) in sys.processes() {
        if process.name().to_lowercase().contains("chrome") {
            println!("Found Chrome process - PID: {}, CPU: {:.1}%, Memory: {} KB", 
                     pid, 
                     process.cpu_usage(), 
                     process.memory() / 1024);
        }
    }

    // Example 4: Real-time monitoring (update every 2 seconds)
    println!("\n4. Real-time monitoring (press Ctrl+C to stop):");
    loop {
        sys.refresh_all();
        
        println!("\n=== System Status ===");
        println!("Total Memory: {} MB", sys.total_memory() / 1024 / 1024);
        println!("Used Memory: {} MB", sys.used_memory() / 1024 / 1024);
        println!("CPU Usage: {:.1}%", sys.global_cpu_info().cpu_usage());
        
        println!("\nTop 5 processes:");
        let mut top_processes: Vec<_> = sys.processes().iter().collect();
        top_processes.sort_by(|a, b| b.1.cpu_usage().partial_cmp(&a.1.cpu_usage()).unwrap());
        
        for (i, (pid, process)) in top_processes.iter().take(5).enumerate() {
            println!("{}. {} (PID: {}) - CPU: {:.1}%, Memory: {} KB", 
                     i + 1,
                     process.name(), 
                     pid, 
                     process.cpu_usage(), 
                     process.memory() / 1024);
        }
        
        thread::sleep(Duration::from_secs(2));
    }
} 