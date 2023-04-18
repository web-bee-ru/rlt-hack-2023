import { Box, Typography } from '@mui/material';
import { InnDataContext } from '@/src/Providers/InnDataProvider';
import { useCallback, useContext } from 'react';
import MarketTable from '@/src/components/UI/MarketTable';
import { Company } from '@/src/types';
import InnAutocompleteWithLogic from '@/src/components/UI/InnAutocompleteWithLogic';

const Dolly = () => {
  const { data, setData } = useContext(InnDataContext);
  // eslint-disable-next-line no-unused-vars, @typescript-eslint/no-unused-vars

  const deleteSelectedInn = useCallback(
    (inn: Company) => {
      if (confirm('Вы уверены?')) {
        setData((data) => {
          return data.filter((it) => it !== inn);
        });
      }
    },
    [setData],
  );

  const onInnSelected = useCallback(
    (value: Company) => {
      if (!value.inn) return;
      setData((prev) => {
        return [...prev, value];
      });
    },
    [setData],
  );

  return (
    <Box display={'flex'} flexDirection={'column'} gap={2}>
      <Typography variant="h1">Кейс#3: сравнение по ИНН</Typography>
      <InnAutocompleteWithLogic label={'Введите ИНН'} selected={data} onSelected={onInnSelected} />
      <MarketTable selected={data} onDeleteClick={deleteSelectedInn} />
    </Box>
  );
};

export default Dolly;
