import tasklist from 'tasklist';
import path from 'path';
import fs from 'fs';
import { spawn } from 'child_process';

export const executables = ['gta-sa.exe', 'gta_sa.exe'];
export const args = ['-skip'];

export default class Game {

    static getPath() {
        return path.dirname(path.dirname(process.execPath));
    }

    static start(name = null) {
        let started = false;
        let exePool = executables;
        if(name !== null) {
            exePool = [name];
        }
        exePool.forEach(executable => {
            if(started) {
                return;
            }
            let dir = this.getPath();
            let exeFullPath = path.resolve(dir, executable);
            if(fs.existsSync(exeFullPath)) {
                spawn(executable, args, {
                    cwd: dir,
                    detached: true
                });
                started = true;
            }
        });
    }

    static async stop() {
        let name = false;
        for(let executable of executables) {
            let pid = await this.getProcessID(executable);
            if(!pid) {
                continue;
            }
            process.kill(pid);
            name = executable;
        }

        // Wait for process to end
        while(true) {
            let pid = await this.getProcessID(name);
            if(!pid) {
                return name;
            }
            setTimeout(() => {}, 10);
        }
    }

    static async getProcessID(executable) {
        let tasks = await tasklist();
        let pid = false;
        tasks.forEach(task => {
            if(task.imageName === executable) {
                pid = task.pid;
            }
        });
        return pid;
    }
}