// import { ChildProcessByStdio, spawn, spawnSync } from 'child_process';
// import path from 'path';
// import os from 'os';
// import { Writable } from 'stream';

// async function sleep(n: number) {
//     return new Promise(resolve => setTimeout(resolve, n))
// }

// let tauri_instance: ChildProcessByStdio<Writable, null, null>

// export async function setup() {

//     tauri_instance = spawn(
//         path.resolve('src-tauri', 'target', 'release', 'path-kit'),
//         [],
//         { stdio: [null, process.stdout, process.stderr] }
//     );

//     await sleep(25);
// }

// export async function teardown() {
//     if (!tauri_instance) {
//         throw new Error("Trying to tear down tauri driver that does not exist")
//     }
//     // tear it down here
//     tauri_instance.kill();
//     await sleep(25);
// }