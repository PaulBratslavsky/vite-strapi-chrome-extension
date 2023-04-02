'use strict';
const { Configuration, OpenAIApi } = require("openai");

function configureOpenAi(apiKey) {
  const configuration = new Configuration({
    apiKey: apiKey,
  });
  return new OpenAIApi(configuration);
}

module.exports = () => ({
  async summarize({ payload }) {
    const openai = configureOpenAi(process.env.OPENAI_API_KEY);
    const defaultPrompt = "summarize the following text, format in markdown include title, brief description followed by heading and sections and bullet points:";
    const prompt = defaultPrompt + payload.text;

    const response = await openai.createCompletion({
      model: "text-davinci-003",
      prompt: prompt,
      temperature: 0.7,
      max_tokens: 2500,
    });
    return response.data;
  },
});

