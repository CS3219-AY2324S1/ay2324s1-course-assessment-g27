import "./DeleteUserPopup.css";
import { Dialog, DialogTitle, DialogContent, Button } from '@mui/material';
import '../../roomPage/confirmationPopup.css';

interface DeleteUserPopupProps {
    open: boolean;
    onClose: () => void;
    onConfirm: () => void;
  }

const DeleteUserPopup: React.FC<DeleteUserPopupProps> = ({ open, onClose, onConfirm }) => {
    return (
        <Dialog open={open} onClose={onClose} className="confirmation-dialog">
          <DialogTitle fontSize= "45px" className='title'>&#9888;</DialogTitle>
          <DialogContent className='content'>
            <div>Are you sure you want to delete your account? <br></br>(This action is irreversible) </div>
            <Button onClick={onConfirm} style={{fontSize: "30px", marginRight:"45px"}}>Yes</Button>
            <Button onClick={onClose} style={{fontSize: "30px", marginLeft:"45px"}}>No</Button>
          </DialogContent>
        </Dialog>
      );
  };

export default DeleteUserPopup;