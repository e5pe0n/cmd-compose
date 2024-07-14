export const logColors = [
  "magenta",
  "blue",
  "yellow",
  "green",
  "cyan",
  "red",
] as const;

export type Command = {
  name: string;
  command: string;
  depends_on: Command["name"][];
  log: (data: unknown) => void;
};

export function topoSort(commands: Command[]): Command[] {
  const entryCandidates = commands.filter(
    (command) => command.depends_on.length === 0
  );
  if (entryCandidates.length === 0) {
    throw new Error(
      "no-depends_on command does not exist. `commands` at least includes one command that has no `depends_on`."
    );
  }
}
