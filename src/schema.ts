import { z } from "zod";

const commandSchema = z.object({
  command: z.string().min(0),
  depends_on: z.array(z.string().min(0)).optional(),
});

const commandNameSchema = z.string().min(0);

const commandsSchema = z.record(commandNameSchema, commandSchema);
export const composeSchema = z.object({
  commands: commandsSchema,
});
