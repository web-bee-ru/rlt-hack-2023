import { PropChildren } from '@/src/types/UtilityProps';
import { cssReset } from '@/src/Css/CssReset';
import { GlobalStyles, Theme, ThemeProvider } from '@mui/material';
import InnDataProvider from '@/src/Providers/InnDataProvider';
import InnConstsProvider from '@/src/Providers/InnConstsProvider';

interface CommonProvidersProps extends PropChildren {
  theme: Theme;
}

const CommonProviders = ({ theme, children }: CommonProvidersProps) => {
  return (
    <ThemeProvider theme={theme}>
      <GlobalStyles styles={cssReset} />
      <InnConstsProvider>
        <InnDataProvider>{children}</InnDataProvider>
      </InnConstsProvider>
    </ThemeProvider>
  );
};

export default CommonProviders;
