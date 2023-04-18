import { Box, Card, CardContent, Chip, styled, Typography } from '@mui/material';
import React, { useCallback, useContext, useEffect, useMemo, useState } from 'react';
import TabledList from '@/src/components/UI/TabledList';
import { Company, InnFullDto } from '@/src/types';
import { ConstDto, InnConstsContext } from '@/src/Providers/InnConstsProvider';
import { fetchCompanies } from '@/src/services/fetchers/data';
import { isAxiosError } from '@/src/lifecycle/services';
import { Chart as ChartJS, ChartData, ChartOptions, registerables } from 'chart.js';
import { AxiosError } from 'axios';
import { scale } from 'chroma-js';
import theme from '@/src/const/defaultTheme';
import { Line } from 'react-chartjs-2';

ChartJS.register(...registerables);
if (typeof window !== 'undefined') {
  import('chartjs-plugin-zoom').then((module) => ChartJS.register(module.default));
}

function getRatingLabel(rating: number, ratingRanges: ConstDto['ratingRanges']) {
  if (!rating || rating < 0 || rating > 1) return;

  return ratingRanges.find((item) => {
    if (!item.value.max) return true;

    return rating <= item.value.max;
  })?.label;
}

function getRatingVariant(rating: number) {
  if (rating < 0.33) {
    return 'error';
  } else if (rating < 0.55) {
    return 'warning';
  } else {
    return 'success';
  }
}

const barOptions: ChartOptions<'bar'> = {
  responsive: true,
  elements: {
    point: {
      backgroundColor: 'transparent',
    },
  },
  plugins: {
    legend: {
      display: false,
    },
    title: {
      display: true,
      text: 'ContractAmountAll',
      position: 'left',
      font: {
        size: 24,
      },
      color: theme.palette.active.light,
    },
    subtitle: {
      display: true,
      text: 'ContractAmountBad',
      position: 'bottom',
      font: {
        size: 24,
      },
      color: theme.palette.active.light,
    },
    zoom: {
      limits: {
        x: {
          minRange: 1,
        },
      },
      pan: {
        enabled: true,
        modifierKey: 'shift',
        mode: 'x',
      },
      zoom: {
        wheel: {
          modifierKey: 'alt',
          enabled: true,
        },
        pinch: {
          enabled: true,
        },
        drag: {
          enabled: true,
        },
        mode: 'x',
      },
    },
  },
  hover: {
    mode: 'index',
  },
  animation: {
    duration: 0,
  },
  interaction: {
    mode: 'index',
  },
  scales: {
    x: {
      type: 'logarithmic',
      border: {
        display: false,
      },
      grid: {
        display: false,
      },
    },
    y: {
      type: 'logarithmic',
      border: {
        display: false,
      },
      grid: {
        display: false,
      },
    },
  },
};

const scatterOptions: ChartOptions<'scatter'> = {
  responsive: true,
  elements: {
    point: {
      backgroundColor: 'transparent',
    },
  },
  plugins: {
    legend: {
      display: false,
    },
    zoom: {
      limits: {
        x: {
          minRange: 1,
        },
      },
      pan: {
        enabled: true,
        modifierKey: 'shift',
        mode: 'x',
      },
      zoom: {
        wheel: {
          modifierKey: 'alt',
          enabled: true,
        },
        pinch: {
          enabled: true,
        },
        drag: {
          enabled: true,
        },
        mode: 'x',
      },
    },
  },
  hover: {
    mode: 'index',
  },
  animation: {
    duration: 0,
  },
  interaction: {
    mode: 'index',
  },
  scales: {
    x: {
      type: 'logarithmic',
      border: {
        display: false,
      },
      grid: {
        display: false,
      },
    },
    y: {
      type: 'logarithmic',
      border: {
        display: false,
      },
      grid: {
        display: false,
      },
    },
  },
};

const altmanScatterOptions: ChartOptions<'scatter'> = {
  ...scatterOptions,

  plugins: {
    ...scatterOptions.plugins,
    title: {
      display: true,
      text: 'ContractAmountAll',
      position: 'left',
      font: {
        size: 24,
      },
      color: theme.palette.active.light,
    },
    subtitle: {
      display: true,
      text: 'AltmanIndex',
      position: 'bottom',
      font: {
        size: 24,
      },
      color: theme.palette.active.light,
    },
  },
};

