import { createContext, Dispatch, SetStateAction, useState } from 'react';
import { PropChildren } from '@/src/types/UtilityProps';
import { Company } from '@/src/types';

export interface InnDataProps {
  data: Company[];
  setData: Dispatch<SetStateAction<Company[]>>;
}

export const InnDataContext = createContext({} as InnDataProps);

const InnDataProvider = ({ children }: PropChildren) => {
  const [data, setData] = useState<Company[]>([]);

  return <InnDataContext.Provider value={{ data, setData: setData as never }}>{children}</InnDataContext.Provider>;
};

export default InnDataProvider;
