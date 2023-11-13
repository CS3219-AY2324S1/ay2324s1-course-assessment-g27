import { useState } from "react";
import { Question } from "../../../state/question";
import { ExampleFieldsUI } from "./QuestionFieldsFormUI";

interface ExampleFileds {
    newData: Partial<Question>; 
    setData: (updatedData: Partial<Question>) => void;
}

const ExampleFields: React.FC<ExampleFileds> =({newData, setData}) => {
    const [fields, setFields] = useState([{
        inputText: "",
	    outputText: "",
	    explanation: "",
        image:"",
    }]);

    const updateData = (fields : any) => {
        setData({ ...newData, examples: fields})
    }

    const handleAddField = () => {
        setFields([...fields, {inputText: "", outputText: "", explanation: "", image:""}]);
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
        <ExampleFieldsUI
            fields={fields}
            handleUpdateFields={handleUpdateField}
            handleAddFields={handleAddField}
            handleDeleteFields={handleRemoveField}
        />
      );
};

export default ExampleFields;
