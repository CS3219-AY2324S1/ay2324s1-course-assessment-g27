import { Dialog, DialogTitle, DialogContent, Typography} from "@mui/material";
import { styled } from '@mui/material/styles';
import { Question } from "../../state/question";

interface DisplayDesctiptionPopupProps {
  open: boolean;
  onClose: () => void;
  question: Question;
}

const BootstrapDialog = styled(Dialog)(({ theme }) => ({
  '& .MuiDialogContent-root': {
    padding: theme.spacing(2),
  },
  '& .MuiDialogActions-root': {
    padding: theme.spacing(1),
  },
}));

const DisplayDescription: React.FC<DisplayDesctiptionPopupProps> = ({open, onClose, question}) => {
  return (
    <BootstrapDialog
        onClose={onClose}
        aria-labelledby="customized-dialog-title"
        open={open}
    >
      <DialogTitle id="customized-dialog-title" color="primary" fontWeight="bold" fontSize="clamp(1rem, 1rem, 2rem)">
          {question.title} Description
      </DialogTitle>
      <DialogContent dividers>
          <Typography gutterBottom>{question.description}</Typography>
        </DialogContent>
    </BootstrapDialog>
  );
};

export default DisplayDescription;
