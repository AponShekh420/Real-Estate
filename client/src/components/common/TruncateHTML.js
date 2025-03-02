"use client";
export const truncateHTML = (html, wordLimit) => {
  if (typeof window === "undefined") {
    return null;
  }
  const parser = new DOMParser();
  const doc = parser.parseFromString(html, "text/html");
  let wordCount = 0;

  const processNode = (node) => {
    if (wordCount >= wordLimit) return null;

    if (node.nodeType === Node.TEXT_NODE) {
      const words = node.textContent.split(/\s+/);
      const remainingWords = words.slice(0, wordLimit - wordCount).join(" ");
      wordCount += words.length;

      return document.createTextNode(remainingWords);
    }

    if (node.nodeType === Node.ELEMENT_NODE) {
      const newNode = document.createElement(node.tagName);
      Array.from(node.attributes).forEach((attr) =>
        newNode.setAttribute(attr.name, attr.value)
      );

      for (let child of node.childNodes) {
        const processedChild = processNode(child);
        if (processedChild) newNode.appendChild(processedChild);
        if (wordCount >= wordLimit) break;
      }
      return newNode;
    }
    return null;
  };

  const newBody = document.createElement("div");
  for (let child of doc.body.childNodes) {
    const processedChild = processNode(child);
    if (processedChild) newBody.appendChild(processedChild);
    if (wordCount >= wordLimit) break;
  }

  return { htmlText: newBody.innerHTML, wordCount };
};
