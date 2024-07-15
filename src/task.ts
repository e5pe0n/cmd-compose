import chalk from "chalk";
import { spawn } from "child_process";

export const logColors = [
  "magenta",
  "blue",
  "yellow",
  "green",
  "cyan",
  "red",
] as const;

type LogColor = (typeof logColors)[number];

function* genLogColor() {
  let i = 0;
  while (true) {
    yield logColors[i++ % logColors.length];
  }
  return logColors[i++ % logColors.length];
}

export const getLogColor = genLogColor();

export type TaskDto = {
  name: string;
  command: string;
  depends_on: TaskDto["name"][];
};

type Condition =
  | "task_started"
  | "task_healthy"
  | "task_completed_successfully";

export class Task {
  name: string;
  command: string;
  starteds: Task[] = [];
  completeds: Task[] = [];
  healthies: Task[] = [];
  deps: Task["name"][] = [];
  runDeps: Task["name"][] = [];
  logColor: LogColor;
  prefix: string;

  constructor({
    name,
    command,
    logColor,
  }: {
    name: string;
    command: string;
    logColor: LogColor;
  }) {
    this.name = name;
    this.command = command;
    this.logColor = logColor;
    this.prefix = `[${this.name}] `;
  }

  #piped(c: Task) {
    this.deps.push(c.name);
  }

  pipe(task: Task, condition: Condition) {
    task.#piped(this);
    switch (condition) {
      case "task_started":
        this.starteds.push(task);
        break;
      case "task_completed_successfully":
        this.completeds.push(task);
        break;
      case "task_healthy":
        this.healthies.push(task);
    }
  }

  #signal(dep: Task) {
    this.runDeps.push(dep.name);
  }

  get runnable() {
    return this.deps.length === this.runDeps.length;
  }

  #log(data: any) {
    console.log(chalk[this.logColor](this.prefix) + String(data));
  }

  run() {
    if (!this.runnable) {
      return;
    }
    const ps = spawn("/bin/sh", ["-c", this.command]);
    ps.stdout.on("data", (chunk) => this.#log(chunk));
    ps.stderr.on("error", (error) => this.#log(error));
    ps.on("close", (code) => {
      this.#log(`exited with ${code}`);
      for (const completed of this.completeds) {
        completed.#signal(this);
        if (completed.runnable) {
          completed.run();
        }
      }
    });
    for (const started of this.starteds) {
      started.#signal(this);
      if (started.runnable) {
        started.run();
      }
    }
  }
}
