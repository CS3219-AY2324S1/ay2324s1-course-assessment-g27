import { Dialog, DialogTitle, DialogContent, Typography } from "@mui/material";
import { styled } from "@mui/material/styles";
import { Question } from "../../state/question";
import { Room } from "../../state/room";
import DOMPurify from "dompurify";
import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { State } from "../../state";
import { getQuestionById } from "../../api/questionAPI/getQuestion";
import { useTheme } from "@mui/material/styles";
import { Theme } from "@mui/system";
import AttemptPopup from "../qnsHistPage/AttemptPopup";

interface DisplayDescriptionPopupProps {
  open: boolean;
  onClose: () => void;
  question: Question;
}

interface DisplayDescriptionInRoomPopupProps {
  roomDetails: Room;
}

interface DisplayAttemptPopupProps {
  open: boolean;
  onClose: () => void;
  attempt: String;
}

const BootstrapDialog = styled(Dialog)(({ theme }) => ({
  "& .MuiDialogContent-root": {
    padding: theme.spacing(2),
  },
  "& .MuiDialogActions-root": {
    padding: theme.spacing(1),
  },
}));

export const DisplayDescription: React.FC<DisplayDescriptionPopupProps> = ({
  open,
  onClose,
  question,
}) => {
  return (
    <BootstrapDialog
      onClose={onClose}
      aria-labelledby="customized-dialog-title"
      open={open}
      fullWidth
    >
      <DialogTitle
        id="customized-dialog-title"
        color="primary"
        fontWeight="bold"
        fontSize="clamp(1rem, 1rem, 2rem)"
      >
        {question.title} Additional Information
      </DialogTitle>
      <DialogContent dividers>
        <Typography>
          <b>Description:</b>
        </Typography>
        <Typography
          gutterBottom
          dangerouslySetInnerHTML={{
            __html: DOMPurify.sanitize(question.description),
          }}
        ></Typography>
      </DialogContent>
      <DialogContent>{displayExamples(question)}</DialogContent>
      <DialogContent>
        <Typography>
          <b>Constraints:</b>
        </Typography>
        {displayConstraints(question)}
      </DialogContent>
    </BootstrapDialog>
  );
};

export const DisplayDescriptionInRoom: React.FC<
  DisplayDescriptionInRoomPopupProps
> = ({ roomDetails }) => {
  const NoQuestionSelected: Question = {
    _id: "",
    title: "",
    difficulty: "",
    description: "",
    examples: [],
    constraints: [],
    tags: "",
  };
  const [questionData, setQuestionData] =
    useState<Question>(NoQuestionSelected);
  const token = useSelector((state: State) => state.token);
  const theme: Theme = useTheme();

  useEffect(() => {
    async function getQuestionData(id: string) {
      try {
        const question = await getQuestionById(id, token);
        setQuestionData(question);
      } catch (err: any) {
        console.error(`Error fetching question in room: ${err.message}`);
      }
    }
    console.log("Room ID detail: " + roomDetails.question_id);
    getQuestionData(roomDetails.question_id);
  }, []);

  useEffect(() => {
    async function getQuestionData(id: string) {
      try {
        const question = await getQuestionById(id, token);
        setQuestionData(question);
      } catch (err: any) {
        console.error(`Error fetching question in room: ${err.message}`);
      }
    }
    console.log("Room ID detail: " + roomDetails.question_id);
    getQuestionData(roomDetails.question_id);
  }, [roomDetails]);

  const difficultiesColors:{[key: string]: string} = {
    Easy: '#186F65',
    Medium: '#FFC436',
    Hard: '#D80032',
  };

  return (
    <div
      className="questions-panel"
      style={{
        height: "80%",
        boxShadow: "0px 0px 5px " + theme.palette.primary.dark,
      }}
    >
      <h2 style={{ color: theme.palette.primary.main }}>
        {questionData.title}
      </h2>
      <Typography
        style={{ color: difficultiesColors[questionData.difficulty] }}
      >
        {questionData.difficulty}
      </Typography>
      <Typography style={{ color: theme.palette.primary.main }}>
        <b>Description:</b>
      </Typography>
      <Typography
        style={{ color: theme.palette.primary.main }}
        gutterBottom
        dangerouslySetInnerHTML={{
          __html: DOMPurify.sanitize(questionData.description),
        }}
      ></Typography>

      <div
        className="pre-background"
        style={{
          color: theme.palette.primary.main,
          backgroundColor: theme.palette.primary.darker,
        }}
      >
        {displayExamples(questionData)}
      </div>
      <div
        className="pre-background"
        style={{
          color: theme.palette.primary.main,
          backgroundColor: theme.palette.primary.darker,
        }}
      >
        {displayConstraints(questionData)}
      </div>
    </div>
  );
};

const displayExamples = (question: Question) => {
  const currExamplesInfo: any[] = [];
  for (var index in question.examples) {
    if (
      question.examples[index].inputText == "" &&
      question.examples[index].outputText == "" &&
      question.examples[index].explanation == "" &&
      question.examples[index].image == ""
    ) {
      continue;
    }
    currExamplesInfo.push(question.examples[index]);
  }

  if (currExamplesInfo.length == 0) {
    return (
      <div>
        {" "}
        <b>No Example Shown</b>
      </div>
    );
  }
  return currExamplesInfo.map((field, index) => (
    <div key={index}>
      {" "}
      {
        <div>
          <Typography>
            <b>Example {index + 1}:</b>
          </Typography>
          <DialogContent style={{ maxWidth: "100%", maxHeight: "100%" }}>
            {field.image && (
              <img
                style={{ width: "auto", height: "auto" }}
                src={field.image}
              />
            )}
            <Typography
              gutterBottom
              dangerouslySetInnerHTML={{
                __html: DOMPurify.sanitize("<b>Input: </b>" + field.inputText),
              }}
            ></Typography>
            <Typography
              gutterBottom
              dangerouslySetInnerHTML={{
                __html: DOMPurify.sanitize(
                  "<b>Output: </b>" + field.outputText
                ),
              }}
            ></Typography>
            <Typography
              gutterBottom
              dangerouslySetInnerHTML={{
                __html: DOMPurify.sanitize(
                  "<b>Explanation: </b>" + field.explanation
                ),
              }}
            ></Typography>
          </DialogContent>
        </div>
      }
    </div>
  ));
};

const displayConstraints = (question: Question) => {
  const currConstraintsInfo: any[] = [];
  for (var index in question.constraints) {
    if (question.constraints[index] != "") {
      currConstraintsInfo.push(question.constraints[index]);
    }
  }
  if (currConstraintsInfo.length == 0) {
    return <div>No Constraints</div>;
  }
  return currConstraintsInfo?.map((field, index) => (
    <div key={index}>
      <ul>
        <li
          dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(field) }}
        ></li>
      </ul>
    </div>
  ));
};

export const DisplayAttempt: React.FC<DisplayAttemptPopupProps> = ({
  open,
  onClose,
  attempt,
}) => {
  return (
    <BootstrapDialog
      onClose={onClose}
      aria-labelledby="customized-dialog-title"
      open={open}
      scroll="body"
      fullWidth
    >
      <DialogTitle
        id="customized-dialog-title"
        color="primary"
        fontWeight="bold"
        fontSize="clamp(1rem, 1rem, 2rem)"
      >
        Your Attempt
      </DialogTitle>
      <DialogContent>
        <AttemptPopup attempt={attempt}></AttemptPopup>
      </DialogContent>
    </BootstrapDialog>
  );
};
