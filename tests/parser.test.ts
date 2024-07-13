import fs from "fs";
import path from "path";
import { describe, expect, it } from "vitest";
import { parser } from "../src/parser.js";
import type { Command } from "../src/command.js";

describe("parser", () => {
  it("parse a string to `Command`s", () => {
    const s = fs.readFileSync(
      path.join(import.meta.dirname, "../cmd-compose.yml"),
      { encoding: "utf-8" }
    );
    const commands = parser(s);
    expect(commands).toEqual([
      {
        name: "cmd1",
        command: "echo 'Hello World from cmd1!'",
        depends_on: [],
      },
      {
        name: "cmd2",
        command: "echo 'Hello World from cmd2!'",
        depends_on: ["cmd1"],
      },
    ] satisfies Command[]);
  });
});
