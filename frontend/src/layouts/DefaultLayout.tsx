import { Box, Paper, styled } from '@mui/material';
import { PropChildren } from '@/src/types/UtilityProps';
import Header from '@/src/layouts/Header';
import Footer from '@/src/layouts/Footer';

const GridContainer = styled(Box)`
  display: flex;
  flex-direction: column;
  width: 100vw;
  overflow-x: hidden;
`;

const PageWrapper = styled(Paper)`
  display: flex;
  justify-content: center;
  //min-height: 100vh;
  background-color: ${({ theme }) => theme.palette.active.dark};
  padding: ${({ theme }) => theme.spacing(3, 5, 8)};
  margin-top: 56px;

  @media only screen and (min-width: 360px) {
    margin-top: 72px;
  }
  @media only screen and (min-width: 768px) {
    //margin-top: 120px;
  }
`;

const DefaultLayout = ({ children }: PropChildren) => {
  return (
    <GridContainer style={{ height: '100vh' }}>
      <Header />
      <PageWrapper elevation={0}>
        <Box
          maxWidth={1244}
          flexGrow={1}
          display="flex"
          flexDirection="column"
          style={{ minHeight: 'calc(100vh - 300px)' }}
        >
          {children}
        </Box>
      </PageWrapper>
      <Footer />
    </GridContainer>
  );
};

export default DefaultLayout;
