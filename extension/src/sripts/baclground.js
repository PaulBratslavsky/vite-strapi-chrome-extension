// background.js
chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  if (request.action === "parsePageContent") {
    chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
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
          sendResponse(results[0].result);
        }
      );
    });
    return true;
  }
});
