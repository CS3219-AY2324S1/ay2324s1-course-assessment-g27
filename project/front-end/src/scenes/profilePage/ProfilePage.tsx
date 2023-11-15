import { useParams } from "react-router-dom";
import Navbar from "../navBar";
import UserLeftBar from "./components/UserLeftBar";
import Account from "./components/Account";
import BasicInfo from "./components/BasicInfo";

import "./ProfilePage.css";

const ProfilePage = () => {
  const { activePage } = useParams();
  const currPage: String = activePage ? activePage : "";

  return (
    <div className="userprofile">
      <Navbar inRoomStatus={false} />
      <div className="userinfo">
        <div className="leftbar">
          <UserLeftBar activePage={currPage} />
        </div>
        <div className="mainbar">
          {activePage === "info" && <BasicInfo />}
          {activePage === `account` && <Account />}
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;
