import {Button, Dialog, DialogTitle, DialogContent,FormControl,InputLabel, MenuItem, Select, TextField, useTheme} from "@mui/material";
import { useState } from "react";
import { Question } from "../../state/question";
import { Theme } from "@mui/system";
import ExampleFields from "./QuestionFields/ExampleFields";
import ConstraintsFields from "./QuestionFields/ConstraintsFields";

interface AddQuestionFormProps {
    open: boolean;
    onClose: () => void;
    onSave: (newData: Partial<Question>) => Promise<void>;
    getErrorMsg: () => Promise<string>;
}

const AddQuestionForm: React.FC<AddQuestionFormProps> = ({open, onClose, onSave, getErrorMsg}) => {
    const theme: Theme = useTheme();
    const [error, setError] = useState("");
    const [newData, setData] = useState<Partial<Question>>({
      title: "",
      difficulty: "",
      description: "",
      tags: "",
      examples: [{
        inputText: "",
        outputText: "",
        explanation: "",
        image:""}],
      constraints: [],
    });

    const TextFieldCSS = {
        width: "80%",
        mb: 1, // mb= margin-bottom
    };
    
    const handleSave = async () => {
        await onSave(newData);
        const msg = await getErrorMsg();
        setError(msg);
        if(msg == "") {
            clearForm();
        }
    };

    const clearForm = () => {
        onClose();
        setError("");
        setData({ ...newData, title:"", description:"",difficulty:"",tags:"",examples:[],constraints:[]});
      }

    return (
        <Dialog open={open} onClose={clearForm} fullWidth={true} >
            <DialogTitle color="primary" fontWeight="bold">Add Question</DialogTitle>
            <DialogContent>
                <div>
                <TextField sx={{...TextFieldCSS}}
                    label="Title"
                    placeholder="Enter Title"
                    onChange={(e) => setData({ ...newData, title: e.target.value})}
                    value={newData.title}
                    helperText={error}
                    error={error != ""}
                />
                </div>
                <div>
                <FormControl sx={{...TextFieldCSS}}>
                    <InputLabel>Difficulty</InputLabel>
                    <Select
                        value={newData.difficulty}
                        onChange={(e) => setData({ ...newData, difficulty: e.target.value})}
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
                    placeholder="Enter description"
                    onChange={(e) => setData({ ...newData, description: e.target.value})}
                    value={newData.description}
                />
                </div>
                <div>
                <TextField sx={{...TextFieldCSS}}
                    label="Tags"
                    placeholder="Enter tags"
                    onChange={(e) => setData({ ...newData, tags: e.target.value})}
                    value={newData.tags}
                />
                </div>
                <div>
                    <ExampleFields
                        newData = {newData}
                        setData = {setData}
                    />
                </div>
                <div>
                    <ConstraintsFields
                        newData = {newData}
                        setData = {setData}
                    />
                </div>
                <Button 
                disabled={newData.title == "" || newData.difficulty == "" || newData.description ==""} 
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

export default AddQuestionForm;
