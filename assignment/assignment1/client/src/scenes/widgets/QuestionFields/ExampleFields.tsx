import { useState } from "react";
import { Button,Box, TextField} from "@mui/material";
import {DeleteOutlined} from "@mui/icons-material";
import AddCircleOutlinedIcon from '@mui/icons-material/AddCircleOutlined';
import { Question } from "../../../state/question";

interface ExampleFileds {
    newData: Partial<Question>; 
    setData: (updatedData: Partial<Question>) => void;
}

const ExampleFields: React.FC<ExampleFileds> =({newData, setData}) => {
    const [fields, setFields] = useState([{
        inputText: "",
	    outputText: "",
	    explanation: ""
    }]);
   
    const TextFieldCSS = {
        width: "80%",
        mb: 1, // mb= margin-bottom
    };

    const ButtonIconCSS = {
        ml:1,
        maxWidth: '30px', 
        maxHeight: '30px', 
        minWidth: '30px', 
        minHeight: '30px'
    }

    const updateData = (fields : any) => {
        setData({ ...newData, examples: fields})
    }

    const handleAddField = () => {
        setFields([...fields, {inputText: "", outputText: "", explanation: ""}]);
    };

    const handleUpdateField = (updatedFields:any) => {
        setFields(updatedFields);
        updateData(updatedFields);
    };

    const handleRemoveField = (index:any)=> {
        const filteredFields = fields.filter((_,i)=> i != index);
        setFields(filteredFields);
        updateData(filteredFields);
    };
    
    return (
        <div>
            {fields.map((field, index) => (
                <Box sx={{boxShadow: 1,}}>
                    <div key={index}>
                        <TextField
                            sx={{...TextFieldCSS }}
                            label="Example Input"
                            placeholder="Enter Example Input"
                            value={field.inputText}
                            onChange={(e) => {
                                const updatedFields = [...fields];
                                updatedFields[index].inputText = e.target.value;
                                handleUpdateField(updatedFields);
                            }}
                        />
                        <TextField
                            sx={{...TextFieldCSS }}
                            label="Example Output"
                            placeholder="Enter Example Output"
                            value={field.outputText}
                            onChange={(e) => {
                                const updatedFields = [...fields];
                                updatedFields[index].outputText = e.target.value;
                                handleUpdateField(updatedFields);
                            }}
                        />
                        <TextField
                            sx={{...TextFieldCSS }}
                            label="Example Explaination"
                            placeholder="Enter Example Explaination"
                            value={field.explanation}
                            onChange={(e) => {
                                const updatedFields = [...fields];
                                updatedFields[index].explanation = e.target.value;
                                handleUpdateField(updatedFields);
                            }}
                        />
                        {fields.length > 1 && (
                            <Button sx={{...ButtonIconCSS}} onClick={() => handleRemoveField(index)}>
                            <DeleteOutlined/>
                            </Button>
                        )}
                        {fields.length - 1 === index && fields.length < 3 && (
                            <Button sx={{...ButtonIconCSS}} onClick={handleAddField}>
                                <AddCircleOutlinedIcon/>
                            </Button>
                        )}
                    </div>
                </Box>
            ))}
        </div>
      );
};

export default ExampleFields;
