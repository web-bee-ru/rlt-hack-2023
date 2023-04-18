import _companies from "./companies.json";
export type InCompany = {
  INN: string;
  StatusID: string;
  CustomerStatusID: null | string;
  SuspiciousFactsCount: string;
  YearRegistration: string;
  avg_staff_qty: string;
  CoefficientEquityAutonomy: string;
  CoefficientEquityRatio: string;
  CoefficientFinancialStability: string;
  CoefficientInterestCoverage: string;
  Income: string;
  NetProfit: string;
  IncomeTax: string;
  AltmanIndex: string;
  ContractAmountAll: string;
  ContractAmountBad: string;
  fssp_AmountAll: string;
  fssp_AmountLast2Y: string;
  ContractsCount: string;
  ContractsCountBad: string;
  BadNewsCount: string;
  procedure_qty44: string;
  win_qty44: string;
  procedure_qty223: string;
  win_qty223: string;
  ContractCountTerminationByCourt: string;
  ContractCountTerminationByCustomer: string;
  ContractCountTerminationBySupplier: string;
  bankGuaranteeAmount: string;
  cashAccountAmount: string;
  ContractAmountMax: string;
  IsForeign: "NULL";
  IsOffshore: "NULL";
  IsTax: "NULL";
  IsStop: "NULL";
  IsDrop: "NULL";
  IsBankrupt: "NULL";
  IsDisqualified: "NULL";
  IsKoAP: "NULL";
  CustomerRating: string;
  SupplierRating: string;

  okved_basic_code: string;
  entity_wo_attorney_position: string;
  capital_size: string;
  SuspiciousFactsCount_Customer: string;
  ContractAmountAll_Customer: string;
  ContractAmountBad_Customer: string;
  ContractsCount_Customer: string;
  ContractsCountBad_Customer: string;
  BadNewsCount_Customer: string;
  ContractCountTerminationByCourt_Customer: string;
  ContractCountTerminationByCustomer_Customer: string;
  ContractCountTerminationBySupplier_Customer: string;
  ProceduresCount: string;
  ComplaintsCount: string;
  customer_max_price: string;
  CustomerRank: string;
  CustomerTotal: string;
  SupplierRank: string;
  SupplierTotal: string;
};

export type Company = {
  inn: string;
  statusID: number;
  customerStatusID: null | number;
  suspiciousFactsCount: number;
  yearRegistration: number;
  avgStaffQty: number;
  coefficientEquityAutonomy: number;
  coefficientEquityRatio: number;
  coefficientFinancialStability: number;
  coefficientInterestCoverage: number;
  income: number;
  netProfit: number;
  incomeTax: number;
  altmanIndex: number;
  contractAmountAll: number;
  contractAmountBad: number;
  fsspAmountAll: number;
  fsspAmountLast2Y: number;
  contractsCount: number;
  contractsCountBad: number;
  badNewsCount: number;
  procedureQty44: number;
  winQty44: number;
  procedureQty223: number;
  winQty223: number;
  contractCountTerminationByCourt: number;
  contractCountTerminationByCustomer: number;
  contractCountTerminationBySupplier: number;
  bankGuaranteeAmount: number;
  cashAccountAmount: number;
  contractAmountMax: number;
  isForeign: boolean;
  isOffshore: boolean;
  isTax: boolean;
  isStop: boolean;
  isDrop: boolean;
  isBankrupt: boolean;
  isDisqualified: boolean;
  isKoAP: boolean;
  customerRating: number;
  supplierRating: number;
  facts?: string[];
  okvedBasicCode: number;
  entityWoAttorneyPosition: string;
  capitalSize: number | null;
  suspiciousFactsCountCustomer: number;
  contractAmountAllCustomer: number;
  contractAmountBadCustomer: number;
  contractsCountCustomer: number;
  contractsCountBadCustomer: number;
  badNewsCountCustomer: number;
  contractCountTerminationByCourtCustomer: number;
  contractCountTerminationByCustomerCustomer: number;
  contractCountTerminationBySupplierCustomer: number;
  proceduresCount: number;
  complaintsCount: number;
  customerMaxPrice: number;
  customerRank: number | null;
  customerTotal: number | null;
  supplierRank: number;
  supplierTotal: number;
};

