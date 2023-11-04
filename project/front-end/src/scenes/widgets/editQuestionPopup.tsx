import React, { useEffect, useState } from "react";
import {Button, Dialog, DialogTitle, DialogContent,FormControl,InputLabel, MenuItem, Select, TextField, useTheme} from "@mui/material";
import { Question } from "../../state/question";
import { Theme} from "@mui/system";
import { ExampleFieldsUI, ConstraintsFieldsUI } from "./QuestionFields/QuestionFieldsFormUI";

interface EditQuestionPopupProps {
  open: boolean;
  onClose: () => void;
  question: Question; 
  onSave: (updatedData: Partial<Question>) => Promise<void>;
  getErrorMsg: () => Promise<string>;
}

const EditQuestionPopup: React.FC<EditQuestionPopupProps> = ({ open, onClose, question, onSave , getErrorMsg}) => {
  const theme: Theme = useTheme();
  const [updatedData, setUpdatedData] = useState<Partial<Question>>({});
  const [error, setError] = useState("");
  
  useEffect(() => {
      setUpdatedData({
        title: question.title,
        difficulty: question.difficulty,
        description: question.description,
        tags: question.tags,
        examples: question.examples,
        constraints: question.constraints
      });
    }, [question]
  );

  if(updatedData.constraints?.length === 0) {
    setUpdatedData({...updatedData, constraints:[""]});
  }

  if(updatedData.examples?.length === 0) {
    setUpdatedData({...updatedData, examples:[{inputText: "", outputText: "", explanation: "", image:""}]});
  }

  const handleExampleAddField=() => {
    setUpdatedData((prevState) => ({
      title: updatedData.title,
      difficulty: updatedData.difficulty,
      description:updatedData.description,
      tags:updatedData.tags,
      constraints:updatedData.constraints,
      examples: [...(prevState.examples || []), {inputText: "", outputText: "", explanation: "", image:""}],
    }));
  }

  const handleExampleRemoveField = (index:any) => {
    const filteredFields = (updatedData.examples || []).filter((_,i)=> i != index);
    setUpdatedData({...updatedData, examples: filteredFields});
  }

  const handleExampleUpdateField = (updatedFields:any) => {
    setUpdatedData({...updatedData, examples: updatedFields});
  }

  const handleConstraintsAddField=() => {
    setUpdatedData((prevState) => ({
      title: updatedData.title,
      difficulty: updatedData.difficulty,
      description:updatedData.description,
      tags:updatedData.tags,
      examples:updatedData.examples,
      constraints: [...(prevState.constraints || []), ""],
    }));
  }

  const handleConstraintsRemoveField = (index:any) => {
    const filteredFields = (updatedData.constraints || []).filter((_,i)=> i != index);
    setUpdatedData({...updatedData, constraints: filteredFields});
  }

  const handleConstraintsUpdateField = (updatedFields:any) => {
    setUpdatedData({...updatedData, constraints: updatedFields});
  }

  const TextFieldCSS = {
    width: "80%",
    mb: 1, // mb= margin-bottom
  };

  const handleSave = async () => {
    await onSave(updatedData);
    const msg = await getErrorMsg();
    setError(msg);
    if(msg == "") {
      clearForm();
    }
  };

  const clearForm =() => {
    onClose();
    setError("");
    setUpdatedData({ ...updatedData, 
      title: question.title,
      difficulty: question.difficulty,
      description: question.description,
      tags: question.tags,
      examples: question.examples,
      constraints: question.constraints});
  }

  return (
    <Dialog open={open} onClose={clearForm} fullWidth={true}>
      <DialogTitle color="primary" fontWeight="bold">Editing {question.title}</DialogTitle>
      <DialogContent>
        <div>
          <TextField sx={{...TextFieldCSS}}
            label="Title"
            value={updatedData.title}
            onChange={(e) => setUpdatedData({ ...updatedData, title: e.target.value })}
            helperText={error}
            error={error != ""}
          />
        </div>
        <div>
        <FormControl sx={{...TextFieldCSS}}>
          <InputLabel>Difficulty</InputLabel>
          <Select
              value={updatedData.difficulty}
              onChange={(e) => setUpdatedData({ ...updatedData, difficulty: e.target.value })}
              inputProps={{
              name: 'max-width',
              id: 'max-width',
              }}
          >
              <MenuItem value="Easy">Easy</MenuItem>
              <MenuItem value="Medium">Medium</MenuItem>
              <MenuItem value="Hard">Hard</MenuItem>
          </Select>
        </FormControl>
        </div>
        <div>
          <TextField sx={{...TextFieldCSS}}
            label="Description"
            value={updatedData.description}
            onChange={(e) => setUpdatedData({ ...updatedData, description: e.target.value })}
          />
        </div>
        <div>
          <TextField sx={{...TextFieldCSS}}
            label="Tags"
            value={updatedData.tags}
            onChange={(e) => setUpdatedData({ ...updatedData, tags: e.target.value})}
          />
        </div>
        <div>
          <ExampleFieldsUI
            fields={updatedData.examples}
            handleAddFields={handleExampleAddField}
            handleUpdateFields={handleExampleUpdateField}
            handleDeleteFields={handleExampleRemoveField}
          />
        </div>
        <div>
          <ConstraintsFieldsUI
            fields={updatedData.constraints}
            handleAddFields={handleConstraintsAddField}
            handleDeleteFields={handleConstraintsRemoveField}
            handleUpdateFields={handleConstraintsUpdateField}
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