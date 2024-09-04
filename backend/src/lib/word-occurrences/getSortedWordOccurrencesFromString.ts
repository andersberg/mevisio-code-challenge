import { WordOccurrences } from "../Api.js";
import { countWordOccurrences } from "./countWordOccurrences.js";

export function getSortedWordOccurrencesFromString(
  text: string,
  blackList: readonly string[] = []
): WordOccurrences[] {
  // Matches words that are at least 2 characters long
  const matches = text.match(/\b\w{2,}\b/g); // TODO: Only works for A-Z
  const words = matches?.map((word) => word.toString()) ?? [];
  const wordOccurrences = countWordOccurrences(
    words.filter((word) => !blackList.includes(word))
  );
  return wordOccurrences.toSorted((a, b) => b.occurrences - a.occurrences);
}
