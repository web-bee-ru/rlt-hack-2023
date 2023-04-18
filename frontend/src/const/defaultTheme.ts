import { createTheme, PaletteOptions } from '@mui/material';
import baseTheme from '@/src/const/baseTheme';
import { Shadows } from '@mui/material/styles/shadows';

declare module '@mui/material/styles/createPalette' {
  interface Palette {
    active: Palette['primary'];
    hover: Palette['primary'];
    pressed: Palette['primary'];
  }
  interface PaletteOptions {
    active: PaletteOptions['primary'];
    hover: PaletteOptions['primary'];
    pressed: PaletteOptions['primary'];
  }
  interface TypeBackground {
    disable: string;
  }
  interface TypeText {
    secondDisable: string;
    subMenu: string;
  }
}

const shadows: Shadows = {
  ...['none'],
  1: '0 1px 4px 1px rgba(0, 65, 203, 0.2)',
  2: '0 4px 16px 1px rgba(0, 65, 203, 0.1)',
  3: '0 4px 16px 1px rgba(0, 65, 203, 0.05)',
  4: '0 4px 16px 1px rgba(0, 65, 203, 0.01)',
  5: '0 4px 16px 1px rgba(0, 65, 203, 0.01)',
  6: '0 4px 16px 1px rgba(0, 65, 203, 0.01)',
  7: '0 4px 16px 1px rgba(0, 65, 203, 0.01)',
  8: '0 4px 16px 1px rgba(0, 65, 203, 0.01)',
  9: '0 4px 16px 1px rgba(0, 65, 203, 0.01)',
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
} as any;

export const lightPalette: PaletteOptions = {
  mode: 'light',
  active: {
    main: '#0450F2',
    light: '#DBE7FF',
  },
  hover: {
    main: '#1F66FF',
    light: '#E6F0FF',
  },
  pressed: {
    main: '#0041CB',
    light: '#CDDDFF',
  },
  background: {
    paper: '#FFF',
    disable: '#E6E6E6',
  },
  text: {
    primary: '#000',
    secondary: '#a6b4cf',
    disabled: '#8D93A1',
    secondDisable: '#C7CDD2',
    subMenu: '#4C535F',
  },
  divider: '#81A7F8',
};

const theme = createTheme({
  ...baseTheme(),
  palette: lightPalette,
  shadows,
  components: {
    MuiCard: {
      styleOverrides: {
        root: {
          // boxShadow: '0px 16px 24px 0px #0000003D',
          borderRadius: 1,
        },
      },
    },
  },

  typography: {
    fontFamily: ['Roboto', 'Helvetica', 'Arial', 'sans-serif'].join(','),
    h1: {
      fontSize: '44px',
      lineHeight: '56px',
    },
    h2: {
      fontSize: '32px',
      lineHeight: '38px',
    },
    h3: {
      fontSize: '24px',
      lineHeight: '28px',
    },
    h4: {
      fontSize: '18px',
      lineHeight: '24px',
    },
  },
});

export default theme;
