import { serve } from "@hono/node-server";
import { Hono } from "hono";
import { marked } from "marked";
import { readFile } from "node:fs/promises";
import { fileURLToPath } from "url";
import { WORD_BLACKLIST } from "./lib/constants.js";
import { createSuccessfulResponse } from "./lib/createSuccessfulResponse.js";
import { createUnsuccessfulResponse } from "./lib/createUnsuccessfulResponse.js";
import { feedToString } from "./lib/rss-feed/feedToString.js";
import { getRssFeed } from "./lib/rss-feed/getRssFeed.js";
import { getSortedWordOccurrencesFromString } from "./lib/word-occurrences/getSortedWordOccurrencesFromString.js";

const app = new Hono()
  .get("/api/challenge", async (c) => {
    const data = await marked(
      await readFile(
        fileURLToPath(new URL("../../CHALLENGE.md", import.meta.url)),
        "utf8"
      ),
      { async: true }
    );

    return c.text(data, { status: 200 });
  })
  .get("/api/word-occurrences/rss", async (c) => {
    const feedURL = c.req.query("url");

    if (!feedURL) {
      return c.json(
        createUnsuccessfulResponse("Missing query parameter 'url'."),
        { status: 400 }
      );
    }

    try {
      const feed = await getRssFeed(feedURL);
      const text = feedToString(feed);
      const wordOccurrences = getSortedWordOccurrencesFromString(
        text,
        WORD_BLACKLIST
      );

      return c.json(createSuccessfulResponse(wordOccurrences), { status: 200 });
    } catch (error: unknown) {
      if (error instanceof Error) {
        return c.json(createUnsuccessfulResponse(error.message), {
          status: 500,
        });
      }

      return c.json(createUnsuccessfulResponse("Unknown error."), {
        status: 500,
      });
    }
  })
  .post("/api/word-occurrences/file", async (c) => {
    const isText = c.req.header("content-type") === "text/plain";
    if (!isText) {
      return c.json(createUnsuccessfulResponse("Invalid content type."), {
        status: 400,
      });
    }

    try {
      const text = await c.req.text();
      const wordOccurrences = getSortedWordOccurrencesFromString(
        text,
        WORD_BLACKLIST
      );

      return c.json(createSuccessfulResponse(wordOccurrences), { status: 200 });
    } catch (error) {
      if (error instanceof Error) {
        return c.json(createUnsuccessfulResponse(error.message), {
          status: 500,
        });
      } else {
        return c.json(createUnsuccessfulResponse("Unknown error."), {
          status: 500,
        });
      }
    }
  })
  .all("/*", async (c) => c.notFound());

serve({
  fetch: app.fetch,
  port: 8126,
});

console.log("Listening on http://localhost:8126");
