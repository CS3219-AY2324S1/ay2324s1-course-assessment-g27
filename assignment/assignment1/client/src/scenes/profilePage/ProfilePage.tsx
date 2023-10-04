import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Navbar from "../navBar"; 
import UserLeftBar from "../profilePage/components/UserLeftBar";
import Account from "../profilePage/components/Account";
import BasicInfo from "./components/BasicInfo";

import "./ProfilePage.css";

const ProfilePage = () => {
  //1. get username
  //2. find username in db and return values
  //3. ??
  //4. Profit
  
  const {activePage} = useParams();
  const currPage: String = activePage ? activePage : '';

  return (
    <div className="userprofile">
      <Navbar />
        <div className="userinfo">
          <div className="leftbar">
            <UserLeftBar activePage={currPage}/> 
          </div>
          <div className="mainbar">
            {activePage === 'info' && <BasicInfo/>}
            {activePage === `account` && <Account/>}
          </div>
        </div>
    </div>
  )
}


export default ProfilePage;
