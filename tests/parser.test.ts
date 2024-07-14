import { describe, expect, it } from "vitest";
import { parser } from "../src/parser.js";
import { Command } from "../src/command.js";

describe("parser", () => {
  it("parses a string to `Command`s", () => {
    const s = `commands:
  cmd1:
    command: echo 'Hello World from cmd1!'
  cmd2:
    command: echo 'Hello World from cmd2!'
    depends_on:
      - cmd1
`;
    const actual = parser(s);
    expect(actual).toEqual([
      {
        name: "cmd1",
        command: "echo 'Hello World from cmd1!'",
        depends_on: [],
        log: expect.any(Function),
      },
      {
        name: "cmd2",
        command: "echo 'Hello World from cmd2!'",
        depends_on: ["cmd1"],
        log: expect.any(Function),
      },
    ] satisfies Command[]);
  });
});
