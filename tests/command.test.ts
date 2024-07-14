import { describe, expect, it, vi } from "vitest";
import { Command, topoSort } from "../src/command.js";

describe("command", () => {
  describe("topoSort", () => {
    it("throws error if no-depends_on command does not exist", () => {
      const commands: Command[] = [
        {
          name: "cmd1",
          command: "echo 'cmd1'",
          depends_on: ["cmd2"],
          log: vi.fn(),
        },
        {
          name: "cmd2",
          command: "echo 'cmd2'",
          depends_on: ["cmd1"],
          log: vi.fn(),
        },
      ];
      expect(() => topoSort(commands)).throw(
        /no-depends_on command does not exist/
      );
    });
    it("topological-sorts `Command`s", () => {});
  });
});
