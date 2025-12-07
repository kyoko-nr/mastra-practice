import { Mastra } from "@mastra/core/mastra";
import { osakaAgent } from "./agents/osaka-agent";
import { osakaWorkflow } from "./workflows/osaka-workflow";

/**
 * 大阪弁のふざけたエージェント
 */
export const mastra = new Mastra({
  workflows: { osakaWorkflow },
  agents: { osakaAgent },
});
