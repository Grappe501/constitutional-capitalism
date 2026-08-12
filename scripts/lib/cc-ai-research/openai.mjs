/**
 * Server/CLI-only OpenAI caller. Never import this into browser Astro components.
 */

export function getApiKey() {
  const key = process.env.OPENAI_API_KEY || "";
  return key.trim();
}

export function assertServerSide() {
  if (typeof window !== "undefined") {
    throw new Error(
      "OPENAI_API_KEY must never be used in browser JavaScript."
    );
  }
}

export async function chatCompletion({
  messages,
  model = process.env.OPENAI_MODEL || "gpt-4o-mini",
  temperature = 0.2,
}) {
  assertServerSide();
  const apiKey = getApiKey();
  if (!apiKey) {
    const err = new Error(
      "OPENAI_API_KEY is not set in the server/build environment."
    );
    err.code = "MISSING_API_KEY";
    throw err;
  }

  const res = await fetch("https://api.openai.com/v1/chat/completions", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${apiKey}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      model,
      temperature,
      messages,
    }),
  });

  const body = await res.json().catch(() => ({}));
  if (!res.ok) {
    const err = new Error(
      body?.error?.message || `OpenAI HTTP ${res.status}`
    );
    err.code = "OPENAI_HTTP";
    err.status = res.status;
    throw err;
  }

  return {
    model: body.model || model,
    content: body.choices?.[0]?.message?.content || "",
    usage: body.usage || null,
  };
}
