import { axios } from '@/src/lifecycle/services';
import { ConstDto, Scope } from '@/src/Providers/InnConstsProvider';
import { Company, InnFullDto } from '@/src/types';

export async function fetchINNListByRegex(regex: string, usedInns: string[]): Promise<Company[]> {
  return (await axios.get('/searchByInn', { params: { searchInn: regex, usedInns } })).data;
}

export async function fetchINNFull(inn: string): Promise<InnFullDto> {
  return (await axios.get('/getByInn', { params: { searchInn: inn } })).data;
}

export async function fetchConst(): Promise<ConstDto> {
  return (await axios.get('/const')).data;
}

export async function fetchTop(params?: { [K in keyof ConstDto]?: ConstDto[K][number]['value'][] }) {
  return (await axios.get('/getTop', { params })).data;
}

export async function fetchScopes(scope?: string): Promise<Scope[]> {
  return (await axios.get('/getScopes', { params: { scope } })).data;
}

export async function fetchCompanies(limit?: number): Promise<Company[]> {
  return (await axios.get('/getCompanies', { params: { maxItems: limit } })).data;
}
