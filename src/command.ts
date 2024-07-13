export type Command = {
  name: string;
  command: string;
  depends_on: Command["name"][];
};
