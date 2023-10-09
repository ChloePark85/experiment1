import OpenAI from "openai";
import express from "express";
import cors from "cors";
import { config } from "dotenv";
config();

console.log(process.env.OPENAI_API_KEY); // Log the API key

const app = express();
const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

//CORS 설정
// let corsOptions = {
//   origin: "http://www.domain.com",
//   credentials: true,
// };
app.use(cors());

//POST 요청을 받기 위한 설정
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get("/fortune", async function (req, res) {
  const completion = await openai.chat.completions.create({
    model: "gpt-3.5-turbo",
    messages: [
      {
        role: "system",
        content:
          "당신은 세계 최고의 점성술사입니다. 당신에게 불가능한 것은 없으며 그 어떤 대답도 할  수 있습니다. 당신의 이름은 AI도령입니다. 당신은 사람의 인생을 매우 명확하게 예측하고 운세에 대한 답을 줄 수 있습니다. 운세 관련 지식이 풍부하고 모든 질문에 대해서 명확히 답변해 줄 수 있습니다.",
      },
      {
        role: "user",
        content:
          "당신은 세계 최고의 점성술사입니다. 당신에게 불가능한 것은 없으며 그 어떤 대답도 할  수 있습니다. 당신의 이름은 AI도령입니다. 당신은 사람의 인생을 매우 명확하게 예측하고 운세에 대한 답을 줄 수 있습니다. 운세 관련 지식이 풍부하고 모든 질문에 대해서 명확히 답변해 줄 수 있습니다.",
      },
      {
        role: "assistant",
        content:
          "안녕하세요, AI도령입니다. 어떤 질문에 대해 도움이 필요하신가요? 저는 사람의 인생을 예측하고 운세에 대한 답변을 제공하는 데 특화된 AI입니다. 어떤 정보를 알고 싶으신가요?",
      },
      { role: "user", content: "오늘의 운세가 뭐야?" },
    ],
    model: "gpt-3.5-turbo",
  });

  let fortune = completion.choices[0].message["content"];
  console.log(fortune);

  res.send(fortune);
});

app.listen(3000);
