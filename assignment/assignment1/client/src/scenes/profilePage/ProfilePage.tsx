import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import Navbar from "../navBar"; 
import { State } from "../../state";
import { User } from "../../state/user";
import UserLeftBar from "../profilePage/components/UserLeftBar";
import UserMainBar from "../profilePage/components/UserMainBar";
import Account from "../profilePage/components/Account";
import BasicInfo from "./components/BasicInfo";
import { getUserById } from "../../api/usersAPI/getUserById";

import "./ProfilePage.css";

const ProfilePage = () => {
  //1. get username (from navbar)
  //2. find username in db and return values
  //3. ??
  //4. Profit
  const user = useSelector((state: State) => state.user);
  const token = useSelector((state: State) => state.token);
  const id = user.id;
  const {activePage} = useParams();
  const currPage: String = activePage ? activePage : '';
  
  useEffect(() => {
    async function getUser() {
        const user = await getUserById(token, id);
        //setUserData(user[0]);
        console.log('user in profile effect: ', user);
    }
    getUser();
    }, [])

  return (
    <div className="userprofile">
      <Navbar />
        <div className="userinfo">
          <div className="leftbar">
            <UserLeftBar activePage={currPage}/> 
          </div>
          <div className="mainbar">
            {activePage === 'info' && <BasicInfo username={user.username} id={id} />}
            {activePage === `account` && <Account/>}
          </div>
        </div>
    </div>
  )
}


export default ProfilePage;
