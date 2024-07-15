import { describe, expect, it } from "vitest";
import { parser } from "../src/parser.js";
import { TaskDto } from "../src/task.js";

describe("parser", () => {
  it("parses a string to `TaskDto`s", () => {
    const s = `tasks:
  task1:
    command: echo 'Hello World from task1!'
  task2:
    command: echo 'Hello World from task2!'
    depends_on:
      - task1
`;
    const actual = parser(s);
    expect(actual).toEqual([
      {
        name: "task1",
        command: "echo 'Hello World from task1!'",
        depends_on: [],
      },
      {
        name: "task2",
        command: "echo 'Hello World from task2!'",
        depends_on: ["task1"],
      },
    ] satisfies TaskDto[]);
  });
});
