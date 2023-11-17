import Navbar from "../navBar";
import PwdForm from "./PwdForm";
import "./changePwdPage.css"

const changePwdPage = () => {
    return (
      <div>
        <Navbar />
        <div className="changepwdpage">
          <div className="form">
              <PwdForm />
          </div>
        </div>
      </div>
    )
  }
  
  
  export default changePwdPage;
  