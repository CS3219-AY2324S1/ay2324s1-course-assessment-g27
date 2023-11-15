// ExecutionResultDiv.tsx
import React from "react";
import { Typography } from "@mui/material";

interface ExecutionResultDivProps {
  output: { cpuTime: string; output: string };
}

const ExecutionResultDiv: React.FC<ExecutionResultDivProps> = ({ output }) => {
  return (
    <div
      style={{
        width: "100%",
        height: "20%",
        overflowX: "hidden",
        overflowY: "auto",
      }}
    >
      <Typography fontWeight="bold" variant="h5">
        Output:
      </Typography>
      <Typography>{output.output}</Typography>
      <Typography fontWeight="bold" variant="h5">
        CPU Time:
      </Typography>
      <Typography>{output.cpuTime}</Typography>
    </div>
  );
};

export default ExecutionResultDiv;
