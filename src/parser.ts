import { parse } from "yaml";
import { composeSchema } from "./schema.js";
import { type TaskDto } from "./task.js";

export function parser(s: string): TaskDto[] {
  const yaml = parse(s.trim());
  const { tasks: commands } = composeSchema.parse(yaml);
  return Object.entries(commands).map(([name, rest], i) => {
    const { depends_on = [] } = rest;
    return {
      name,
      ...rest,
      depends_on,
    };
  });
}
