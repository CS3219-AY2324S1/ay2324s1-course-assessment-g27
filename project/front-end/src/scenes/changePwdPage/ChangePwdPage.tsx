import Navbar from "../navBar";
import PwdForm from "./PwdForm";
import "./ChangePwdPage.css";

const changePwdPage = () => {
  return (
    <div>
      <Navbar inRoomStatus={false} />
      <div className="changepwdpage">
        <div className="form">
          <PwdForm />
        </div>
      </div>
    </div>
  );
};

export default changePwdPage;
