import "./Account.css";
import { useNavigate } from "react-router-dom";
import DeleteUserPopup from "./DeleteUserPopup";
import { useState } from "react";
import { deleteUserById } from "../../../api/usersAPI/Auth/deleteUserById";
import { useDispatch, useSelector } from "react-redux";
import { State, setLogout } from "../../../state";

const Account = () => {
    const user = useSelector((state: State) => state.user);
    const id = user.id;
    const token = useSelector((state: State) => state.token);
    const navigate = useNavigate();
    const dispatch = useDispatch();
  
    const [showDelete, setShowDelete] = useState(false);
  
    const handleDeleteUser = async () => {
      try {
          const response = await deleteUserById(token, id);
          navigate('/');
          dispatch(setLogout());
      } catch (error:any) {
          console.log(error.message);
      }
    };

    const handleCancelDeleteUser = () => {
        setShowDelete(false);
    }

    return (
        <div className="account">
            <h1 className="mainheader">Settings</h1>
            <button className="changepwd" onClick={() => navigate("/password")}>
                <span>Change Password</span>
            </button>
            <button 
                className="mainbutton" 
                type="button"
                onClick={() => setShowDelete(true)}>
                Delete Account
            </button>
            
            <DeleteUserPopup
                open={showDelete}
                onClose={handleCancelDeleteUser}
                onConfirm={handleDeleteUser}
            />
        </div>
    )
}

export default Account;