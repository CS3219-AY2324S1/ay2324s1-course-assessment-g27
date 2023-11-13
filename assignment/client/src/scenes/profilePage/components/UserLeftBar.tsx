import "./UserLeftBar.css";
import { Link } from "react-router-dom";
import SettingsIcon from '@mui/icons-material/Settings';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';

interface pageProp {
    activePage: String;
}
const UserLeftBar = ({ activePage }: pageProp) => {
    
    return (
        <div className="userleftbar">
            {
                activePage === 'info' ?
                <div className="s2">
                    <AccountCircleIcon />
                    <span>Basic info</span>
                </div>
                :
                /*when it is not selected*/
                <Link to={`/profile/info`} className='stylenone'>
                <div className="s1">
                    <AccountCircleIcon />
                    <span>Basic info</span>
                </div>
                </Link>
            }

            {
                activePage === 'account' ?
                <div className="s2">
                    <SettingsIcon />
                    <span>Account</span>
                </div>
                :
                <Link to={`/profile/account`} className='stylenone'>
                <div className="s1">
                    <SettingsIcon />
                    <span>Account</span>
                </div>
                </Link>
            }
        </div>
    )
}

export default UserLeftBar;