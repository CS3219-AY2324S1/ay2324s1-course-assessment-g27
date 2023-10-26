import { useEffect, useState } from "react";
import {
  getAttemptList,
  getCompletedList,
} from "../../api/usersAPI/qnsHistAPI";
import { useSelector } from "react-redux";
import { State } from "../../state";
import { getSingleQuestion } from "../../api/questionAPI/getSingleQuestion";
import { Question, QuestionHistory } from "../../state/question";
import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline";
import NavBar from "../navBar";
import "../widgets/MyQuestionWidget.css";
import {DisplayDescription} from "../widgets/DisplayQuestionInformation";
import { Box, useTheme } from "@mui/material";
import { Theme } from "@mui/system";
import { PieChart } from "@mui/x-charts/PieChart";
import WidgetWrapper from "../../components/WidgetWrapper";

const convertDateTime = (date: string, time: string) => {
  const [day, month, year] = date.split("-").map(Number);
  const [hours, minutes, seconds] = time.split(":").map(Number);
  const myDate: Date = new Date(year, month - 1, day, hours, minutes, seconds);

  return myDate;
};

const countDifficulty = (questionData: QuestionHistory[]) => {
  return questionData.reduce((counts: { [key: string]: number }, question) => {
    const difficulty = question.difficulty;
    counts[difficulty] = (counts[difficulty] || 0) + 1;
    return counts;
  }, {} as { [key: string]: number });
};

const QnsHistPage = () => {
  const theme: Theme = useTheme();
  const user = useSelector((state: State) => state.user);
  const token = useSelector((state: State) => state.token);
  const [questionHistory, setQuestionHistory] = useState<QuestionHistory[]>([]);
  const [openDescriptionPopup, setOpenDescriptionPopup] = useState(false);

  //for empty selected question state
  const NoQuestionSelected: Question = {
    _id: "",
    title: "",
    difficulty: "",
    description: "",
    examples: [],
    constraints: [],
    tags: "",
  };

  const [selectedQuestion, setSelectedQuestion] = useState(NoQuestionSelected);

  // Get the questions from DB
  useEffect(() => {
    async function getQuestionHistory() {
      const attemptedQns = await getAttemptList(user.id, token);
      const completedQns = await getCompletedList(user.id, token);

      const attemptedQuestionsData = await Promise.all(
        attemptedQns.map(async (attempted: any) => {
          const qnData = await getSingleQuestion(token, attempted.qid);
          if (qnData) {
            const date = convertDateTime(attempted.date, attempted.time);
            return { ...qnData, date, isCompleted: false };
          }
          return null;
        })
      );

      const completedQuestionsData = await Promise.all(
        completedQns.map(async (completed: any) => {
          const qnData = await getSingleQuestion(token, completed.qid);
          if (qnData) {
            const date = convertDateTime(completed.date, completed.time);
            return { ...qnData, date, isCompleted: true };
          }
          return null;
        })
      );

      const updatedQuestionHistory = [
        ...attemptedQuestionsData.filter((item) => item !== null),
        ...completedQuestionsData.filter((item) => item !== null),
      ];
      updatedQuestionHistory.sort(
        (i, j) => i.date.getTime() - j.date.getTime()
      );
      setQuestionHistory(updatedQuestionHistory);
    }

    getQuestionHistory();
  }, []);

  //Toggle popup window for description of the question
  const openDescriptionPopupWindow = (question: QuestionHistory) => {
    setSelectedQuestion(question);
    setOpenDescriptionPopup(true);
  };

  const difficultyCounts = countDifficulty(questionHistory);

  return (
    <>
      <NavBar />
      <Box
        sx={
          questionHistory.length > 1
            ? {
                display: "grid",
                gridTemplateColumns: "1fr 3fr",
              }
            : {}
        }
      >
        {questionHistory.length > 1 && (
          <WidgetWrapper
            sx={{
              m: "1rem",
            }}
          >
            <PieChart
              series={[
                {
                  data: [
                    { id: 0, value: difficultyCounts["Easy"], label: "Easy" },
                    {
                      id: 1,
                      value: difficultyCounts["Medium"],
                      label: "Medium",
                    },
                    { id: 2, value: difficultyCounts["Hard"], label: "Hard" },
                  ],
                },
              ]}
              slotProps={{ legend: { hidden: true } }}
            />
          </WidgetWrapper>
        )}

        <Box
          sx={{
            m: "20px",
            p: "1rem",
            borderRadius: "24px",
            backgroundColor: theme.palette.background.alt,
          }}
        >
          <div>
            <div className="questionTable">
              <table className="questionTableList">
                <thead>
                  <tr>
                    <th></th>
                    <th>Title</th>
                    <th>Difficulty</th>
                    <th>Tags</th>
                    <th>Date Attempted</th>
                  </tr>
                </thead>
                {questionHistory.map((i) => {
                  if (!i.title) return; // when question has been removed by admin

                  return (
                    <tbody>
                      <tr>
                        <td>{i.isCompleted && <CheckCircleOutlineIcon />}</td>
                        <td onClick={() => openDescriptionPopupWindow(i)}>
                          <div className="tooltip">
                            {i.title}
                            <span className="tooltiptext">
                              Click to see more information
                            </span>
                          </div>
                        </td>
                        <td>{i.difficulty}</td>
                        <td>{i.tags}</td>
                        <td>{i.date.toLocaleDateString()}</td>
                        <DisplayDescription
                          open={openDescriptionPopup}
                          onClose={() => {
                            setOpenDescriptionPopup(false);
                            setSelectedQuestion(NoQuestionSelected);
                          }}
                          question={selectedQuestion!}
                        />
                      </tr>
                    </tbody>
                  );
                })}
              </table>
            </div>
          </div>
        </Box>
      </Box>
    </>
  );
};

export default QnsHistPage;
