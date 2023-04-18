export interface InnFullDto {
  inn: string;
  companyName: string;
  addressRegister: string;
  activityKind: string;
  leader: string;
  post: string;
  avgStaffQty: number;
  catipalSize: number;
  suspiciousFactsInn: { value: string; type: number }[];
  finDurability: { value: string; type: number }[];
  fsspAmountAll: number;
  fsspAmountLazy2Y: number;
  winsPredicted: number;
  topPosition: { rank: number; total: number };
  contractorsCount: number;
  bedNewsCount: number;
  contractorCountTerminationByCustomer: number;
  contractorCountTerminationBySupler: number;
  contractorCountTerminationByCount: number;
  producerCount: number;
  customerMaxPrice: number;
  contractorAmountAll: number;
}

export type MinMax = { min?: number; max?: number };
