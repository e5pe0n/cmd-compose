import { spawn } from "child_process";
import { Command } from "./command.js";

export function run(commands: Command[]) {
  for (const command of commands) {
    const ps = spawn("/bin/sh", ["-c", command.command]);
    ps.stdout.on("data", (data) => {
      command.log(data);
    });
    ps.on("close", (code) => {
      command.log(`exited with ${code}`);
    });
  }
}
