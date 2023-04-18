import { Box, Card, CardContent, Typography } from '@mui/material';
import { useCallback, useContext, useEffect, useMemo, useState } from 'react';
import { AxiosError } from 'axios';

const Dolly = () => {
  const [error, setError] = useState<AxiosError>();
  // eslint-disable-next-line no-unused-vars, @typescript-eslint/no-unused-vars
  const [isLoading, setIsLoading] = useState(false);

  if (error) {
    return <Typography>{error.message}</Typography>;
  }

  return (
    <Box display={'flex'} flexDirection={'column'} gap={2}>
      <Typography variant="h1" gutterBottom>
        Sample Boxes
      </Typography>
      <Box sx={{ minWidth: 275 }}>
        <Card variant="outlined">
          <CardContent>
            <Typography variant="h5" component="div">
              sample header
            </Typography>
            <Typography sx={{ mb: 1.5 }} color="text.secondary">
              adjective
            </Typography>
            <Typography variant="body2">
              well meaning and kindly.
              <br />
              {'"a benevolent smile"'}
            </Typography>
          </CardContent>
        </Card>
      </Box>
    </Box>
  );
};

export default Dolly;
