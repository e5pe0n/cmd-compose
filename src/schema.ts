import { z } from "zod";

const taskSchema = z.object({
  command: z.string().min(0),
  depends_on: z.array(z.string().min(0)).optional(),
});

const taskNameSchema = z.string().min(0);

const tasksSchema = z.record(taskNameSchema, taskSchema);
export const composeSchema = z.object({
  tasks: tasksSchema,
});
