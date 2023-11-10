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
import RadioButtonUncheckedIcon from "@mui/icons-material/RadioButtonUnchecked";
import NavBar from "../navBar";
import "../widgets/MyQuestionWidget.css";
import { DisplayDescription } from "../widgets/DisplayQuestionInformation";
import {
  Box,
  Button,
  Typography,
  useTheme,
  useMediaQuery,
} from "@mui/material";
import { Theme } from "@mui/system";
import { PieChart } from "@mui/x-charts/PieChart";
import WidgetWrapper from "../../components/WidgetWrapper";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import Tooltip from "@mui/material/Tooltip";

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
  const primaryLight = theme.palette.primary.light;
  const primaryDark = theme.palette.primary.dark;
  const DisplayTextCSS = {
    backgroundImage:
      theme.palette.mode === "dark"
        ? `linear-gradient(45deg, ${primaryLight}, #fa57e2)`
        : `linear-gradient(45deg, ${primaryDark}, #5d00fc)`,
    backgroundClip: "text",
    WebkitTextFillColor: "transparent",
    mb: "1.5rem",
  };
  const isNonMobileScreens = useMediaQuery("(min-width:1000px)");
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

  const columns: GridColDef[] = [
    {
      field: "title",
      headerName: "Title",
      hideable: false,
      width: 250,
      renderCell: (params) => {
        return (
          <Tooltip title="Click to see more information" placement="bottom">
            <Button sx={{ textTransform: "none" }}>{params.row.title}</Button>
          </Tooltip>
        );
      },
    },
    {
      field: "difficulty",
      headerName: "Difficulty",
      hideable: false,
      width: 120,
    },
    { field: "tags", headerName: "Tags", hideable: false, width: 120 },
    {
      field: "date",
      headerName: "Attempted Date",
      hideable: false,
      width: 200,
      valueFormatter: (params) => {
        return new Date(params.value).toLocaleDateString("en-GB", {
          year: "numeric",
          month: "long",
          day: "numeric",
        });
      },
    },
    {
      field: "completed",
      headerName: "Completed?",
      sortable: false,
      hideable: false,
      disableColumnMenu: true,
      width: 100,
      renderCell: (params) => {
        return params.row.isCompleted ? (
          <CheckCircleOutlineIcon />
        ) : (
          <RadioButtonUncheckedIcon />
        );
      },
    },
  ];

  const handleOnCellClick = (param: any) => {
    if (param.field === "title") {
      openDescriptionPopupWindow(param.row);
    }
  };

  const difficultyCounts = countDifficulty(questionHistory);

  if (questionHistory.length == 0) {
    return (
      <>
        <NavBar />
        <Box
          width="100%"
          padding="2rem 6%"
          display={isNonMobileScreens ? "flex" : "block"}
          gap="0.5rem"
          justifyContent="space-between"
          flexDirection="column"
          alignItems="center"
          textAlign="center"
        >
          <Typography
            fontWeight="bold"
            variant="h5"
            fontSize={"25px"}
            fontFamily={"Trebuchet MS"}
            sx={{ ...DisplayTextCSS }}
          >
            Track your learning progress by matching with a peer and attempting
            a question today!
          </Typography>
        </Box>
      </>
    );
  }

  return (
    <>
      <NavBar />
      <Box
        sx={
          Object.keys(difficultyCounts).length > 1
            ? {
                display: "grid",
                gridTemplateColumns: "1fr 3fr",
                m: "1rem",
              }
            : { m: "1rem" }
        }
      >
        {Object.keys(difficultyCounts).length > 1 && (
          <WidgetWrapper
            sx={{
              m: "1rem",
            }}
          >
            <PieChart
              series={[
                {
                  data: [
                    {
                      id: 0,
                      value: difficultyCounts["Easy"],
                      label: "Easy",
                      color: "#20df80",
                    },
                    {
                      id: 1,
                      value: difficultyCounts["Medium"],
                      label: "Medium",
                      color: "#f7b604fb",
                    },
                    {
                      id: 2,
                      value: difficultyCounts["Hard"],
                      label: "Hard",
                      color: "#f61602",
                    },
                  ],
                },
              ]}
              slotProps={{ legend: { hidden: true } }}
            />
          </WidgetWrapper>
        )}
        <WidgetWrapper sx={{ width: "100%" }}>
          <div>
            <div className="questionTable">
              <DataGrid
                rows={questionHistory}
                columns={columns}
                getRowId={(row: any) =>
                  row.title + row.difficulty + row.tags + row.date
                }
                onCellClick={handleOnCellClick}
                initialState={{
                  pagination: {
                    paginationModel: { page: 0, pageSize: 10 },
                  },
                }}
                pageSizeOptions={[10, 20]}
              />
            </div>
          </div>
          <DisplayDescription
            open={openDescriptionPopup}
            onClose={() => {
              setOpenDescriptionPopup(false);
              setSelectedQuestion(NoQuestionSelected);
            }}
            question={selectedQuestion!}
          />
        </WidgetWrapper>
      </Box>
    </>
  );
};

export default QnsHistPage;
