import React, { useCallback, useEffect, useState } from "react";
import {Button, Dialog, DialogTitle, DialogContent, TextField, useTheme} from "@mui/material";
import { Question } from "../../state/question";
import { Theme} from "@mui/system";
import {DeleteOutlined} from "@mui/icons-material";
import AddCircleOutlinedIcon from '@mui/icons-material/AddCircleOutlined';

interface EditQuestionPopupProps {
  open: boolean;
  onClose: () => void;
  question: Question; 
  onSave: (updatedData: Partial<Question>) => void;
}

const EditQuestionPopup: React.FC<EditQuestionPopupProps> = ({ open, onClose, question, onSave }) => {
  const theme: Theme = useTheme();
  const [updatedData, setUpdatedData] = useState<Partial<Question>>({});
  
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
    setUpdatedData({...updatedData, examples:[{inputText: "", outputText: "", explanation: ""}]});
  }
  
  const ButtonIconCSS = {
    ml:1,
    maxWidth: '30px', 
    maxHeight: '30px', 
    minWidth: '30px', 
    minHeight: '30px'
  }

  const TextFieldCSS = {
    width: "80%",
    mb: 1, // mb= margin-bottom
  };

  const handleSave = () => {
    onSave(updatedData);
    clearForm();
  };

  const clearForm =() => {
    setUpdatedData({ ...updatedData, 
      title: question.title,
      difficulty: question.difficulty,
      description: question.description,
      tags: question.tags,
      examples: question.examples,
      constraints: question.constraints});
    onClose();
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
          />
        </div>
        <div>
          <TextField sx={{...TextFieldCSS}}
            label="Difficulty"
            value={updatedData.difficulty}
            onChange={(e) => setUpdatedData({ ...updatedData, difficulty: e.target.value })}
          />
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
            onChange={(e) => setUpdatedData({ ...updatedData, tags: [e.target.value]})}
          />
        </div>
        <div>
          {/* <TextField sx={{...TextFieldCSS}}
            label="Examples"
            value={updatedData.examples}
            onChange={(e) => setUpdatedData({ ...updatedData, examples: e.target.value.split(",") })}
          /> */}
          {updatedData.examples?.map((field, index) => (
            <div key={index}>
              <TextField
                  sx={{...TextFieldCSS }}
                  label="Example Input"
                  value={field.inputText}
                  onChange={(e) => {
                      const updatedFields = updatedData.examples;
                      updatedFields![index].inputText = e.target.value;
                      setUpdatedData({ ...updatedData, examples: updatedFields});
                  }}
              />
              <TextField
                  sx={{...TextFieldCSS }}
                  label="Example Output"
                  value={field.outputText}
                  onChange={(e) => {
                    const updatedFields = updatedData.examples;
                    updatedFields![index].outputText = e.target.value;
                    setUpdatedData({ ...updatedData, examples: updatedFields});
                  }}
              />
              <TextField
                  sx={{...TextFieldCSS }}
                  label="Example Explaination"
                  value={field.explanation}
                  onChange={(e) => {
                    const updatedFields = updatedData.examples;
                    updatedFields![index].explanation = e.target.value;
                    setUpdatedData({ ...updatedData, examples: updatedFields});
                  }}
              />
              {(updatedData.examples || []).length > 1 && (
                  <Button sx={{...ButtonIconCSS}} 
                    onClick={() => {
                      const filteredFields = (updatedData.examples || []).filter((_,i)=> i != index);
                      setUpdatedData({ ...updatedData, examples: filteredFields});
                    }}>
                    <DeleteOutlined/>
                  </Button>
              )}
              {(updatedData.examples || []).length - 1 === index && (updatedData.examples || []).length < 3 && (
                  <Button sx={{...ButtonIconCSS}} 
                  onClick={() => {
                    setUpdatedData((prevState) => ({
                      title: updatedData.title,
                      difficulty: updatedData.difficulty,
                      description:updatedData.description,
                      tags:updatedData.tags,
                      constraints:updatedData.constraints,
                      examples: [...(prevState.examples || []), {inputText: "", outputText: "", explanation: ""}],
                    }));
                }}>
                      <AddCircleOutlinedIcon/>
                  </Button>
              )}
          </div>
          ))}
        </div>
        <div>
          {updatedData.constraints?.map((field, index) => (
            <div key={index}>
              <TextField sx={{...TextFieldCSS}}
                label="Constraints"
                value={field}
                onChange={(e) => {
                  const updatedFields = updatedData.constraints;
                  updatedFields![index] = e.target.value;
                  setUpdatedData({ ...updatedData, constraints: updatedFields});
                }}
              />
              {(updatedData.constraints || []).length > 1 && (
                <Button sx={{...ButtonIconCSS}} 
                  onClick={() => {
                    const filteredFields = (updatedData.constraints || []).filter((_,i)=> i != index);
                    setUpdatedData({ ...updatedData, constraints: filteredFields});
                }}>
                  <DeleteOutlined/>
                </Button>
              )}
              {(updatedData.constraints || []).length - 1 === index && (updatedData.constraints || []).length < 4 && (
                <Button sx={{...ButtonIconCSS}} 
                  onClick={() => {
                    setUpdatedData((prevState) => ({
                      title: updatedData.title,
                      difficulty: updatedData.difficulty,
                      description:updatedData.description,
                      tags:updatedData.tags,
                      examples:updatedData.examples,
                      constraints: [...(prevState.constraints || []), ""],
                    }));
                }}>
                    <AddCircleOutlinedIcon/>
                </Button>
              )}
            </div> 
          ))}
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
