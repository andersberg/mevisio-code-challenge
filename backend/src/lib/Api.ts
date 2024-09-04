export interface UnsuccessfulEndpointResponse {
  readonly ok: false;

  /**
   * A description of what went wrong.
   */
  readonly error: string;
}

export interface SuccessfulEndpointResponse {
  readonly ok: true;

  /**
   * This field should be sorted by the
   * number of occurrences, in descending
   * order.
   */
  readonly words: WordOccurrences[];
}

export interface WordOccurrences {
  readonly word: string;
  readonly occurrences: number;
}
