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
          console.log("attempted ", attempted);
          const date = convertDateTime(attempted.date, attempted.time);
          return { ...qnData, date, isCompleted: false };
        })
      );

      const completedQuestionsData = await Promise.all(
        completedQns.map(async (completed: any) => {
          const qnData = await getSingleQuestion(token, completed.qid);
          const date = convertDateTime(completed.date, completed.time);
          return { ...qnData, date, isCompleted: true };
        })
      );

      const updatedQuestionHistory = [
        ...attemptedQuestionsData,
        ...completedQuestionsData,
      ];
      setQuestionHistory(updatedQuestionHistory);
    }

    getQuestionHistory();
    questionHistory.sort((i, j) => i.date.getTime() - j.date.getTime());
  }, []);

  //Toggle popup window for description of the question
  const openDescriptionPopupWindow = (question: QuestionHistory) => {
    setSelectedQuestion(question);
    setOpenDescriptionPopup(true);
  };

  console.log("questionData ", questionHistory);
  const difficultyCounts = countDifficulty(questionHistory);

  return (
    <>
      <NavBar />
      <Box
        sx={{
          display: "grid",
          gridTemplateColumns: "1fr 3fr",
        }}
      >
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
                  { id: 1, value: difficultyCounts["Medium"], label: "Medium" },
                  { id: 2, value: difficultyCounts["Hard"], label: "Hard" },
                ],
              },
            ]}
          />
        </WidgetWrapper>
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

  // interface resultProps {
  //   id: Number;
  //   date: String;
  //   time: String;
  //   question: Question;
  // }
  // const userId = useSelector((state: State) => state.user.id);
  // const token = useSelector((state: State) => state.token);
  // let attemptList: resultProps[] = [];
  // let completedList: resultProps[] = [];
  // const dates: string[] = [];
  // const dummy = [1, 2, 3, 4];

  // async function fetchQns(qid: String) {
  //   return await getSingleQuestion(token, qid);
  // }

  // useEffect(() => {
  //   async function getList() {
  //     const attempts = await getAttemptList(userId, token);
  //     const attemptedQns = await Promise.all(
  //       attempts.map(async (item) => {
  //         const question = await fetchQns(item.qid);
  //         return {
  //           id: item.id,
  //           date: item.date,
  //           time: item.time,
  //           question: question,
  //         };
  //       })
  //     );
  //     attemptedQns.map((item) => dates.push(item.date));
  //     console.log(dates);
  //     const completed = await getCompletedList(userId, token);
  //     const completedQns = await Promise.all(
  //       completed.map(async (item) => {
  //         const question = await fetchQns(item.qid);
  //         return {
  //           id: item.id,
  //           date: item.date,
  //           time: item.time,
  //           question: question,
  //         };
  //       })
  //     );
  //     attemptList = attemptedQns;
  //     completedList = completedQns;
  //     console.log(attemptList[0].date);
  //     console.log(completedList);
  //   }
  //   getList();
  // }, []);

  // return (
  //   <>
  //     <ul>
  //       {dates.map((item, index) => (
  //         <li key={index}>
  //           {/* this part doesnt show up idk why */}
  //           {/* question = {item.question.title}, date = {item.date}, time = {item.time}  */}
  //           {item}
  //         </li>
  //       ))}
  //     </ul>
  //   </>
  // );
};

export default QnsHistPage;
