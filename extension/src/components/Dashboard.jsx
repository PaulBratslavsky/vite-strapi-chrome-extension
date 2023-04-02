import React, { useState } from "react";

function parsePageContent() {
  return new Promise((resolve, reject) => {
    chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
      const currentUrl = tabs[0].url;
      const allowedProtocols = ["http:", "https:"];
      const url = new URL(currentUrl);

      if (allowedProtocols.includes(url.protocol)) {
        let tabId = tabs[0].id;
        chrome.scripting.executeScript(
          {
            target: { tabId: tabId },
            function: () => {
              const paragraphs = document.querySelectorAll("p");
              let textContent = "";

              paragraphs.forEach((paragraph) => {
                textContent += " " + paragraph.textContent;
              });

              return textContent;
            },
          },
          (results) => {
            if (chrome.runtime.lastError) {
              reject(chrome.runtime.lastError.message);
            } else {
              const pageContent = results[0].result;
              console.log(pageContent, "pageContent");
              resolve(pageContent);
            }
          }
        );
      } else {
        reject(
          "Error: Cannot access a chrome:// URL or other restricted URLs."
        );
      }
    });
  });
}


export default function Dashboard({ children }) {
  const [textContent, setTextContent] = useState("");

  const handleParseAndSummarize = async () => {
    const result = await parsePageContent();
    setTextContent(result);
  };

  return (
    <div>
      <div>
        <h1>Dashboard</h1>
        <button onClick={handleParseAndSummarize}>Summarize Page</button>
        {textContent && <p>{textContent}</p>}
      </div>
      <div>{children}</div>
    </div>
  );
}
