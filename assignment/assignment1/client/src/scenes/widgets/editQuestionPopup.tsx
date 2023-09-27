import React, { useState } from "react";
import {Button, Dialog, DialogTitle, DialogContent, TextField, useTheme} from "@mui/material";
import { Question } from "../../state/question";
import { Theme} from "@mui/system";

interface EditQuestionPopupProps {
  open: boolean;
  onClose: () => void;
  question: Question; 
  onSave: (updatedData: Partial<Question>) => void;
}

const EditQuestionPopup: React.FC<EditQuestionPopupProps> = ({ open, onClose, question, onSave }) => {
  const theme: Theme = useTheme();
  const [updatedData, setUpdatedData] = useState<Partial<Question>>({
    title: question.title,
    difficulty: question.difficulty,
    description: question.description,
    tags: question.tags,
    examples: question.examples,
    constraints: question.constraints,
  });

  const TextFieldCSS = {
    width: "100%",
    mb: 1, // mb= margin-bottom
  };

  const handleSave = () => {
    onSave(updatedData);
    clearForm();
  };

  const clearForm =() => {
    onClose();
    setUpdatedData({ ...updatedData, title:"", description:"",difficulty:"",tags:[],examples:[],constraints:[]});
  }

  return (
    <Dialog open={open} onClose={clearForm}>
      <DialogTitle color="primary" fontWeight="bold">Editing {question.title}</DialogTitle>
      <DialogContent>
        <div>
          <TextField sx={{...TextFieldCSS}}
            label="Title"
            value={updatedData.title || ""}
            onChange={(e) => setUpdatedData({ ...updatedData, title: e.target.value })}
          />
        </div>
        <div>
          <TextField sx={{...TextFieldCSS}}
            label="Difficulty"
            value={updatedData.difficulty || ""}
            onChange={(e) => setUpdatedData({ ...updatedData, difficulty: e.target.value })}
          />
        </div>
        <div>
          <TextField sx={{...TextFieldCSS}}
            label="Description"
            value={updatedData.description || ""}
            onChange={(e) => setUpdatedData({ ...updatedData, description: e.target.value })}
          />
        </div>
        <div>
          <TextField sx={{...TextFieldCSS}}
            label="Tags"
            value={updatedData.tags?.join(", ") || ""}
            onChange={(e) => setUpdatedData({ ...updatedData, tags: e.target.value.split(",") })}
          />
        </div>
        <div>
          <TextField sx={{...TextFieldCSS}}
            label="Examples"
            value={updatedData.examples?.join(", ") || ""}
            onChange={(e) => setUpdatedData({ ...updatedData, examples: e.target.value.split(",") })}
          />
        </div>
        <div>
          <TextField sx={{...TextFieldCSS}}
            label="Constraints"
            value={updatedData.constraints?.join(", ") || ""}
            onChange={(e) => setUpdatedData({ ...updatedData, constraints: e.target.value.split(",") })}
          />
        </div>
        <Button 
          disabled={updatedData.title == "" || updatedData.difficulty == "" || updatedData.description ==""} 
          variant="outlined" 
          onClick={handleSave}
          sx={{
            color: theme.palette.background.alt,
            backgroundColor: theme.palette.primary.main,
            borderRadius: "3rem",
          }}>
          Save
        </Button>
      </DialogContent>
    </Dialog>
  );
};

export default EditQuestionPopup;
