import { Table, TableBody, TableCell, TableContainer, TableRow } from '@mui/material';
import React, { useMemo } from 'react';
type Cell = string | number;
type Row = [Cell, Cell?];

interface Props {
  rows: Row[];
  variant?: 'bad' | 'good';
}

const TabledList = ({ rows, variant }: Props) => {
  const cellStyle = useMemo(() => {
    let color = 'inherit';
    if (variant === 'bad') {
      color = 'red';
    }
    if (variant === 'good') {
      color = 'green';
    }
    return {
      color,
    };
  }, [variant]);

  return (
    <TableContainer>
      <Table sx={{ minWidth: 650 }} size="small" aria-label="a dense table">
        <TableBody>
          {rows.map(([a, b]) => (
            <TableRow hover key={a}>
              <TableCell style={cellStyle} component="th" scope="row">
                {a}
              </TableCell>
              <TableCell style={cellStyle} align="right">
                {b}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default TabledList;
