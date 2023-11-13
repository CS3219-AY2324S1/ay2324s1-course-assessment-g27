import { useState } from "react";
import { Question } from "../../../state/question";
import { ConstraintsFieldsUI } from "./QuestionFieldsFormUI";

interface ConstraintsFileds {
    newData: Partial<Question>; 
    setData: (updatedData: Partial<Question>) => void;
}

const ConstraintsFields: React.FC<ConstraintsFileds> =({newData, setData}) => {
    const [fields, setFields] = useState([""]);

    const updateData = (fields : any) => {
        setData({ ...newData, constraints: fields})
    }

    const handleUpdateField = (updatedFields:any) => {
        setFields(updatedFields);
        updateData(updatedFields);
    };

    const handleAddField = () => {
        setFields([...fields, ""]);
    };

    const handleRemoveField = (index:any)=> {
        const filteredFields = fields.filter((_,i)=> i != index);
        handleUpdateField(filteredFields);
    };
    
    return(
        <ConstraintsFieldsUI
            fields={fields}
            handleAddFields={handleAddField}
            handleDeleteFields={handleRemoveField}
            handleUpdateFields={handleUpdateField}
        />
    );
    
};

export default ConstraintsFields;
