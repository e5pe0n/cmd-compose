import { spawn } from "child_process";
import { Command } from "./command.js";

export function run(commands: Command[]) {
  for (const command of commands) {
    const ps = spawn("/bin/sh", ["-c", command.command]);
    ps.stdout.pipe(process.stdout);
    ps.stderr.pipe(process.stderr);
    ps.on("close", (code) => {
      console.log(`${command.name} exits with ${code}`);
    });
  }
}
