import { parse } from "yaml";
import { composeSchema } from "./schema.js";
import { logColors, type Command } from "./command.js";
import chalk from "chalk";

export function parser(s: string): Command[] {
  const yaml = parse(s.trim());
  const { commands } = composeSchema.parse(yaml);
  return Object.entries(commands).map(([name, rest], i) => {
    const { depends_on = [] } = rest;
    const prefix = `[${name}] `;
    return {
      name,
      ...rest,
      depends_on,
      log: (data) => {
        console.log(
          chalk[logColors[i % logColors.length]](prefix) + String(data)
        );
      },
    };
  });
}
