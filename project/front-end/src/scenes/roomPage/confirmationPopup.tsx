import React from 'react';
import { Dialog, DialogTitle, DialogContent, Button } from '@mui/material';
import './confirmationPopup.css';


interface ConfirmationPopupProps {
  open: boolean;
  onClose: () => void;
  onConfirm: () => void;
}

const ConfirmationPopup: React.FC<ConfirmationPopupProps> = ({ open, onClose, onConfirm }) => {
  return (
    <Dialog open={open} onClose={onClose} className="confirmation-dialog">
      <DialogTitle fontSize= "45px" className='title'>&#9888;</DialogTitle>
      <DialogContent className='content'>
        <div>Are you sure you want to close this room? <br></br>(Room will be deleted) </div>
        <Button onClick={onConfirm} style={{fontSize: "30px", marginRight:"45px"}}>Yes</Button>
        <Button onClick={onClose} style={{fontSize: "30px", marginLeft:"45px"}}>No</Button>
      </DialogContent>
    </Dialog>
  );
};

export default ConfirmationPopup;
