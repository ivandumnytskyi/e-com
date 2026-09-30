import aliases from "./alias";

const groups = [
  ["smartphone", "phone", "mobile", "cellphone"],
  ["shoes", "shoe", "sneakers", "sneaker", "trainers"],
  ["watch", "watches"],
  ["sunglasses", "sunglass", "glasses"],
  ["motorcycle", "motorbike", "motorbikes"],
];

const synonymsByTerm = new Map(
  groups.flatMap((group) => group.map((term) => [term, group] as const)),
);

function expandTokens(tokens: string[]): string[][] {
  return tokens.map((token) => {
    const canonical = aliases[token] ?? token;
    return [...new Set(synonymsByTerm.get(canonical) ?? [canonical])];
  });
}

export default expandTokens