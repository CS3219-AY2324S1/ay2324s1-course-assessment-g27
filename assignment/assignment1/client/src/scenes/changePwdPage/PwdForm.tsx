import { useState } from "react";
import { useSelector } from "react-redux";
import { State } from "../../state";
import { changePwdById } from "../../api/usersAPI/changePwdById"
import { comparePwd } from "../../api/usersAPI/comparePwd";
import { Alert, AlertTitle } from "@mui/material";
import "./PwdForm.css";
import { useNavigate } from "react-router-dom";

const PwdForm = () => {
    const [oldPwd, setOldPwd] = useState("");
    const [newPwd, setNewPwd] = useState("");
    const [cfmPwd, setCfmPwd] = useState("");
    const [msg, setMsg] = useState("Password updated successfully");

    const user = useSelector((state: State) => state.user);
    const token = useSelector((state: State) => state.token);
    // const navigate = useNavigate();
    const id = user.id; 
    const [alertVisible, setAlertVisible] = useState(false);
    const [errorVisible, setErrorVisible] = useState(false);

    const handleSubmit = async (event) => {
        event.preventDefault();
        try {
            if (newPwd == '' || cfmPwd == '') {
                throw new Error("New passwords cannot be empty");
            }
            if (newPwd != cfmPwd) {
                throw new Error("New passwords do not match, please confirm your new password again");
            }
            const isMatchRes = await comparePwd(token, id, oldPwd);
            const changePwdRes = await changePwdById(token, id, newPwd);
            
            if (errorVisible) {
                setErrorVisible(false);
            }
            setMsg("Password Updated Successfully");
            setAlertVisible(true);
            // navigate("/profile/info");
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
            <form className="form" onSubmit={(event) => handleSubmit(event)}>
                <div className="form-group">
                    <label htmlFor="oldpwd">Old Password<span>*</span></label>
                    <input 
                    type="text" 
                    name="oldpwd" 
                    id="oldpwd" 
                    onChange={(event) => {
                        setOldPwd(event.target.value);
                    }}></input>
                </div>

                <div className="form-group">
                    <label htmlFor="newpwd">New Password<span>*</span></label>
                    <input 
                    type="text" 
                    name="newpwd" 
                    id="newpwd"
                    onChange={(event) => {
                        setNewPwd(event.target.value);
                    }}></input>
                </div>

                <div className="form-group">
                    <label htmlFor="cfmpwd">Confirm New Password<span>*</span></label>
                    <input 
                    type="text" 
                    name="cfmpwd" 
                    id="cfmpwd"
                    onChange={(event) => {
                        setCfmPwd(event.target.value);
                    }}></input>
                </div>
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
                <button className="mainbutton" type="submit">Change Password</button>
            </form>
            </div>
    )
}

export default PwdForm;