import "./DeleteUserPopup.css";
import { deleteUserById } from "../../../api/usersAPI/Auth/deleteUserById";
import { useDispatch, useSelector } from "react-redux";
import { State, setLogout } from "../../../state";
import { useNavigate } from "react-router-dom";

const DeleteUserPopup = ({ closePopup }) => {
  const user = useSelector((state: State) => state.user);
  const id = user.id;
  const token = useSelector((state: State) => state.token);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleDeleteUser = async () => {
    try {
      await deleteUserById(token, id);
      navigate("/");
      dispatch(setLogout());
    } catch (error: any) {
      console.log(error.message);
    }
  };

  return (
    <div className="popup-container">
      <div className="popup-body">
        <h1 className="mainheader">Delete Account?</h1>
        <div className="warning">Warning: this action is irreversible.</div>
        <div className="warning">
          Are you sure you want to delete your account?
        </div>
        <button className="back" onClick={closePopup}>
          Back
        </button>
        <button className="confirm" onClick={handleDeleteUser}>
          Confirm
        </button>
      </div>
    </div>
  );
};

export default DeleteUserPopup;
