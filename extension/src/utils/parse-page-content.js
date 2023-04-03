function getTextContent(selector = "p", onError = "log") {
  try {
    const elements = document.querySelectorAll(selector);
    if (!elements.length) {
      throw new Error("No elements found with the given selector.");
    }

    let textContent = "";

    elements.forEach((element) => {
      textContent += " " + element.textContent;
    });

    return textContent;
  } catch (error) {
    if (onError === "log") {
      console.error(`Error: ${error.message}`);
    } else if (onError === "ignore") {
      // Do nothing
    } else if (onError === "throw") {
      throw error;
    } else {
      console.error(`Invalid onError option: ${onError}`);
    }
    return "";
  }
}



export function parsePageContent() {
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
            function: getTextContent,
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
