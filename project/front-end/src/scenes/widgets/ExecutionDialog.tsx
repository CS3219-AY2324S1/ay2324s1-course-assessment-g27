// ExecutionDialog.tsx
import React from "react";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogActions from "@mui/material/DialogActions";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";
import { DialogContent, Typography, Box } from "@mui/material";
import Grid from "@mui/material/Grid";

interface ExecutionDialogProps {
  open: boolean;
  onClose: () => void;
  output: { cpuTime: string; output: string };
}

const ExecutionDialog: React.FC<ExecutionDialogProps> = ({
  open,
  onClose,
  output,
}) => {
  return (
    <Dialog open={open}>
      <Grid container alignItems="center" justifyContent="space-between">
        <Grid item>
          <DialogTitle
            sx={{ mlr: "1rem", p: 2, fontWeight: "bold", fontSize: "25px" }}
          >
            Code Execution
          </DialogTitle>
        </Grid>

        <Grid item>
          <IconButton
            aria-label="close"
            onClick={onClose}
            sx={{
              color: "primary",
            }}
          >
            <CloseIcon />
          </IconButton>
        </Grid>
      </Grid>
      {/* Display the output */}
      <DialogContent dividers>
        <Typography fontWeight="bold" variant="h5">
          Output:
        </Typography>
        <Typography>{output.output}</Typography>
        <Typography fontWeight="bold" variant="h5">
          CPU Time:
        </Typography>
        <Typography>{output.cpuTime}</Typography>
      </DialogContent>
    </Dialog>
  );
};

export default ExecutionDialog;
