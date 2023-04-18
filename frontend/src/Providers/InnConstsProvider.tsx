import { createContext, useEffect, useState } from 'react';
import { PropChildren } from '@/src/types/UtilityProps';
import { fetchConst } from '@/src/services/fetchers/data';

export type ConstDto = {
  priceRanges: {
    value: {
      max?: number;
      min?: number;
    };
    label: string;
  }[];
  ratingRanges: {
    value: {
      max?: number;
      min?: number;
    };
    label: string;
  }[];
  scopes: {
    value: string;
    label: string;
  }[];
};

export type Scope = { value: string; label: string };

export const InnConstsContext = createContext({} as ConstDto);

const InnConstsProvider = ({ children }: PropChildren) => {
  const [priceRanges, setPriceRanges] = useState<ConstDto['priceRanges']>([]);
  const [scopes, setScopes] = useState<ConstDto['scopes']>([]);
  const [ratingRanges, setRatingRanges] = useState<ConstDto['ratingRanges']>([]);

  useEffect(() => {
    fetchConst().then((consts) => {
      setPriceRanges(consts.priceRanges);
      setScopes(consts.scopes);
      setRatingRanges(consts.ratingRanges);
    });
  }, []);

  return (
    <InnConstsContext.Provider value={{ priceRanges, scopes, ratingRanges }}>{children}</InnConstsContext.Provider>
  );
};

export default InnConstsProvider;
