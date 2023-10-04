import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { State, setLogin, setUser } from "../../../state";
import { getUserById } from "../../../api/usersAPI/getUserById";
import { editUserById } from "../../../api/usersAPI/editUserById";
import { User } from "../../../state/user";
import "./BasicInfo.css";
//import { useNavigate } from "react-router-dom";

interface userProp {
    username: string;
    id: number;
}
const BasicInfo = ({ username, id }: userProp) => { 
    //const user = getUserById(token, id);
    console.log('initial user: ', username);
    const token = useSelector((state: State) => state.token);
    // const id = user.id;

    const dispatch = useDispatch();
    const [uname, setUname] = useState(username);

    

    // const editUname = async () => {
    //     const user = await getUserById(token, id);
    //     console.log('get user: ', user);
    //     setUname(user[0].username);
    //     dispatch(setUser(userData));
    //     console.log("changed user");
    //     console.log(username);
    // }

    useEffect(() => {
        async function getUser() {
            const user = await getUserById(token, id);
            setUname(user[0].username);
            console.log('username in info: ', username);
        }
        getUser();
    }, [])

    const handleSubmit = async (event) => {
        //event.preventDefault();
        const response = await editUserById(token, id, uname);
        const user = await getUserById(token, id);
        console.log('get user: ', user);
        //setUserData(user[0]);
        //console.log('userdata: ', userData);
        //setUname(userData.username);
        //console.log('uname: ', uname);
        dispatch(setUser(user));
        // editUname();
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
            </form>
        </div>
    )
}

export default BasicInfo;