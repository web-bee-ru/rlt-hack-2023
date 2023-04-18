import { Box, Dialog, styled, Typography } from '@mui/material';
import { PropChildren } from '@/src/types/UtilityProps';

interface ModalProps extends PropChildren {
  isOpen: boolean;
  inn: string;
  onClose?: () => void;
}

const StyledDialog = styled(Dialog)``;

const StyledModal = ({ isOpen, onClose, inn, children }: ModalProps) => {
  return (
    <StyledDialog open={isOpen} onClose={onClose}>
      <Box
        display={'flex'}
        justifyContent={'center'}
        alignItems={'center'}
        width={600}
        height={600}
        sx={{ background: 'white' }}
      >
        <Typography>{inn}</Typography>
        {children}
      </Box>
    </StyledDialog>
  );
};

export default StyledModal;
