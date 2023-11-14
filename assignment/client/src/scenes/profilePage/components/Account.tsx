import "./Account.css";
import { useNavigate } from "react-router-dom";
import DeleteUserPopup from "./DeleteUserPopup";
import { useState } from "react";

const Account = () => {
    const [open, setOpen] = useState(false);
    const navigate = useNavigate();
    return (
        <div className="account">
            <h1 className="mainheader">Settings</h1>
            <button className="changepwd" onClick={() => navigate("/password")}>
                <span>Change Password</span>
            </button>
            <button 
                className="mainbutton" 
                type="button"
                onClick={() => setOpen(true)}>
                Delete Account
            </button>
            {open ? <DeleteUserPopup closePopup={() => setOpen(false)} /> : null}
        </div>
    )
}

export default Account;