const badContractScatterOptions: ChartOptions<'scatter'> = {
  ...scatterOptions,
  plugins: {
    ...scatterOptions.plugins,
    title: {
      display: true,
      text: 'ContractAmountAll',
      position: 'left',
      font: {
        size: 24,
      },
      color: theme.palette.active.light,
    },
    subtitle: {
      display: true,
      text: 'ContractAmountBad',
      position: 'bottom',
      font: {
        size: 24,
      },
      color: theme.palette.active.light,
    },
  },
};

// eslint-disable-next-line no-unused-vars, @typescript-eslint/no-unused-vars
const commonOptions: ChartOptions<'line'> = {
  responsive: true,
  plugins: {
    legend: {
      position: 'top' as const,
      labels: {
        padding: 20,
        boxHeight: 2,
      },
    },
    zoom: {
      limits: {
        x: {
          minRange: 1,
        },
      },
      pan: {
        enabled: true,
        modifierKey: 'shift',
        mode: 'x',
      },
      zoom: {
        wheel: {
          modifierKey: 'alt',
          enabled: true,
        },
        pinch: {
          enabled: true,
        },
        drag: {
          enabled: true,
        },
        mode: 'x',
      },
    },
  },
  scales: {
    x: {
      border: {
        display: false,
      },
      grid: {
        display: false,
      },
    },
    y: {
      border: {
        display: false,
      },
      grid: {
        display: false,
      },
    },
  },
};

const statsSupplier: { supplierRating: number; count: number }[] = [
  { supplierRating: 0, count: 0 },
  { supplierRating: 0.11430000000000001, count: 0.0002450379808870375 },
  { supplierRating: 0.1595, count: 0.0029304542204041627 },
  { supplierRating: 0.20500000000000002, count: 0.05307322635008426 },
  { supplierRating: 0.2505, count: 0.2374368027044192 },
  { supplierRating: 0.29600000000000004, count: 0.0341052863193795 },
  { supplierRating: 0.3415, count: 0.04361676059789267 },
  { supplierRating: 0.387, count: 0.05523856197710645 },
  { supplierRating: 0.4325, count: 0.05425340927843816 },
  { supplierRating: 0.47750000000000004, count: 0.05129795118243328 },
  { supplierRating: 0.523, count: 0.05024778840720311 },
  { supplierRating: 0.5685, count: 0.049472668263580856 },
  { supplierRating: 0.614, count: 0.04963769384254559 },
  { supplierRating: 0.6595, count: 0.05381334106786552 },
  { supplierRating: 0.7045, count: 0.058374047977436505 },
  { supplierRating: 0.75, count: 0.06154453940360756 },
  { supplierRating: 0.7955, count: 0.06041936500157524 },
  { supplierRating: 0.841, count: 0.05086288374698078 },
  { supplierRating: 0.8865000000000001, count: 0.027684291065115094 },
  { supplierRating: 0.9319999999999999, count: 0.005390835579514825 },
  { supplierRating: 0.978, count: 0.0003550550335301972 },
  { supplierRating: 1, count: 0 },
];

const statsCustomer: { customerRating: number; count: number }[] = [
  { customerRating: 0, count: 0 },
  { customerRating: 0.0252545, count: 1.694915254237288e-5 },
  { customerRating: 0.0751, count: 0.0 },
  { customerRating: 0.125, count: 0.012525423728813559 },
  { customerRating: 0.175, count: 0.07110169491525424 },
  { customerRating: 0.225, count: 0.08123728813559322 },
  { customerRating: 0.275, count: 0.07596610169491526 },
  { customerRating: 0.32499999999999996, count: 0.06561016949152543 },
  { customerRating: 0.375, count: 0.06879661016949153 },
  { customerRating: 0.42500000000000004, count: 0.05916949152542373 },
  { customerRating: 0.475, count: 0.06105084745762712 },
  { customerRating: 0.525, count: 0.06301694915254237 },
  { customerRating: 0.575, count: 0.05759322033898305 },
  { customerRating: 0.625, count: 0.06071186440677966 },
  { customerRating: 0.6745, count: 0.06074576271186441 },
  { customerRating: 0.724, count: 0.08183050847457628 },
  { customerRating: 0.774, count: 0.07038983050847458 },
  { customerRating: 0.8240000000000001, count: 0.09164406779661018 },
  { customerRating: 0.874, count: 0.016745762711864405 },
  { customerRating: 0.9239999999999999, count: 0.001694915254237288 },
  { customerRating: 0.9744999999999999, count: 0.00015254237288135592 },
  { customerRating: 1, count: 0 },
];

