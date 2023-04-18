import { AppBar, Box, Button, Divider, styled, Toolbar } from '@mui/material';
import NextLink from 'next/link';
import { useState } from 'react';
import { useRouter } from 'next/router';
import theme from '@/src/const/defaultTheme';
import DownloadIcon from '@mui/icons-material/Download';

const StyledToolbar = styled(Toolbar)`
  justify-content: space-between;
  flex-direction: column;
  min-height: 0;
  background-color: ${({ theme }) => theme.palette.background.paper};
  color: ${({ theme }) => theme.palette.common.black};
  // @NOTE: Повысил вес, чтобы закрыть дефолтный паддинг в 24px
  & {
    padding: 0;
  }
  .Burger {
    color: ${({ theme }) => theme.palette.common.black};
  }

  .Menu {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: ${({ theme }) => theme.spacing(2, 2)};
    height: 56px;

    & > div {
      display: flex;
      justify-content: space-between;
      width: 100%;
    }
  }

  .SubMenu {
    height: 48px;
    display: none;
  }

  @media only screen and (min-width: 360px) {
    .Menu {
      height: 72px;
      padding: ${({ theme }) => theme.spacing(2, 6)};
    }
  }
  @media only screen and (min-width: 768px) {
    max-height: 120px;
    img {
      width: 192px;
      height: 32px;
    }
    .Burger {
      order: -1;
      margin-right: ${({ theme }) => theme.spacing(2)};
    }
    .Menu {
      padding: ${({ theme }) => theme.spacing(2.5, 3)};

      & > div {
        justify-content: initial;
      }
    }
    .SubMenu {
      display: initial;
    }
  }
  @media only screen and (min-width: 1280px) {
    .Menu,
    .SubMenu > div {
      // padding: ${({ theme }) => theme.spacing(0, 35)};
    }
  }
  .NavLink {
    font-size: 16px;
    color: #000;
    transition: all 0.3s;
    &:hover {
      color: ${theme.palette.hover.main} !important;
    }
    &.active {
      color: #0041cb;
      //font-weight: 600;
    }
  }
`;

const Tabs = styled(Box)`
  display: none;
  align-items: center;
  margin-left: ${({ theme }) => theme.spacing(2.5)};
  gap: ${({ theme }) => theme.spacing(4)};
  white-space: nowrap;
  height: 100%;

  @media only screen and (min-width: 768px) {
    display: flex;
  }
`;

const Header = () => {
  const router = useRouter();
  const [menuItems] = useState([
    {
      href: '/single-inn',
      text: 'Проверка ИНН',
    },
    {
      href: '/filter',
      text: 'Подбор для НМЦ',
    },
    {
      href: '/compare-inns',
      text: 'Сравнение',
    },
  ]);

  return (
    <AppBar>
      <StyledToolbar>
        <Box display={'flex'} flexDirection={'column'} width={'100%'} height={'100%'}>
          <Box className="Menu">
            <Box display={'flex'} alignItems={'center'}>
              <a
                href="https://uni.roseltorg.ru/vserosrlthack"
                target="_blank"
                rel="noreferrer"
                style={{ marginRight: 40 }}
              >
                <img src="/roseltorg-logo.svg" alt="Честный знак" />
              </a>
              <Tabs>
                {menuItems.map((it) => (
                  <NextLink
                    key={it.text}
                    href={it.href}
                    passHref
                    style={{ textDecoration: 'none' }}
                    className={`NavLink ${router.pathname === it.href ? 'active' : ''}`}
                  >
                    <span>{it.text}</span>
                  </NextLink>
                ))}
                <Button
                  size="medium"
                  startIcon={<DownloadIcon width={18} />}
                  sx={{ ml: 'auto' }}
                  component="a"
                  href={'/api/csv'}
                  target="_blank"
                >
                  CSV
                </Button>
              </Tabs>
            </Box>
          </Box>
          <Divider />
          {/*<Box className="SubMenu">*/}
          {/*  <Tabs color={(theme) => theme.palette.text.subMenu}>*/}
          {/*    <Typography variant={'subtitle2'}>Электронная подпись</Typography>*/}
          {/*    <Typography variant={'subtitle2'}>Помощь в регистрации</Typography>*/}
          {/*    <Typography variant={'subtitle2'}>Банковские гарантии</Typography>*/}
          {/*    <Typography variant={'subtitle2'}>О Экспертиза заявки</Typography>*/}
          {/*  </Tabs>*/}
          {/*</Box>*/}
        </Box>
      </StyledToolbar>
    </AppBar>
  );
};

export default Header;
