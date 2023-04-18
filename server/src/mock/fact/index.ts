import facts from "./facts.json";
import factCompany from "./factCompany.json";
type FactCompany = { SuspiciousFacts_Inn: string; SuspiciousFacts_ID: string };

export function getFacts(inn: string): string[] {
  const curFacts = (factCompany as FactCompany[])
    .filter(({ SuspiciousFacts_Inn }) => SuspiciousFacts_Inn === inn)
    .map(({ SuspiciousFacts_ID }) =>
      facts.find(
        ({ SuspiciousFactsID }) => SuspiciousFactsID === SuspiciousFacts_ID
      )
    )
    .map(({ SuspiciousFactsName }) => SuspiciousFactsName);

  return curFacts;
}
