export interface SingleField {
  fieldName: string;
  title: string;
  description?: string;
  order?: number;
  isHidden?: boolean;
}

export const fieldsDescriptions: SingleField[] = [
  {
    fieldName: 'inn',
    title: 'ИНН',
  },
  {
    fieldName: 'supplierRating',
    title: 'Рейтинг исполнителя',
  },
  {
    fieldName: 'customerRating',
    title: 'Рейтинг заказчика',
  },
  {
    fieldName: 'avgStaffQty',
    title: 'Численность персонала',
  },
  {
    fieldName: 'coefficientEquityAutonomy',
    title: 'Коэффициент автономии собственных средств',
    description: 'Формула: Капитал и резервы (код 1300) / Баланс (код 1600)',
  },
  {
    fieldName: 'coefficientEquityRatio',
    title: 'Коэффициент обеспеченности собственными оборотными средствами',
    description: 'Формула: Капитал и резервы (код 1300) - Внеоборотные активы (код 1100) / Оборотные активы (код 1200',
  },
  {
    fieldName: 'coefficientFinancialStability',
    title: 'Коэффициент финансовой устойчивости',
    description: 'Формула: Капитал и резервы (код 1300)  + Долгосрочные обязательства (код 1400)) / Баланс (код 1700)',
  },
  {
    fieldName: 'coefficientInterestCoverage',
    title: 'Коэффициент покрытия процентов',
    description: `Формула: "Прибыль" (код 2300) + модуль значения "Проценты к уплате" (код 2330) / модуль значения "Проценты к уплате" (код 2330); если значение 2330 = 0, то:
\tесли значение 2300 > 0, то коэффициент принимается равным 10;
\tесли значение 2300 < 0, то коэффициент принимается равным 0"`,
  },
  {
    fieldName: 'income',
    title: 'Выручка (код 2110)',
  },
  {
    fieldName: 'netProfit',
    title: 'Чистая прибыль (код 2400)',
  },
  {
    fieldName: 'incomeTax',
    title: 'Налог на прибыль (код 2410)',
  },
  {
    fieldName: 'altmanIndex',
    title: 'Индекс Альтмана',
    description: `Позволяет оценить степень риска банкротства предприятия, уровень финансовой устойчивости предприятия, 
      запас прочности у предприятия, деятельность менеджмента предприятия, провести сравнения с другими предприятиями вне 
      зависимости от их размера и отраслевой принадлежности`,
  },
  {
    fieldName: 'contractAmountAll',
    title: 'Сумма исполненных контрактов 44-ФЗ всего',
  },
  {
    fieldName: 'contractsCount',
    title: 'Число контрактов всего',
  },
  {
    fieldName: 'statusID',
    title: 'StatusID',
    isHidden: true,
  },
  {
    fieldName: 'procedureQty44',
    title: 'Число участий в конкурсах 44-ФЗ',
  },
  {
    fieldName: 'winQty44',
    title: 'Число побед в конкурсах 44-ФЗ',
  },
  {
    fieldName: 'procedureQty223',
    title: 'Число участий в конкурсах 223-ФЗ',
  },
  {
    fieldName: 'winQty223',
    title: 'Число побед в конкурсах 223-ФЗ',
  },
  {
    fieldName: 'yearRegistration',
    title: 'Год основания',
  },
  {
    fieldName: 'suspiciousFactsCount',
    title: 'Число существенных подозрительных фактов',
  },
  {
    fieldName: 'contractAmountBad',
    title: 'Сумма исполненных контрактов 44-ФЗ со штрафами',
  },
  {
    fieldName: 'contractsCountBad',
    title: 'Число контрактов с нарушениями',
  },
  {
    fieldName: 'badNewsCount',
    title: 'Число нарушений',
  },
  {
    fieldName: 'fsspAmountAll',
    title: 'Платежи по исполнительному производству',
  },
  {
    fieldName: 'fsspAmountLast2Y',
    title: 'Платежи по исполнительному производству (2018-2019)',
    description: 'Формула: Капитал и резервы (код 1300)  + Долгосрочные обязательства (код 1400)) / Баланс (код 1700)',
  },
  {
    fieldName: '',
    title: 'empty',
    isHidden: true,
  },
  {
    fieldName: 'bankGuaranteeAmount',
    title: 'Обеспечение банковской гарантией',
  },
  {
    fieldName: 'isForeign',
    title: '',
    isHidden: true,
  },
  {
    fieldName: 'isOffshore',
    title: '',
    isHidden: true,
  },
  {
    fieldName: 'isTax',
    title: '',
    isHidden: true,
  },
  {
    fieldName: 'isStop',
    title: '',
    isHidden: true,
  },
  {
    fieldName: 'isDrop',
    title: '',
    isHidden: true,
  },
  {
    fieldName: 'isBankrupt',
    title: '',
    isHidden: true,
  },
  {
    fieldName: 'isDisqualified',
    title: '',
    isHidden: true,
  },
  {
    fieldName: 'isKoAP',
    title: '',
    isHidden: true,
  },
  {
    fieldName: 'contractAmountMax',
    title: '',
    isHidden: true,
  },
  {
    fieldName: 'cashAccountAmount',
    title: 'Обеспечение деньгами',
    isHidden: true,
  },
  {
    fieldName: 'customerStatusID',
    title: '',
    isHidden: true,
  },
  {
    fieldName: 'contractCountTerminationBySupplier',
    title: 'Расторжение контрактов по решению заказчика',
  },
  {
    fieldName: 'contractCountTerminationByCustomer',
    title: 'Расторжение контрактов по инициативе заказчика',
  },
  {
    fieldName: 'contractCountTerminationByCourt',
    title: 'Расторжение контрактов по решению суда',
  },
];

export function getRowDescription(fieldName: string) {
  return fieldsDescriptions.find((v) => v.fieldName === fieldName);
}

export function isRowNotHidden(fieldName: string) {
  const find = fieldsDescriptions.find((v) => v.fieldName === fieldName);
  return !find?.isHidden;
}
