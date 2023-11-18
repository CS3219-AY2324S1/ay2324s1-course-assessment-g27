import { FormEvent, useState } from "react";
import { useSelector } from "react-redux";
import { State } from "../../state";
import { changePwdById } from "../../api/usersAPI/Auth/changePwdById"
import { comparePwd } from "../../api/usersAPI/Auth/comparePwd";
import { Alert, AlertTitle, Box, TextField } from "@mui/material";
import "./PwdForm.css";
import { useNavigate } from "react-router-dom";

const PwdForm = () => {
    const [oldPwd, setOldPwd] = useState("");
    const [newPwd, setNewPwd] = useState("");
    const [cfmPwd, setCfmPwd] = useState("");
    const [msg, setMsg] = useState("Password updated successfully");
    const [oldErr, setOldErr] = useState(false);
    const [newErr, setNewErr] = useState(false);
    const [cfmErr, setCfmErr] = useState(false);

    const user = useSelector((state: State) => state.user);
    const token = useSelector((state: State) => state.token);
    const navigate = useNavigate();
    const id = user.id; 
    const [alertVisible, setAlertVisible] = useState(false);
    const [errorVisible, setErrorVisible] = useState(false);

    const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {  
        event.preventDefault();
        try {
            if (oldPwd == '') setOldErr(true);
            if (newPwd == '') setNewErr(true);
            if (cfmPwd == '') setCfmErr(true);
            if (newPwd == '' || oldPwd == '' || cfmPwd == '') { 
                //if i check for oldPwd first theres a weird error where
                //ie. oldpwd: a, newpwd and cfmpwd empty,
                //submit once, oldpwd field not outlined, 
                //submit twice, oldpwd gets outlined
                console.log(oldErr, newErr, cfmErr);
                return false;
            }

            const isMatchRes = await comparePwd(token, id, oldPwd);

            if (newPwd != cfmPwd) {
                throw new Error("New passwords do not match");
            }
            const changePwdRes = await changePwdById(token, id, newPwd);
            
            if (errorVisible) {
                setErrorVisible(false);
            }
            setMsg("Password Updated Successfully");
            setAlertVisible(true);
            navigate("/profile/info");
            alert("Password changed successfully")
        } catch (error: any) {
            setMsg(error.message);
            if (alertVisible) {
                setAlertVisible(false);
            }
            setErrorVisible(true);
        }
    }

    return (
        <div className="pwdform">
            <h1 className="mainheader">Change Password</h1>
            <Box 
                component="form" 
                className="form" 
                onSubmit={(event) => handleSubmit(event)}
                noValidate
                autoComplete="off"
            >
            {/* <form className="form" onSubmit={(event) => handleSubmit(event)}> */}
                    <TextField 
                        required
                        className="form-group"
                        label='Old Password'
                        name="oldpwd"
                        id="oldpwd"
                        placeholder="Old Password"
                        onChange={(event) => {
                            setOldPwd(event.target.value);
                            setOldErr(false);
                        }}
                        error={oldErr}
                        helperText={oldErr && "required"}
                    />

                    <TextField 
                        required
                        className="form-group"
                        label='New Password'
                        name="newpwd"
                        id="newpwd"
                        placeholder="New Password"
                        onChange={(event) => {
                            setNewPwd(event.target.value);
                            setNewErr(false);
                        }}
                        error={newErr}
                        helperText={newErr && "required"}
                    />
                
                    <TextField 
                        required
                        className="form-group"
                        label='Confirm New Password'
                        name="cfmpwd"
                        id="cfmpwd"
                        placeholder="New Password"
                        onChange={(event) => {
                            setCfmPwd(event.target.value);
                            setCfmErr(false);
                        }}
                        error={cfmErr}
                        helperText={cfmErr && "required"}
                    />
                {alertVisible && 
                <Alert 
                    severity="success"
                    onClose={() => setAlertVisible(false)}
                >
                    <AlertTitle>Success</AlertTitle>
                    {msg}
                </Alert>}
                {errorVisible && 
                <Alert 
                    severity="error"
                    onClose={() => setErrorVisible(false)}
                >
                    <AlertTitle>Error</AlertTitle>
                    {msg}
                </Alert>}
                <button 
                    className="mainbutton" 
                    type="submit"
                >
                    Change Password</button>
            {/* </form> */}
            </Box>
            </div>
    )
}

export default PwdForm;