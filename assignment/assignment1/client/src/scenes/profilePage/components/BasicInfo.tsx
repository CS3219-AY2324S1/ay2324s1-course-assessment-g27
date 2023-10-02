import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { State, setLogin, setUser } from "../../../state";
import { getUserById } from "../../../api/usersAPI/getUserById";
import { editUserById } from "../../../api/usersAPI/editUserById";
import "./BasicInfo.css";
//import { useNavigate } from "react-router-dom";

const BasicInfo = () => {
    const user = useSelector((state: State) => state.user);
    const token = useSelector((state: State) => state.token);
    const { id, username, password, isAdmin } = user;
    //const navigate = useNavigate();
    const dispatch = useDispatch();
    const [userData, setUserData] = useState(user);
    const [uname, setUname] = useState(userData.username);
    var edited: Boolean = false;

    

    const editUname = async () => {
        const response = await editUserById(token, id, uname);
        const user = await getUserById(token, id);
        setUserData(user[0]);
        setUname(userData.username);
        setUser(userData);
        edited = true
        console.log(uname);
        console.log(response);
        
        //dispatch(setUser(userData));
        //console.log(useSelector((state: State) => state.user));
        
    }

    useEffect(() => {
        async function getUser() {
            const user = await getUserById(token, id);
            setUserData(user[0]);
        }
        getUser();
    }, [])

    if (edited) {
        dispatch(setUser({ id, uname, password, isAdmin}))
    }
    const handleSubmit = (event) => {
        event.preventDefault();
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
                type="submit"
                onClick={editUname}>Save Changes</button>
            </form>
        </div>
    )
}

export default BasicInfo;