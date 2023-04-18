// eslint-disable-next-line @typescript-eslint/no-empty-interface
export interface InnFullDto extends Company {
  // @REMOVE
  // @NOTE: заглушка
  [K: string]: any;
  // companyName название компании
  // addressRegister адресс
  // activityKind вид деятельности egrul_info / okved_basic_code
  // leader имя лидера
  // post должность
  // catitalSize egrul_info / capital_size
  // FULL_INN.suspiciousFactsInn факторы хороший/плохой
  // finDurability Финансовая устойчивость
  // bedNewsCount новости по заключённым контрактам хороший/плохой
  // producerCount три поля ниже нужно сделать как в исполнителях, Игорь написал в конфе на скрине что эти поля есть в трейнинг дате(нет)
  // customerMaxPrice
  // customerAmountAll
}

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
  customerRank: number;
  customerTotal: number;
  supplierRank: number;
  supplierTotal: number;
};
