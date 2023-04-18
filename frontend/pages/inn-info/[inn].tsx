import { Typography } from '@mui/material';
import { useEffect, useState } from 'react';
import { AxiosError } from 'axios';
import SingleInn from '@/src/components/SingleInn';
import { fetchINNFull } from '@/src/services/fetchers/data';
import { InnFullDto } from '@/src/types';
import { useRouter } from 'next/router';

const Dolly = () => {
  const { inn } = useRouter().query;
  const [innInfo, setInnInfo] = useState<InnFullDto>();
  const [error, setError] = useState<AxiosError>();

  useEffect(() => {
    if (!inn) return;

    fetchINNFull(inn.toString())
      .then((data) => setInnInfo(data))
      .catch((err) => setError(err));
  }, [inn]);

  if (error) {
    return <Typography>{error.message}</Typography>;
  }

  if (!innInfo) {
    // @TODO: добавить в проект лоадеры
    return <Typography>Загрузка...</Typography>;
  }

  return <SingleInn FULL_INN={innInfo} />;
};

export default Dolly;
