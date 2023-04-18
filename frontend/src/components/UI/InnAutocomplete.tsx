import { Autocomplete, AutocompleteProps, styled, TextField } from '@mui/material';

interface InnAutocompleteProps extends Omit<AutocompleteProps<any, any, any, any>, 'renderInput'> {
  label: string;
}

const StyledAutoComplete = styled(Autocomplete)`
  & .MuiInputBase-root {
    min-width: 200px;
    max-width: 500px;
  }
` as typeof Autocomplete;

const InnAutocomplete = (props: InnAutocompleteProps) => {
  return (
    <StyledAutoComplete
      placeholder={'Введите ИНН'}
      componentsProps={{
        popper: {
          sx: {
            '.MuiAutocomplete-listbox': {
              padding: 0,
            },
          },
        },
      }}
      renderInput={(params) => <TextField {...params} label={props.label} />}
      {...props}
    />
  );
};

export default InnAutocomplete;
