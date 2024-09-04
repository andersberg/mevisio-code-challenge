import { SuccessfulEndpointResponse, WordOccurrences } from "./Api.js";

export function createSuccessfulResponse(
  words: WordOccurrences[]
): SuccessfulEndpointResponse {
  return {
    ok: true,
    words,
  };
}
