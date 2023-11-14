import React from 'react';
import { Dialog, DialogTitle, DialogContent, Button } from '@mui/material';
import './confirmationPopup.css';


interface NextQnsPopupProps {
  open: boolean;
  onClose: () => void;
  onConfirm: () => void;
}

const NextQnsPopup: React.FC<NextQnsPopupProps> = ({ open, onClose, onConfirm }) => {
  return (
    <Dialog open={open} onClose={onClose} className="confirmation-dialog">
      <DialogTitle fontSize= "45px" className='title'>&#9888;</DialogTitle>
      <DialogContent className='content'>
        <div>Finish this question proceed to the next question?</div>
        <Button onClick={onConfirm} style={{fontSize: "30px", marginRight:"45px"}}>Yes</Button>
        <Button onClick={onClose} style={{fontSize: "30px", marginLeft:"45px"}}>No</Button>
      </DialogContent>
    </Dialog>
  );
};

export default NextQnsPopup;