import Parser from "rss-parser";

export function feedToString(feed: Parser.Output<{ [key: string]: unknown }>) {
  return feed.items
    .flatMap((item) => {
      const lines = item.content?.split("\n") ?? [];
      return lines
        .map((line) => line.trim())
        .filter((line) => line.length)
        .map((line) => line.replace(/<\/?[^>]+(>|$)/g, ""));
    })
    .join("\n");
}
