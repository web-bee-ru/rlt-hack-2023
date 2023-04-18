import { Company } from '@/src/types';
import InnAutocomplete from '@/src/components/UI/InnAutocomplete';
import { useEffect, useState } from 'react';
import useDebounce from '@/src/hooks/useDebounce';
import { fetchINNListByRegex } from '@/src/services/fetchers/data';

interface Props {
  label: string;
  onSelected: (value: Company) => void;
  selected?: Company[];
}

const InnAutocompleteWithLogic = ({ label, onSelected, selected }: Props) => {
  const [options, setOptions] = useState<Company[]>([]);
  const [autocompleteValue, setAutocompleteValue] = useState('');
  const debouncedAutocompleteValue = useDebounce(autocompleteValue);

  useEffect(() => {
    if (!debouncedAutocompleteValue) {
      setOptions([]);
      return;
    }

    fetchINNListByRegex(debouncedAutocompleteValue, selected ? selected.map(({ inn }) => inn) : []).then((data) =>
      setOptions(data as Company[]),
    );
  }, [selected, debouncedAutocompleteValue]);

  return (
    <InnAutocomplete
      label={label}
      options={options}
      disableClearable
      inputValue={autocompleteValue}
      getOptionLabel={(option: Company) => option.inn}
      isOptionEqualToValue={(option: Company, value: Company) => {
        return option.inn === value.inn;
      }}
      onInputChange={(_event, value, reason) => {
        setAutocompleteValue(reason !== 'reset' ? value : '');
      }}
      onChange={(_event, value: Company) => {
        onSelected(value);
        // @TODO: при выборе инн автокомплит варнит... гонки?
        setAutocompleteValue('');
        setOptions([]);
      }}
    />
  );
};

export default InnAutocompleteWithLogic;
