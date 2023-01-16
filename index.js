import express from "express";
import bodyParser from "body-parser";
import { config } from "dotenv";
import { Configuration, OpenAIApi } from "openai";
config();

const jsonParser = bodyParser.json();
const app = express();
const port = 5000;
const configuration = new Configuration({
  organization: "org-gSgTsWPhnSXYl5VJwwltLyFv",
  apiKey: process.env.OPENAI_API_KEY,
});
const openai = new OpenAIApi(configuration);
app.get("/", (req, res) => {
  res.send("I'm not your buddy guy!");
});

app.post("/", jsonParser, async (req, res) => {
  const { prompt } = req.body;
  try {
    const completion = await openai.createCompletion({
      model: "text-davinci-003",
      prompt,
      temperature: 1,
      max_tokens: 2048,
    });
    res.send(completion.data.choices[0].text);
  } catch (err) {
    console.log("this is the error", err);
  }
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
