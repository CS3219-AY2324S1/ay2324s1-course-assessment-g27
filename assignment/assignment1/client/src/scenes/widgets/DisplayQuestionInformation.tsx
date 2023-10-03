import { Dialog, DialogTitle, DialogContent, Typography} from "@mui/material";
import { styled } from '@mui/material/styles';
import { Question } from "../../state/question";

interface DisplayDescriptionPopupProps {
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

const DisplayDescription: React.FC<DisplayDescriptionPopupProps> = ({open, onClose, question}) => {
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
        {displayExamples(question)}
      </DialogContent>
      <DialogContent>
      <Typography><b>Constraints:</b></Typography>
        {displayConstraints(question)}
      </DialogContent>
    </BootstrapDialog>
  );
};

const displayExamples = (question:Question) => {
  const currExamplesInfo:any[] = [];
  for(var index in question.examples) {
    if(question.examples[index].inputText != "" && question.examples[index].outputText != "" 
      && question.examples[index].explanation != "") {
      currExamplesInfo.push(question.examples[index]);
    }
  }

  if(currExamplesInfo.length == 0) {
    return(
    <div> <b>No Example Shown</b></div>
    );
  }
  return(
    currExamplesInfo.map((field, index) => (
      <div key={index}> {
        <div>
          <Typography><b>Example {index + 1}:</b></Typography>
          <DialogContent>
            <Typography gutterBottom><b>Input: </b> {field.inputText}</Typography>
            <Typography gutterBottom><b>Output: </b> {field.outputText}</Typography>
            <Typography gutterBottom><b>Explanation: </b> {field.explanation}</Typography>
          </DialogContent>
        </div>
      }
      </div>
    ))
  );
};

const displayConstraints= (question:Question) => {
  const currConstraintsInfo:any[] = [];
  for(var index in question.constraints) {
    if(question.constraints[index] != "") {
      currConstraintsInfo.push(question.constraints[index]);
    }
  }
  if(currConstraintsInfo.length == 0) {
    return( <div>No Constraints</div>);
  }
  return(
    currConstraintsInfo?.map((field, index) => (
      <div key={index}> 
        <ul>
          <li>{field}</li>
        </ul>
      </div>
    ))
  );
};

export default DisplayDescription;
//if(field.inputText == "" && field.outputText == "" && field.explanation == "") {