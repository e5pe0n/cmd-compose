import { parse } from "yaml";
import { composeSchema } from "./schema.js";
import type { Command } from "./command.js";

export function parser(s: string): Command[] {
  const yaml = parse(s);
  const { commands } = composeSchema.parse(yaml);
  return Object.entries(commands).map(([name, rest]) => {
    const { depends_on = [] } = rest;
    return { name, ...rest, depends_on };
  });
}
