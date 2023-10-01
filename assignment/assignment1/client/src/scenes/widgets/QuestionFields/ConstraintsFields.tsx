import { useState } from "react";
import { Button,TextField} from "@mui/material";
import {DeleteOutlined} from "@mui/icons-material";
import AddCircleOutlinedIcon from '@mui/icons-material/AddCircleOutlined';
import { Question } from "../../../state/question";

interface ConstraintsFileds {
    newData: Partial<Question>; 
    setData: (updatedData: Partial<Question>) => void;
}

const ConstraintsFields: React.FC<ConstraintsFileds> =({newData, setData}) => {
    const [fields, setFields] = useState([""]);
    const maxInputNum = 4;

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
        setData({ ...newData, constraints: fields})
    }

    const handleAddField = () => {
        setFields([...fields, ""]);
    };

    const handleRemoveField = (index:any)=> {
        const filteredFields = fields.filter((_,i)=> i != index);
        setFields(filteredFields);
        updateData(filteredFields);
    };
    
    return (
        <div>
            {fields.map((field, index) => (
                <div key={index}>
                    <TextField
                        sx={{...TextFieldCSS }}
                        label="Constraints"
                        placeholder="Enter Constraints"
                        value={field}
                        onChange={(e) => {
                            const updatedFields = [...fields];
                            updatedFields[index] = e.target.value;
                            setFields(updatedFields);
                            updateData(updatedFields);
                        }}
                    />
                    {fields.length > 1 && (
                        <Button sx={{...ButtonIconCSS}} onClick={() => handleRemoveField(index)}>
                        <DeleteOutlined/>
                        </Button>
                    )}
                    {fields.length - 1 === index && fields.length < maxInputNum && (
                        <Button sx={{...ButtonIconCSS}} onClick={handleAddField}>
                            <AddCircleOutlinedIcon/>
                        </Button>
                    )}
                </div>
            ))}
        </div>
      );
};

export default ConstraintsFields;
