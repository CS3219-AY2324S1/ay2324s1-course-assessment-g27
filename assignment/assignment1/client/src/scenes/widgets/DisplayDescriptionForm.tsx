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
        fullWidth
    >
      <DialogTitle id="customized-dialog-title" color="primary" fontWeight="bold" fontSize="clamp(1rem, 1rem, 2rem)">
          {question.title} Additional Information
      </DialogTitle>
      <DialogContent dividers>
        <Typography><b>Description:</b></Typography>
        <Typography gutterBottom>{question.description}</Typography>
      </DialogContent>
      <DialogContent>
        {question.examples?.map((field, index) => (
          <div key={index}> {(() => {
            if(field.inputText == "" && field.outputText == "" && field.explanation == "") {
              return(<div></div>);
            } else {
              return(
              <div>
                <Typography><b>Example {index + 1}:</b></Typography>
                <DialogContent>
                  <Typography gutterBottom><b>Input: </b> {field.inputText}</Typography>
                  <Typography gutterBottom><b>Output: </b> {field.outputText}</Typography>
                  <Typography gutterBottom><b>Explanation: </b> {field.explanation}</Typography>
                </DialogContent>
              </div>);
            }
            })()}
          </div>
        ))}
      </DialogContent>
      <DialogContent>
      <Typography><b>Constraints:</b></Typography>
        {question.constraints?.map((field, index) => (
          <div key={index}> 
            <ul>
              <li>{field}</li>
            </ul>
          </div>
        ))}
      </DialogContent>
    </BootstrapDialog>
  );
};

export default DisplayDescription;
//if(field.inputText == "" && field.outputText == "" && field.explanation == "") {