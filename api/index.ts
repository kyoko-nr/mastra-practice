import { Hono } from "hono";
import { mastra } from "../mastra/index";

const app = new Hono();

app.post("/", async (c) => {
  const body = await c.req.json();

  // Slack URL verification challenge
  if (body.type === "url_verification") {
    return c.json({ challenge: body.challenge });
  }

  if (body.event?.type === "app_mention") {
    const text = body.event.text;
    const user = body.event.user;
    const channel = body.event.channel;
    console.log("text", text, "user", user, "channel", channel);

    // Mastra の AI エージェントを呼ぶ
    const ai = mastra.getWorkflow("osakaWorkflow");
    const run = await ai.createRunAsync();
    const result = await run.start({
      inputData: { input: text },
    });

    const response =
      result.status === "success" ? result.result : { response: "失敗" };

    // Slack に返信
    await fetch("https://slack.com/api/chat.postMessage", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${process.env.SLACK_BOT_TOKEN}`,
      },
      body: JSON.stringify({
        channel,
        text: response.response, // Mastra の出力
      }),
    });

    return c.json({ ok: true });
  }

  return c.json({ ok: true });
});

export default app;
