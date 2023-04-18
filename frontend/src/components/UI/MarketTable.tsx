import { FC, ReactElement, useCallback, useMemo } from 'react';
import {
  Box,
  Button,
  IconButton,
  Paper,
  styled,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import { fieldsDescriptions, SingleField } from '@/src/const/fieldsDescription';
import Tooltip from '@mui/material/Tooltip';
import HelpIconOutline from '@/src/assets/icons/HelpOutlineIcon';
import NextLink from 'next/link';
import SearchIcon from '@mui/icons-material/Search';
import { Company } from '@/src/types';

interface MarketTableProps {
  selected: Company[];
  onDeleteClick?: (item: Company) => void;
  // setData?: Dispatch<SetStateAction<Company[]>>;
}

const BodyCell = styled(Box)`
  display: flex;
  justify-content: center;
  text-align: center;
  //border-top: ${({ theme }) => `2px solid ${theme.palette.active.light}`};
  //padding: ${({ theme }) => theme.spacing(0.5)};
`;

const numFormatter = Intl.NumberFormat('ru-RU').format;

const MarketTable = ({ selected, onDeleteClick }: MarketTableProps) => {
  const firstSelected = useMemo<Company | null>(() => {
    return selected[0] || null;
  }, [selected]);

  const fieldNames = useMemo<string[]>(() => {
    if (!firstSelected) return [];
    // оставляю все поля, которые не помечены как "хидден"
    return Object.keys(firstSelected)
      .sort((a, b) => {
        return (
          fieldsDescriptions.findIndex((fd) => fd.fieldName === a) -
          fieldsDescriptions.findIndex((fd) => fd.fieldName === b)
        );
      })
      .filter((fieldName) => {
        let foundFd = fieldsDescriptions.find((fd) => fd.fieldName === fieldName);
        if (!foundFd) {
          console.warn('Company содержит поле, которое не описано в fieldsDescriptions:', fieldName, {
            firstSelected,
          });
          return false;
        }
        return !foundFd.isHidden;
      });
  }, [firstSelected]);

  const getFDByFieldName = useCallback((fieldName: string) => {
    let found = fieldsDescriptions.find((fd) => fd.fieldName === fieldName);
    if (!found) {
      console.warn('что-то пошло не как ожидалось...');
      return null;
    }
    return found;
  }, []);

  // if (!firstSelected) return <Typography>Выберите ИНН</Typography>;
  if (!firstSelected)
    return (
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
    );
  return (
    <TableContainer component={Paper as any}>
      <Table sx={{ minWidth: 650 }} size="small">
        <TableHead>
          <TableRow>
            <TableCell> </TableCell>
            {selected.map((it) => (
              <TableCell key={it.inn}>
                <Box display="flex" justifyContent="space-between" alignItems="center">
                  <NextLink
                    href={`/single-inn?inn=${it.inn}`}
                    target="_blank"
                    passHref
                    style={{ textDecoration: 'none' }}
                  >
                    <Button>
                      <Typography variant={'subtitle2'}>{it.inn}</Typography>
                    </Button>
                  </NextLink>
                  {!!onDeleteClick && (
                    <IconButton color={'error'} onClick={() => (onDeleteClick ? onDeleteClick(it) : undefined)}>
                      <CloseIcon />
                    </IconButton>
                  )}
                </Box>
              </TableCell>
            ))}
          </TableRow>
        </TableHead>

        <TableBody>
          {fieldNames.map((fieldName) => (
            <TableRow key={fieldName} sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
              <TableCell component="th" scope="row">
                <RowTitle fd={getFDByFieldName(fieldName) as any} />
              </TableCell>
              {selected.map((it) => (
                <TableCell key={`${it.inn}---${fieldName}`} component="th" scope="row">
                  {isNaN(Number(it[fieldName])) ? '-' : numFormatter(it[fieldName])}
                </TableCell>
              ))}
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

const ShouldSelectInn = styled('div')(({ theme }) => ({
  ...theme.typography.button,
  backgroundColor: theme.palette.active.light,
  padding: theme.spacing(5),
}));

const Wrapper: FC<{ children: ReactElement; description?: string }> = ({ children, description }) =>
  description ? (
    <Tooltip title={description} placement={'top'} arrow>
      {children}
    </Tooltip>
  ) : (
    children
  );
const RowTitle: FC<{ fd: SingleField }> = ({ fd }) => {
  const title = fd.title;
  const description = fd.description;

  return (
    <BodyCell style={{ fontWeight: 'bold' }}>
      <Wrapper description={description}>
        <Box width="100%" textAlign="left" display="flex" sx={{ cursor: description ? 'help' : 'default' }}>
          <Box
            style={{
              opacity: description ? 1 : 0,
              pointerEvents: description ? 'all' : 'none',
              width: '24px',
              marginRight: '4px',
            }}
          >
            <HelpIconOutline size={24} />
          </Box>
          <div>{title}</div>
        </Box>
      </Wrapper>
    </BodyCell>
  );
};

export default MarketTable;
