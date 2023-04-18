import Router from "@koa/router";
import { companies, convertCompany } from "../mock/companies";
import { ratingRangesDict } from "../mock/filters/ratingRanges";
import { priceRangesDict } from "../mock/filters/pricesRanges";
import { MinMax } from "../types";
import { contractAmountByOKPD, okpd } from "../mock/okpd";
import { getFacts } from "../mock/fact";

export default function registerRouteApi(router: Router) {
  router.get("/searchByInn", async (ctx) => {
    const searchInn = (ctx.query.searchInn as string) || "";
    const usedInns: (string | number)[] = !!ctx.query.usedInns
      ? JSON.parse(ctx.query.usedInns as string)
      : [];
    ctx.body = companies
      .map(convertCompany)
      .filter(
        ({ inn }) =>
          inn.includes(searchInn.toString()) &&
          !usedInns.map((v) => v.toString()).includes(inn.toString())
      )
      .slice(0, 5);
  });

  router.get("/getByInn", async (ctx) => {
    const searchInn = ctx.query.searchInn as string;
    if (!searchInn) {
      ctx.throw(404);
    }
    let fullInn = companies
      .map(convertCompany)
      .find(({ inn }) => inn === searchInn);

    if (!fullInn) {
      ctx.throw(404);
    }

    ctx.body = { ...fullInn, facts: getFacts(fullInn.inn) };
  });

  const companiesByOKPDPrefix = new Map<string, Set<string>>();
  for (const entry of contractAmountByOKPD) {
    if (!entry.okpd2_code4) continue;
    if (!entry.supplier_inn) continue;
    for (let idx = 1; idx <= 4; idx++) {
      const prefix = entry.okpd2_code4.slice(0, idx);
      const list = companiesByOKPDPrefix.get(prefix) ?? new Set();
      list.add(entry.supplier_inn);
      companiesByOKPDPrefix.set(prefix, list);
    }
  }

  router.get("/getTop", async (ctx) => {
    const priceRanges: MinMax[] = !!ctx.query.priceRanges
      ? JSON.parse(ctx.query.priceRanges as string)
      : [];
    const ratingRanges: MinMax[] = !!ctx.query.ratingRanges
      ? JSON.parse(ctx.query.ratingRanges as string)
      : [];
    const regions: string[] = !!ctx.query.regions
      ? JSON.parse(ctx.query.regions as string)
      : [];
    const scopes: string[] = !!ctx.query.scopes
      ? JSON.parse(ctx.query.scopes as string)
      : [];

    let results = companies
      .filter((company) => {
        if (ratingRanges.length === 0) return true;
        return ratingRanges.some(({ min, max }) => {
          const okMin = min == null || Number(company.SupplierRating) >= min;
          const okMax = max == null || Number(company.SupplierRating) <= max;
          return okMin && okMax;
        });
      })
      .filter((company) => {
        if (priceRanges.length === 0) return true;
        return priceRanges.some(({ min, max }) => {
          const okMin = min == null || Number(company.ContractAmountMax) >= min;
          const okMax = max == null || Number(company.ContractAmountMax) <= max;
          return okMin && okMax;
        });
      })
      .filter((company) => {
        if (scopes.length === 0) return true;
        return scopes.some((code) => {
          const prefix = code.slice(0, 4);
          const set = companiesByOKPDPrefix.get(prefix);
          return set ? set.has(company.INN) : false;
        });
      });
    results.sort(
      (a, b) =>
        (Number(b.SupplierRating) || 0) - (Number(a.SupplierRating) || 0)
    );
    ctx.body = results.slice(0, 5).map(convertCompany);
  });

  router.get("/getCompanies", async (ctx) => {
    const maxItems = (ctx.query.maxItems as string) || "1000";
    ctx.body = companies.slice(0, Number(maxItems)).map(convertCompany);
  });

  router.get("/const", async (ctx) => {
    ctx.body = {
      priceRanges: priceRangesDict,
      ratingRanges: ratingRangesDict,
    };
  });

  router.get("/getScopes", async (ctx) => {
    const scope = (ctx.query.scope as string) || "";

    const records = okpd
      .filter((it) => {
        const okCode = it.code && it.code.startsWith(scope);
        return okCode;
      })
      .slice(0, 20);
    ctx.body = records.map(({ code, name }) => ({ value: code, label: name }));
  });
}
