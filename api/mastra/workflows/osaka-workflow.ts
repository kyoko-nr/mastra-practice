import { createWorkflow } from "@mastra/core";
import z from "zod";

const osakaWorkflow = createWorkflow({
  id: "osaka-workflow",
  inputSchema: z.object({
    input: z.string(),
  }),
  outputSchema: z.object({
    response: z.string(),
  }),
});

osakaWorkflow.commit();

export { osakaWorkflow };
