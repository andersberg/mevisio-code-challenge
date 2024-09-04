import Parser from "rss-parser";

const parser = new Parser();

export async function getRssFeed(url: string) {
  const response = await fetch(url);
  const text = await response.text();
  const feed = parser.parseString(text);
  return feed;
}
