import { FormEvent, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { State, setUser } from "../../../state";
import { getUserById } from "../../../api/usersAPI/Auth/getUserById";
import { editUserById } from "../../../api/usersAPI/Auth/editUserById";
import { Alert, AlertTitle } from "@mui/material";
import "./BasicInfo.css";


const BasicInfo = () => { 
    const user = useSelector((state: State) => state.user);
    const token = useSelector((state: State) => state.token);
    const id = user.id;
    const dispatch = useDispatch(); 
    const [uname, setUname] = useState(user.username);
    const [alertVisible, setAlertVisible] = useState(false);
    const [errorVisible, setErrorVisible] = useState(false);
    const [msg, setMsg] = useState("");

    useEffect(() => {
        async function getUser() {
            const user = await getUserById(token, id);
            setUname(user[0].username);
        }
        getUser();
    }, [])

    const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        try {
            if (uname.length == 0) {
                throw new Error("Your username cannot be blank");
            }
            const response = await editUserById(token, id, uname);
            const updatedUser = await getUserById(token, id);
            const username = updatedUser[0].username;
            const password = "";
            const isAdmin = updatedUser[0].isadmin;
            
            if (errorVisible) {
                setErrorVisible(false);
            }
            setMsg("Username updated successfully");
            setAlertVisible(true);
            dispatch(setUser({ user: { id, username, password, isAdmin } }));
        } catch (error: any) {
            setMsg(error.message);
            if (alertVisible) {
                setAlertVisible(false);
            }      
            setErrorVisible(true);
        }
    }

    return (
        <div className="basicinfo">
            <h1 className="mainheader">Information</h1>
            
            <form className="form" onSubmit={(event) => handleSubmit(event)}>
              {/* get info with API*/}
                <div className="form-group">
                    <label htmlFor="name">Name</label>
                    <input 
                    type="text" 
                    name="name" 
                    id="name" 
                    defaultValue={user.username}
                    onChange={(event) => {
                        setUname(event.target.value);
                    }}
                    >
                    </input>
                </div>
                
                <button 
                className="mainbutton" 
                type="submit">
                Save Changes</button>
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
            </form>
        </div>
    )
}

export default BasicInfo;