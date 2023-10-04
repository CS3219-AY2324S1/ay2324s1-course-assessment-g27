import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { State, setLogin, setUser } from "../../../state";
import { getUserById } from "../../../api/usersAPI/getUserById";
import { changePwdById } from "../../../api/usersAPI/changePwdById"
import "./Account.css";
import { comparePwd } from "../../../api/usersAPI/comparePwd";
import { Alert, AlertTitle } from "@mui/material";

const Account = () => {
    const [oldPwd, setOldPwd] = useState("");
    const [newPwd, setNewPwd] = useState("");
    const [cfmPwd, setCfmPwd] = useState("");
    const [msg, setMsg] = useState("password updated successfully");

    const user = useSelector((state: State) => state.user);
    const token = useSelector((state: State) => state.token);
    const id = user.id;
    const dispatch = useDispatch(); 
    const [alertVisible, setAlertVisible] = useState(false);
    const [errorVisible, setErrorVisible] = useState(false);

    const handleSubmit = async (event) => {
        event.preventDefault();
        try {
            if (newPwd != cfmPwd) {
                throw new Error("New passwords do not match, please confirm your new password again");
            }
            const isMatchRes = await comparePwd(token, id, oldPwd);
            const changePwdRes = await changePwdById(token, id, newPwd);
            setAlertVisible(true);
            if (errorVisible) {
                setErrorVisible(false);
            }
        } catch (error: any) {
            setMsg(error.message);
            if (alertVisible) {
                setAlertVisible(false);
            }
            setErrorVisible(true);
        }
        
        // const updatedUser = await getUserById(token, id);
        // const username = updatedUser[0].username;
        // const password = "";
        // const isAdmin = updatedUser[0].isadmin;
        // dispatch(setUser({ user: { id, username, password, isAdmin } }));
    }

    return (
        <div className="account">
            <h1 className="mainheader">Settings</h1>

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

export default Account;