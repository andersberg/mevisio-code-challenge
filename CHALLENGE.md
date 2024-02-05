# Welcome to the Mevisio Code Challenge

> 🙋 **Psst...** Do you feel comfortable with solving problems in
> the frontend too? Start from the [`main` branch][main-branch]
> instead!

[main-branch]: https://github.com/mevisio/code-challenge/

### Introduction

Welcome! This project has a back-end and a front-end that work together.
The backend lives in the `backend` directory, and consists of a _very_
simple HTTP server using vanilla Node.js APIs.

The frontend lives in (you guessed it!) the `frontend` directory, and
is a React application, bundled using Vite.

Both use TypeScript in `strict` mode.

> **Note:** There is no prepared support for "building" this project
> for "production". In development mode, Vite proxies the `/api` path
> to the running backend so we don't have to worry about CORS headers.

## The Challenge

Your task is to make a "word cloud" based on the frequency of words in
a dataset. The dataset should be either an **RSS feed URL**, or an **uploaded
text file**, which should be provided by the user. So, to summarize:

1. The user should be able to input what dataset they want to use for
   the word cloud generation.
2. The word cloud should display the words that occur in the dataset,
   with the size of each word representing the number of occurrences.

> **Note:** It is common for word clouds to omit stop words (like "and"
> and "or", etc.). Otherwise they would naturally skew the result since
> they are so common. Feel free to do that too!

The frontend is provided for you, and expects the backend to support the
following endpoints:

```http
GET /api/word-occurrences/rss?url=<url-to-an-RSS-feed>
```

```http
POST /api/word-occurrences/file
Content-Type: text/plain

<plain text file>
```

Both of these endpoints should return a JSON response with the following
schema:

```typescript
type EndpointResponse =
  SuccessfulEndpointResponse |
  UnsuccessfulEndpointResponse;

interface UnsuccessfulEndpointResponse {
  ok: false;

  /**
   * A description of what went wrong.
   */
  error: string;
}

interface SuccessfulEndpointResponse {
  ok: true;

  /**
   * This field should be sorted by the
   * number of occurrences, in descending
   * order.
   */
  words: WordOccurrences[];
}

interface WordOccurrences {
  word: string;
  occurrences: number;
}
```

### The Rules

There aren't very many rules. You can install dependencies if you like,
and you don't _have_ to use any of the prepared boilerplate if you
don't want to. We want you to solve this challenge in a way that
represents you as a programmer.

That being said, things we look for in your solution include:

* The code is written in TypeScript and is type-safe, and the TypeScript
  compiler doesn't complain when type-checking the project. Run
  `yarn type-check` to make sure.
* The application looks pretty! You decide what that means to you 😉

#### What's Next?

We will review your solution together during your interview, where we
will discuss merits and potential improvements. We expect you to be
able to critique the solution yourself, so we don't expect you to do
"everything right" in the solution – as long as you can explain what
your have done _as well as what you haven't done_, we're not going to
hold you to any pragmatic decision made during the challenge.

Good Luck!
