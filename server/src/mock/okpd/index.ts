import _okpd from "./okpd.json";
import _contract_amount_by_okpd from "./contract_amount_by_okpd.json";

export interface InOKPD {
    code: string;
    name: string;
}

export interface InContractAmountByOKPD {
    supplier_inn?: string;
    okpd2_code4?: string;
    contractamountmaxbyokpd: number;
    contractamountallbyokpd: number;
}

export const okpd = (_okpd as any).okpd2 as InOKPD[];

export const contractAmountByOKPD = (_contract_amount_by_okpd as any).contract_amount_by_okpd as InContractAmountByOKPD[];
