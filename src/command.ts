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
