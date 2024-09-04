import { UnsuccessfulEndpointResponse } from "./Api.js";

export function createUnsuccessfulResponse(
  error: string
): UnsuccessfulEndpointResponse {
  return {
    ok: false,
    error,
  };
}
