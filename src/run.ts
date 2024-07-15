import { getLogColor, Task, TaskDto } from "./task.js";

export function run(taskDtos: TaskDto[]) {
  const entryTaskNames = taskDtos
    .filter((v) => v.depends_on.length === 0)
    .map((v) => v.name);
  if (entryTaskNames.length === 0) {
    throw new Error("no entries");
  }

  const taskMap: Map<Task["name"], Task> = new Map();
  for (const taskDto of taskDtos) {
    const task = new Task({ ...taskDto, logColor: getLogColor.next().value });
    taskMap.set(task.name, task);
  }

  if (taskMap.size !== taskDtos.length) {
    throw new Error("task name duplicated");
  }

  for (const taskDto of taskDtos) {
    for (const dep of taskDto.depends_on) {
      const task1 = taskMap.get(dep)!;
      const task2 = taskMap.get(taskDto.name)!;
      task1.pipe(task2, "task_started");
    }
  }

  for (const entryTaskName of entryTaskNames) {
    const task = taskMap.get(entryTaskName)!;
    task.run();
  }
}
