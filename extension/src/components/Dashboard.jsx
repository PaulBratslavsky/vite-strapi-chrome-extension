import React, { useState } from "react";
import { parsePageContent } from "../utils/parse-page-content";
import MarkdownText from "./MarkdownText";

async function summarizeText(text, token) {
  console.log(text, "text");
  console.log(token, "token");
  try {
    const response =  await fetch("http://localhost:1337/api/open-ai/summarize", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + token,
      },
      body: JSON.stringify({
        payload: {
          text: text,
        }
      }),
    });

    const data = await response.json();
    console.log(data, "data");
    return data;
  } catch (error) {
    console.log(error);
  }
}

export default function Dashboard({ children, credentials }) {
  const [textContent, setTextContent] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleParseAndSummarize = async () => {
    setIsLoading(true);
    const pageContent = await parsePageContent();
    const summarizedText = await summarizeText(pageContent,credentials.token);
    if (summarizedText?.text) setTextContent(summarizedText.text);
    setIsLoading(false);
  };

  if (isLoading) return <p>Loading...</p>;

  return (
    <div>
      <div>
        <h1 className='text-xl my-2'>Dashboard</h1>
        <button className="bg-violet-600 text-white px-3 py-2 rounded-md" onClick={handleParseAndSummarize}>Summarize Page</button>
        {textContent && <MarkdownText markdown={textContent} />}
      </div>
      <div>{children}</div>
    </div>
  );
}
