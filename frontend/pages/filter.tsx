import {
  Box,
  Button,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  SelectChangeEvent,
  styled,
  Typography,
} from '@mui/material';
import React, { Dispatch, SetStateAction, useCallback, useContext, useEffect, useId, useState } from 'react';
import { AxiosError } from 'axios';
import { isAxiosError } from '@/src/lifecycle/services';
import { ConstDto, InnConstsContext } from '@/src/Providers/InnConstsProvider';
import { fetchScopes, fetchTop } from '@/src/services/fetchers/data';
import InnAutocomplete from '@/src/components/UI/InnAutocomplete';
import useDebounce from '@/src/hooks/useDebounce';
import MarketTable from '@/src/components/UI/MarketTable';
import { Company } from '@/src/types';

const ContentWrapper = styled(Box)`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing(4)};
  flex: 1;
`;

const MultiselectBar = styled(Box)`
  display: flex;
  gap: ${({ theme }) => theme.spacing(4)};
  height: 40px;
`;

const StyledSelect = styled(Select)`
  display: flex;
  flex-grow: 1;
  max-width: 350px;
` as never as typeof Select;

const Filter = () => {
  const ratingLabelId = useId();
  const priceLabelId = useId();
  const [data, setData] = useState<Company[]>([]);
  const { priceRanges, ratingRanges } = useContext(InnConstsContext);
  const [priceRangesValues, setPriceRangesValues] = useState<string[]>([]);
  const [ratingRangesValues, setRatingRangesValues] = useState<string[]>([]);
  const [scopesValues, setScopesValues] = useState<ConstDto['scopes']>([]);
  const [selectedScopesValues, setSelectedScopesValues] = useState<ConstDto['scopes']>([]);
  const [scopeInputValue, setScopeInputValue] = useState('');
  const debouncedScopeInputValue = useDebounce(scopeInputValue);
  const [error, setError] = useState<AxiosError>();

  const handleChange = (event: SelectChangeEvent<string[]>, setter: Dispatch<SetStateAction<string[]>>) => {
    const {
      target: { value },
    } = event;
    setter(typeof value === 'string' ? value.split(',') : value);
  };

  const fetchData = useCallback(async () => {
    try {
      const data = await fetchTop({
        scopes: selectedScopesValues.map(({ value }) => value),
        priceRanges: priceRanges.filter((item) => priceRangesValues.includes(item.label)).map(({ value }) => value),
        ratingRanges: ratingRanges.filter((item) => ratingRangesValues.includes(item.label)).map(({ value }) => value),
      });

      setData(data);
    } catch (e) {
      if (isAxiosError(e)) setError(e);
    }
  }, [priceRanges, priceRangesValues, ratingRanges, ratingRangesValues, selectedScopesValues]);

  useEffect(() => {
    (async () => {
      try {
        const data = await fetchTop();

        setData(data);
      } catch (e) {
        if (isAxiosError(e)) setError(e);
      }
    })();
  }, []);

  useEffect(() => {
    (async () => {
      if (!debouncedScopeInputValue) return;

      try {
        const data = await fetchScopes(debouncedScopeInputValue);

        setScopesValues(data);
      } catch (e) {
        if (isAxiosError(e)) setError(e);
      }
    })();
  }, [debouncedScopeInputValue]);

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

  if (error) {
    return <Typography>{error.message}</Typography>;
  }

  return (
    <ContentWrapper>
      <Typography variant="h1">Кейс#2: подбор поставщиков для определения НМЦ</Typography>
      <MultiselectBar>
        <InnAutocomplete
          options={scopesValues}
          getOptionLabel={(option) => option.value + ': ' + option.label}
          multiple
          fullWidth
          onInputChange={(_event, value) => {
            setScopeInputValue(value);
            if (!value) {
              setScopesValues(selectedScopesValues);
            }
          }}
          limitTags={2}
          renderTags={(values: ConstDto['scopes']) => (
            <Typography variant="subtitle2" pl={1} noWrap>
              {values.length}: {values.map((item) => item.label).join(', ')}
            </Typography>
          )}
          onChange={(_event, value) => {
            setSelectedScopesValues(value);
            setScopesValues(value);
          }}
          label={'ОКПД2'}
          size={'small'}
        />
        <FormControl fullWidth size="small">
          <InputLabel id={ratingLabelId}>Надежность</InputLabel>
          <StyledSelect
            label={'Надежность'}
            labelId={ratingLabelId}
            value={ratingRangesValues as any}
            onChange={(event) => handleChange(event, setRatingRangesValues)}
            multiple
            MenuProps={{
              PaperProps: {
                sx: {
                  boxShadow: (theme) => theme.shadows[1],
                  borderRadius: '12px',
                  ul: {
                    padding: 0,
                  },
                },
              },
            }}
          >
            {ratingRanges.map((menuItem) => (
              <MenuItem key={menuItem.label} value={menuItem.label}>
                {menuItem.label}
              </MenuItem>
            ))}
          </StyledSelect>
        </FormControl>
        <FormControl fullWidth size="small">
          <InputLabel id={priceLabelId}>Ориентировочная цена</InputLabel>
          <StyledSelect
            label={'Ориентировочная цена'}
            value={priceRangesValues as any}
            labelId={priceLabelId}
            onChange={(event) => handleChange(event, setPriceRangesValues)}
            multiple
            MenuProps={{
              PaperProps: {
                sx: {
                  boxShadow: (theme) => theme.shadows[1],
                  borderRadius: '12px',
                  ul: {
                    padding: 0,
                  },
                },
              },
            }}
          >
            {priceRanges.map((menuItem) => (
              <MenuItem key={menuItem.label} value={menuItem.label}>
                {menuItem.label}
              </MenuItem>
            ))}
          </StyledSelect>
        </FormControl>
        <Button variant="contained" onClick={fetchData}>
          Ok
        </Button>
      </MultiselectBar>
      <MarketTable selected={data} />
    </ContentWrapper>
  );
};

export default Filter;
