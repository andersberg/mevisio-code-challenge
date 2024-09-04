import { WordOccurrences } from "../Api.js";

export function countWordOccurrences(words: string[]): WordOccurrences[] {
  const wordMap = new Map<string, number>();

  for (const word of words) {
    const lowerCasedWord = word.toLowerCase();
    if (wordMap.has(lowerCasedWord)) {
      const currentCount = wordMap.get(lowerCasedWord) ?? 0;
      wordMap.set(lowerCasedWord, currentCount + 1);
    } else {
      wordMap.set(lowerCasedWord, 1);
    }
  }

  return Array.from(wordMap.entries()).map(([word, occurrences]) => ({
    word,
    occurrences,
  }));
}