const getColor = scale(['navy', 'yellow']).mode('lch');

const EMPTY = '-';
const EMPTY_STRING = 'Нет данных';

interface Props {
  FULL_INN: InnFullDto;
}

const SingleInn = ({ FULL_INN }: Props) => {
  console.log(FULL_INN);
  const { ratingRanges } = useContext(InnConstsContext);

  const [companies, setCompanies] = useState<Company[]>();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<AxiosError>();

  const fetchData = useCallback(async () => {
    try {
      setIsLoading(true);
      const data = await fetchCompanies(10000);

      setCompanies(data);
    } catch (e) {
      if (isAxiosError(e)) setError(e);
    } finally {
      setIsLoading(false);
    }
  }, []);

  const createDatasets = useCallback((companyStats: Company[], isSupplierRating: boolean, company: Company) => {
    return [
      {
        label: 'Scatter Dataset',
        data: companyStats,
        parsing: {
          xAxisKey: 'contractAmountAll',
          yAxisKey: 'contractAmountBad',
        },
        pointBackgroundColor: companyStats.map((stats) =>
          getColor(isSupplierRating ? stats.supplierRating : stats.customerRating),
        ),
        order: 1,
      },
      {
        label: 'Scatter Dataset',
        data: [companyStats.find((item) => item.contractAmountBad > 1 && item.contractAmountAll > 1)],
        parsing: {
          xAxisKey: 'contractAmountAll',
          yAxisKey: 'contractAmountBad',
        },
        pointBackgroundColor: 'aqua',
        pointStyle: 'rectRot',
        pointRadius: 8,
        hoverRadius: 8,
        order: 0,
      },
    ];
  }, []);

  const createDatasetsLineCustomer = useCallback(() => {
    let wasColored = false;

    return [
      {
        label: 'bar',
        data: statsCustomer,
        parsing: {
          xAxisKey: 'customerRating',
          yAxisKey: 'count',
        },
        type: 'bar',
        backgroundColor: statsCustomer.map(({ customerRating }) => {
          if (!FULL_INN.customerRating) {
            return theme.palette.primary.main;
          }
          if (!wasColored && customerRating > FULL_INN.customerRating) {
            wasColored = true;
            return theme.palette.active.main;
          }
          return theme.palette.active.light;
        }),
      },
    ];
  }, [FULL_INN]);
  const createDatasetsLineSupplier = useCallback(() => {
    let wasColored = false;

    return [
      {
        label: 'bar',
        data: statsSupplier,
        parsing: {
          xAxisKey: 'supplierRating',
          yAxisKey: 'count',
        },
        type: 'bar',
        backgroundColor: statsSupplier.map(({ supplierRating, idx }) => {
          if (!wasColored && supplierRating > FULL_INN.supplierRating) {
            wasColored = true;
            return theme.palette.active.main;
          }
          return theme.palette.active.light;
        }),
      },
    ];
  }, [FULL_INN]);

  const createDatasetsAltman = useCallback(
    (companyStats: Company[], isSupplierRating: boolean, company: Company): ChartData<any, any, any>['datasets'] => {
      return [
        {
          data: companyStats,
          parsing: {
            xAxisKey: 'altmanIndex',
            yAxisKey: 'contractAmountAll',
          },
          pointBackgroundColor: companyStats.map((stats) =>
            getColor(isSupplierRating ? stats.supplierRating : stats.customerRating),
          ),
          order: 1,
        },
        {
          data: [companyStats.find((item) => item.altmanIndex > 1 && item.contractAmountAll > 1)],
          parsing: {
            xAxisKey: 'altmanIndex',
            yAxisKey: 'contractAmountAll',
          },
          pointBackgroundColor: 'aqua',
          pointStyle: 'rectRot',
          pointRadius: 8,
          hoverRadius: 8,
          order: 0,
        },
      ];
    },
    [],
  );

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const companiesDataAltmanSupplier = useMemo<ChartData<any, any, any>>(() => {
    const companyStats: Company[] = companies ?? [];

    return {
      datasets: createDatasetsAltman(companyStats, true, FULL_INN as Company),
    };
  }, [companies, createDatasetsAltman, FULL_INN]);

  const companiesDataAltmanCustomer = useMemo<ChartData<any, any, any>>(() => {
    const companyStats: Company[] = companies ?? [];

    return {
      datasets: createDatasetsAltman(companyStats, false, FULL_INN as Company),
    };
  }, [companies, createDatasetsAltman, FULL_INN]);

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const companiesDataSupplier = useMemo<ChartData<any, any, any>>(() => {
    const companyStats = companies ?? [];

    return {
      datasets: createDatasets(companyStats, true, FULL_INN as Company),
    };
  }, [companies, createDatasets, FULL_INN]);

  const lineDatasetsSupplier = useMemo<ChartData<any, any, any>>(() => {
    return {
      labels: statsSupplier.map(({ supplierRating }) => supplierRating.toFixed(2)),
      datasets: createDatasetsLineSupplier(),
    };
  }, [createDatasetsLineSupplier]);

  const lineDatasetsCustomer = useMemo<ChartData<any, any, any>>(() => {
    return {
      labels: statsCustomer.map(({ customerRating }) => customerRating.toFixed(2)),
      datasets: createDatasetsLineCustomer(),
    };
  }, [createDatasetsLineCustomer]); // eslint-disable-next-line @typescript-eslint/no-explicit-any

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const companiesDataCustomer = useMemo<ChartData<any, any, any>>(() => {
    const companyStats = companies ?? [];

    return {
      datasets: createDatasets(companyStats, false, FULL_INN as Company),
    };
  }, [companies, createDatasets, FULL_INN]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  if (error) {
    return <Typography>{error.message}</Typography>;
  }
  return (
    <StyledBox display={'flex'} flexDirection={'column'} gap={2}>
      <Box sx={{ minWidth: 275 }} display="flex" gap={2}>
        <Card sx={{ flex: 1 }} variant="outlined">
          <CardContent>
            <Typography variant="h3" component="div">
              Общая информация
            </Typography>
            <TabledList
              rows={[
                ['ИНН', FULL_INN.inn],
                // ['Название', FULL_INN.companyName ?? EMPTY], // @TODO:DB coming soon...
                // ['Адрес', FULL_INN.addressRegister ?? EMPTY], // @TODO:DB coming soon...
                ['Дата регистрации', FULL_INN.yearRegistration ?? EMPTY],
                ['Основной вид деятельности', FULL_INN.okvedBasicCode ?? EMPTY], // egrul_info / okved_basic_code
                // ['Руководитель', FULL_INN.leader ?? EMPTY], // @TODO:DB рома - уточнить
                ['Должность', 'NULL' === FULL_INN.entityWoAttorneyPosition ? EMPTY : FULL_INN.entityWoAttorneyPosition],
                ['Численность персонала', FULL_INN.avgStaffQty ? `${FULL_INN.avgStaffQty} чел.` : EMPTY], // TrainingData / avg_staff_qty
                ['Уставный капитал', FULL_INN.capitalSize ?? EMPTY], // egrul_info / capital_size
              ]}
            />
          </CardContent>
        </Card>

        <Card sx={{ flex: 1 }} variant="outlined">
          <CardContent>
            <Typography variant="h3" component="div">
              Существенные факторы
            </Typography>
            {FULL_INN.facts && FULL_INN.facts.length ? (
              <TabledList
                // @TODO: colorize (red/green)
                // из SuspiciousFacts_Inn, в зависимости от тональности красим в зеленый или красный цвет
                rows={FULL_INN.facts ? FULL_INN.facts?.map((value) => [value]) : [[EMPTY_STRING]]}
              />
            ) : (
              <TabledList variant="good" rows={[['Не выявлены']]} />
            )}
          </CardContent>
        </Card>
      </Box>

      {/* @NOTE: Отложено на неопределенный срок по согласованию с Идеологом */}
      {/*<Box sx={{ minWidth: 275 }} display="flex" gap={2}>*/}
      {/*  {FULL_INN.finDurability ? (*/}
      {/*    <Card variant="outlined" sx={{ flex: 1 }}>*/}
      {/*      <CardContent>*/}
      {/*        <Typography variant="h4" component="div">*/}
      {/*          Финансовая устойчивость*/}
      {/*        </Typography>*/}
      {/*        <Typography mt={3} variant="h4" component="div">*/}
      {/*          Негативные*/}
      {/*        </Typography>*/}
      {/*        <TabledList*/}
      {/*          variant="bad"*/}
      {/*          // @ts-expect-error*/}
      {/*          rows={FULL_INN.finDurability.filter(({ type }) => type < 0.5).map(({ value }) => [value])}*/}
      {/*        />*/}
      {/*        <Typography mt={3} variant="h4" component="div">*/}
      {/*          Позитивные*/}
      {/*        </Typography>*/}
      {/*        <TabledList*/}
      {/*          variant="good"*/}
      {/*          // @ts-expect-error*/}
      {/*          rows={FULL_INN.finDurability.filter(({ type }) => type >= 0.5).map(({ value }) => [value])}*/}
      {/*        />*/}
      {/*      </CardContent>*/}
      {/*    </Card>*/}
      {/*  ) : null}*/}

      {/*  {FULL_INN.fsspAmountAll && FULL_INN.fsspAmountLast2Y ? (*/}
      {/*    <Card variant="outlined" sx={{ flex: 1 }}>*/}
      {/*      <CardContent>*/}
      {/*        <Typography variant="h4" component="div">*/}
      {/*          Исполнительные производства*/}
      {/*        </Typography>*/}
      {/*        <TabledList*/}
      {/*          variant="bad"*/}
      {/*          rows={[*/}
      {/*            [*/}
      {/*              // TrainingData / fssp_AmountAll  ... TrainingData / fssp_AmountLast2Y*/}
      {/*              `Сумма взысканий составляет ${FULL_INN.fsspAmountAll} руб., их них за последние два года ${FULL_INN.fsspAmountLast2Y} руб.`,*/}
      {/*            ],*/}
      {/*          ]}*/}
      {/*        />*/}
      {/*      </CardContent>*/}
      {/*    </Card>*/}
      {/*  ) : null}*/}
      {/*</Box>*/}
      <Card variant="outlined">
        <CardContent sx={{ display: 'flex', justifyContent: 'space-between' }}>
          <Box>
            <Typography mb={1} variant="h4" component="div">
              Как исполнитель
              {(() => {
                if (!FULL_INN.supplierRating) return null;

                const reliability = getRatingLabel(FULL_INN.supplierRating, ratingRanges);
                const variant = getRatingVariant(FULL_INN.supplierRating);

                return <Chip style={{ marginLeft: 20 }} color={variant} label={reliability} />;
              })()}
            </Typography>
            <Box>
              <TabledList
                rows={[
                  [
                    `Рейтинг надежности: ${~~(FULL_INN?.supplierRating * 100) / 100} (${FULL_INN.supplierRank} из ${
                      FULL_INN.supplierTotal
                    })`,
                  ],
                ]}
              />
              <Box width={800} display="flex" flexDirection="column" gap={1}>
                <Line
                  style={{ backgroundColor: theme.palette.common.black, borderRadius: 12 }}
                  data={lineDatasetsSupplier}
                  options={{ plugins: { legend: { display: false } } }}
                />
              </Box>
            </Box>
          </Box>
          <Box display="flex" pl={2} flexDirection="column" gap={2}>
            <Box>
              <Typography mb={1} variant="h4">
                Опыт участия в закупочных процедурах
              </Typography>
              <TabledList
                rows={[
                  // Выиграл TrainingData / win_qty44 из TrainingData / procedure_qty44
                  [`Выиграл ${FULL_INN.winQty44} из ${FULL_INN.procedureQty44}`],
                  // TrainingData / ContractAmountAll
                  [
                    `Выполнено работ, оказано услуг, поставлено товаров на сумму ${
                      FULL_INN.contractAmountAll ?? 0
                    } руб.`,
                  ],
                ]}
              />
            </Box>
            <Box>
              <Typography mb={1} variant="h4">
                {/* По TrainingData / ContractsCount заключенным государственным контрактам: */}
                По {FULL_INN.contractsCount} заключенным государственным контрактам:
              </Typography>
              <TabledList
                variant="bad"
                rows={[
                  // фактов ненадлежащего исполнения: TrainingData / BadNewsCount
                  // расторжений по инициативе заказчика: TrainingData / ContractCountTerminationByCustomer
                  // расторжений по инициативе исполнителя: TrainingData / ContractCountTerminationBySupplier
                  ['Фактов ненадлежащего исполнения', `${FULL_INN.badNewsCount ?? 0}`],
                  ['Расторжений по инициативе заказчика', `${FULL_INN.contractCountTerminationByCustomer ?? 0}`],
                  ['Расторжений по инициативе исполнителя', `${FULL_INN.contractCountTerminationBySupplier ?? 0}`],
                ]}
              />
              <TabledList
                variant="good"
                rows={[
                  // расторжений по инициативе суда: TrainingData / ContractCountTerminationByCourt
                  ['Расторжений по инициативе суда', `${FULL_INN.contractCountTerminationByCourt ?? 0}`],
                ]}
              />
            </Box>
          </Box>
        </CardContent>
      </Card>
      <Card variant="outlined">
        <CardContent sx={{ display: 'flex', justifyContent: 'space-between' }}>
          <Box>
            <Typography mb={1} variant="h4" component="div">
              Как заказчик
              {(() => {
                const reliability = FULL_INN.customerRating
                  ? getRatingLabel(FULL_INN.customerRating, ratingRanges)
                  : EMPTY;
                const variant = FULL_INN.customerRating ? getRatingVariant(FULL_INN.customerRating) : 'primary';
                if (reliability && reliability !== EMPTY) {
                  return <Chip style={{ marginLeft: 20 }} color={variant} label={reliability} />;
                } else {
                  return <Chip style={{ marginLeft: 20 }} color="default" label="Недостаточно данных" />;
                }
              })()}
            </Typography>
            <Box>
              <TabledList
                rows={[
                  [
                    `Рейтинг надежности: ${~~(FULL_INN?.customerRating * 100) / 100} (${FULL_INN.customerRank} из ${
                      FULL_INN.customerTotal
                    })`,
                  ],
                ]}
              />
              <Box width={800} display="flex" flexDirection="column" gap={1}>
                <Line
                  style={{ backgroundColor: theme.palette.common.black, borderRadius: 12 }}
                  data={lineDatasetsCustomer}
                  options={{ plugins: { legend: { display: false } } }}
                />
              </Box>
            </Box>
          </Box>
          <Box pl={2}>
            <Typography mb={1} variant="h4">
              Опыт организации закупочных процедур
            </Typography>
            <TabledList
              rows={[
                [
                  // Опубликовал [TrainingDatasetCustomer]/[ProceduresCount] закупок на сумму  [TrainingDatasetCustomer]/[customer_max_price] руб
                  `Опубликовал ${FULL_INN.producerCount ?? EMPTY} закупок на сумму ${
                    FULL_INN.customerMaxPrice ?? EMPTY
                  } руб.`,
                ],
                // Получено жалоб:[TrainingDatasetCustomer]/[ComplaintsCount]
                [`Получено жалоб: ${FULL_INN.complaintsCount ?? 0}`],
                // Заключил[TrainingDatasetCustomer]/[[ContractsCount]]
                [`Заключил: ${FULL_INN.contractsCountCustomer ?? 0}`],
                // контрактов на сумму [TrainingDatasetCustomer]/[ContractAmountAll] руб
                [`Контрактов на сумму: ${FULL_INN.contractAmountAllCustomer ?? 0}`],
                [
                  `Принял выполненных работ, оказанных услуг, поставленных товаров на сумму ${
                    FULL_INN.contractorAmountAll ?? EMPTY
                  } руб.`,
                ],
              ]}
            />
          </Box>
          <Box>
            <Typography mb={1} variant="h4">
              {/* По TrainingData / ContractsCount заключенным государственным контрактам: */}
              По заключенным государственным контрактам:
            </Typography>
            <TabledList
              variant="bad"
              rows={[
                // фактов ненадлежащего исполнения: TrainingData / BadNewsCount
                // фактов ненадлежащего исполнения: TrainingData / BadNewsCount
                // расторжений по инициативе заказчика: TrainingData / ContractCountTerminationByCustomer
                // расторжений по инициативе исполнителя: TrainingData / ContractCountTerminationBySupplier
                ['Фактов ненадлежащего исполнения', `${FULL_INN.badNewsCountCustomer ?? 0}`],
                ['Расторжений по инициативе заказчика', `${FULL_INN.contractCountTerminationByCustomerCustomer ?? 0}`],
                [
                  'Расторжений по инициативе исполнителя',
                  `${FULL_INN.contractCountTerminationBySupplierCustomer ?? 0}`,
                ],
              ]}
            />
            <TabledList
              variant="good"
              rows={[
                // расторжений по инициативе суда: TrainingData / ContractCountTerminationByCourt
                ['Расторжений по инициативе суда', `${FULL_INN.contractCountTerminationByCourtCustomer ?? 0}`],
              ]}
            />
          </Box>
        </CardContent>
      </Card>
    </StyledBox>
  );
};

const StyledBox = styled(Box)`
  .MuiTable-root {
    min-width: 0px;
  }
`;

export default SingleInn;
