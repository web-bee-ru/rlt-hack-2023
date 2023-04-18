import { Box, Button } from '@mui/material';

const Footer = () => {
  return (
    <Box display="flex" justifyContent="center" mt={2} mb={2}>
      <Button variant="text" color="info" component="a" href="https://web-bee.ru" target="_blank">
        <img style={{ minWidth: '100px', padding: '40px 0' }} src="/web-bee-logo.svg" alt="Web-Bee" />
      </Button>
    </Box>
  );
};

export default Footer;