export function convertCompany(inCompany: InCompany): Company {
  return {
    inn: inCompany.INN,
    customerStatusID: inCompany.CustomerStatusID
      ? Number(inCompany.CustomerStatusID)
      : null,
    suspiciousFactsCount: Number(inCompany.SuspiciousFactsCount),
    yearRegistration: Number(inCompany.YearRegistration),
    avgStaffQty: Number(inCompany.avg_staff_qty),
    coefficientEquityAutonomy: Number(inCompany.CoefficientEquityAutonomy),
    coefficientEquityRatio: Number(inCompany.CoefficientEquityRatio),
    coefficientFinancialStability: Number(
      inCompany.CoefficientFinancialStability
    ),
    coefficientInterestCoverage: Number(inCompany.CoefficientInterestCoverage),
    income: Number(inCompany.Income),
    netProfit: Number(inCompany.NetProfit),
    incomeTax: Number(inCompany.IncomeTax),
    altmanIndex: Number(inCompany.AltmanIndex),
    contractAmountAll: Number(inCompany.ContractAmountAll),
    contractAmountBad: Number(inCompany.ContractAmountBad),
    fsspAmountAll: Number(inCompany.fssp_AmountAll),
    fsspAmountLast2Y: Number(inCompany.fssp_AmountLast2Y),
    contractsCount: Number(inCompany.ContractsCount),
    contractsCountBad: Number(inCompany.ContractsCountBad),
    badNewsCount: Number(inCompany.BadNewsCount),
    procedureQty44: Number(inCompany.procedure_qty44),
    winQty44: Number(inCompany.win_qty44),
    procedureQty223: Number(inCompany.procedure_qty223),
    winQty223: Number(inCompany.win_qty223),
    contractCountTerminationByCourt: Number(
      inCompany.ContractCountTerminationByCourt
    ),
    contractCountTerminationByCustomer: Number(
      inCompany.ContractCountTerminationByCustomer
    ),
    contractCountTerminationBySupplier: Number(
      inCompany.ContractCountTerminationBySupplier
    ),
    bankGuaranteeAmount: Number(inCompany.bankGuaranteeAmount),
    cashAccountAmount: Number(inCompany.cashAccountAmount),
    contractAmountMax: Number(inCompany.ContractAmountMax),
    statusID: Number(inCompany.StatusID),
    isForeign: inCompany.IsForeign !== "NULL",
    isOffshore: inCompany.IsOffshore !== "NULL",
    isTax: inCompany.IsTax !== "NULL",
    isStop: inCompany.IsStop !== "NULL",
    isDrop: inCompany.IsDrop !== "NULL",
    isBankrupt: inCompany.IsBankrupt !== "NULL",
    isDisqualified: inCompany.IsDisqualified !== "NULL",
    isKoAP: inCompany.IsKoAP !== "NULL",
    customerRating: inCompany.CustomerRating
      ? Number(inCompany.CustomerRating)
      : 0,
    supplierRating: Number(inCompany.SupplierRating),
    okvedBasicCode: Number(inCompany.okved_basic_code),
    entityWoAttorneyPosition: inCompany.entity_wo_attorney_position,
    capitalSize:
      inCompany.capital_size !== "NULL" ? Number(inCompany.capital_size) : null,
    suspiciousFactsCountCustomer: Number(
      inCompany.SuspiciousFactsCount_Customer
    ),
    contractAmountAllCustomer: Number(inCompany.ContractAmountAll_Customer),
    contractAmountBadCustomer: Number(inCompany.ContractAmountBad_Customer),
    contractsCountCustomer: Number(inCompany.ContractsCount_Customer),
    contractsCountBadCustomer: Number(inCompany.ContractsCountBad_Customer),
    badNewsCountCustomer: Number(inCompany.BadNewsCount_Customer),
    contractCountTerminationByCourtCustomer: Number(
      inCompany.ContractCountTerminationByCourt_Customer
    ),
    contractCountTerminationByCustomerCustomer: Number(
      inCompany.ContractCountTerminationByCustomer_Customer
    ),
    contractCountTerminationBySupplierCustomer: Number(
      inCompany.ContractCountTerminationBySupplier_Customer
    ),
    proceduresCount: Number(inCompany.ProceduresCount),
    complaintsCount: Number(inCompany.ComplaintsCount),
    customerMaxPrice: Number(inCompany.customer_max_price),
    customerRank:
      inCompany.CustomerRank !== "NULL" ? Number(inCompany.CustomerRank) : null,
    customerTotal:
      inCompany.CustomerTotal !== "NULL"
        ? Number(inCompany.CustomerTotal)
        : null,
    supplierRank: Number(inCompany.SupplierRank),
    supplierTotal: Number(inCompany.SupplierTotal),
  };
}

export const companies = _companies as InCompany[];
