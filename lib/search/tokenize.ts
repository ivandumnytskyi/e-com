function tokenizeQuery(querry: string): string[] {
  return querry
    .normalize("NFKC")
    .toLowerCase()
    .trim()
    .replace(/[^\p{L}\p{N}]+/gu, " ")
    .replace(/\s+/g, " ")
    .split(" ")
    .filter(Boolean);
}

export default tokenizeQuery;
