import React, { useState } from "react";
import { Modal, Box, Button, TextField } from "@mui/material";
import { Question } from "../../state/question";

interface EditQuestionPopupProps {
  open: boolean;
  onClose: () => void;
  question: Question; 
  onSave: (updatedData: Partial<Question>) => void;
}

const EditQuestionPopup: React.FC<EditQuestionPopupProps> = ({ open, onClose, question, onSave }) => {
  const [updatedData, setUpdatedData] = useState<Partial<Question>>({
    title: question.title,
    difficulty: question.difficulty,
    description: question.description,
    tags: question.tags,
    examples: question.examples,
    constraints: question.constraints,
});

  const handleSave = () => {
    onSave(updatedData);
    onClose();
  };

  return (
    <Modal open={open} onClose={onClose}>
      <Box sx={{position: "absolute", top: "50%", left: "80%", transform: "translate(-50%, -50%)", padding:"0", width:"500px" }}>
        <div>
          <TextField sx={{width:"100%"}}
            label="Title"
            value={updatedData.title || ""}
            onChange={(e) => setUpdatedData({ ...updatedData, title: e.target.value })}
          />
        </div>
        <div>
          <TextField sx={{width:"100%"}}
            label="Difficulty"
            value={updatedData.difficulty || ""}
            onChange={(e) => setUpdatedData({ ...updatedData, difficulty: e.target.value })}
          />
        </div>
        <div>
          <TextField sx={{width:"100%"}}
            label="Description"
            value={updatedData.description || ""}
            onChange={(e) => setUpdatedData({ ...updatedData, description: e.target.value })}
          />
        </div>
        <div>
          <TextField sx={{width:"100%"}}
            label="Tags"
            value={updatedData.tags?.join(", ") || ""}
            onChange={(e) => setUpdatedData({ ...updatedData, tags: e.target.value.split(",") })}
          />
        </div>
        <div>
          <TextField sx={{width:"100%"}}
            label="Examples"
            value={updatedData.examples?.join(", ") || ""}
            onChange={(e) => setUpdatedData({ ...updatedData, examples: e.target.value.split(",") })}
          />
        </div>
        <div>
          <TextField sx={{width:"100%"}}
            label="Constraints"
            value={updatedData.constraints?.join(", ") || ""}
            onChange={(e) => setUpdatedData({ ...updatedData, constraints: e.target.value.split(",") })}
          />
        </div>
        <Button variant="outlined" onClick={handleSave}>
          Save
        </Button>
      </Box>
    </Modal>
  );
};

export default EditQuestionPopup;
