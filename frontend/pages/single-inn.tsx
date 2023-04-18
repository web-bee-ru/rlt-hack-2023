import { Box, styled, Typography } from '@mui/material';
import React, { useCallback, useEffect, useState } from 'react';
import { AxiosError } from 'axios';
import SingleInn from '@/src/components/SingleInn';
import { fetchINNFull } from '@/src/services/fetchers/data';
import { Company, InnFullDto } from '@/src/types';
import InnAutocompleteWithLogic from '@/src/components/UI/InnAutocompleteWithLogic';
import SearchIcon from '@mui/icons-material/Search';
import { useRouter } from 'next/router';

const Dolly = () => {
  const { inn } = useRouter().query;
  const [innInfo, setInnInfo] = useState<InnFullDto>();
  const [error, setError] = useState<AxiosError>();
  // @TODO
  // eslint-disable-next-line no-unused-vars, @typescript-eslint/no-unused-vars
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (!inn) return;

    fetchINNFull(inn.toString())
      .then((data) => setInnInfo(data))
      .catch((err) => setError(err));
  }, [inn]);

  const onInnSelected = useCallback((value: Company) => {
    if (!value.inn) return;
    fetchINNFull(value.inn)
      .then((data) => setInnInfo(data))
      .catch((err) => setError(err));
  }, []);

  if (error) return <Typography>{error.message}</Typography>;
  return (
    <Box display={'flex'} flexDirection={'column'} gap={2}>
      <Typography variant="h1">Кейс#1: проверка по ИНН</Typography>
      <InnAutocompleteWithLogic label={'Введите ИНН'} onSelected={onInnSelected} />
      {innInfo ? (
        <SingleInn FULL_INN={innInfo} />
      ) : (
        <ShouldSelectInn>
          <SearchIcon
            style={{
              verticalAlign: 'middle',
            }}
            color="primary"
            fontSize="large"
          />
          {'   Ничего не найдено, попробуйте изменить параметры поиска'}
        </ShouldSelectInn>
      )}
    </Box>
  );
};

const ShouldSelectInn = styled('div')(({ theme }) => ({
  ...theme.typography.button,
  backgroundColor: theme.palette.active.light,
  padding: theme.spacing(5),
}));

export default Dolly;
