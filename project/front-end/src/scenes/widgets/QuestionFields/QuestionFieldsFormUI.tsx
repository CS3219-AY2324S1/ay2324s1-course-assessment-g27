import { Button,Box, TextField} from "@mui/material";
import {DeleteOutlined} from "@mui/icons-material";
import AddCircleOutlinedIcon from '@mui/icons-material/AddCircleOutlined';

export type ExampleAndConstraintsFieldsUIProps = {
    fields: any,
    handleUpdateFields: (field:any) => void,
    handleAddFields: () => void,
    handleDeleteFields: (index:any) => void,
} & React.InputHTMLAttributes<HTMLInputElement>;


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

export const ExampleFieldsUI = ({fields, handleUpdateFields, handleAddFields, handleDeleteFields}:ExampleAndConstraintsFieldsUIProps) => {
    const maxInputNum = 3;

    return (
        <div>
            {fields.map((field:any, index:any) => (
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
                                handleUpdateFields(updatedFields);
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
                                handleUpdateFields(updatedFields);
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
                                handleUpdateFields(updatedFields);
                            }}
                        />
                        <TextField
                            sx={{...TextFieldCSS }}
                            label="Example Image Link"
                            placeholder="Enter Image Link"
                            value={field.image}
                            onChange={(e) => {
                                const updatedFields = [...fields];
                                updatedFields[index].image = e.target.value;
                                handleUpdateFields(updatedFields);
                            }}
                        />
                        {fields.length > 1 && (
                            <Button sx={{...ButtonIconCSS}} onClick={() => handleDeleteFields(index)}>
                            <DeleteOutlined/>
                            </Button>
                        )}
                        {fields.length - 1 === index && fields.length < maxInputNum && (
                            <Button sx={{...ButtonIconCSS}} onClick={handleAddFields}>
                                <AddCircleOutlinedIcon/>
                            </Button>
                        )}
                    </div>
                </Box>
            ))}
        </div>
    );
}

export const ConstraintsFieldsUI = ({fields, handleUpdateFields, handleAddFields, handleDeleteFields}:ExampleAndConstraintsFieldsUIProps) => {
    const maxInputNum = 6;
    return (
        <div>
            {fields.map((field:any, index:any) => (
                <div key={index}>
                    <TextField
                        sx={{...TextFieldCSS }}
                        label="Constraints"
                        placeholder="Enter Constraints"
                        value={field}
                        onChange={(e) => {
                            const updatedFields = [...fields];
                            updatedFields[index] = e.target.value;
                            handleUpdateFields(updatedFields);
                        }}
                    />
                    {fields.length > 1 && (
                        <Button sx={{...ButtonIconCSS}} onClick={() => handleDeleteFields(index)}>
                        <DeleteOutlined/>
                        </Button>
                    )}
                    {fields.length - 1 === index && fields.length < maxInputNum && (
                        <Button sx={{...ButtonIconCSS}} onClick={handleAddFields}>
                            <AddCircleOutlinedIcon/>
                        </Button>
                    )}
                </div>
            ))}
        </div>
    );
}