import OpenAI from "openai";

const openai = new OpenAI({
  apiKey: "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", // defaults to process.env["OPENAI_API_KEY"]
});

async function main() {
  const completion = await openai.chat.completions.create({
    messages: [{ role: "user", content: "Say this is a test" }],
    model: "gpt-3.5-turbo",
  });

  console.log(completion.choices);
}

main();
