import { useEffect, useState } from "react";
import {
  getAttemptList,
} from "../../api/usersAPI/qnsHistAPI";
import { useSelector } from "react-redux";
import { State } from "../../state";
import { getSingleQuestion } from "../../api/questionAPI/getSingleQuestion";
import { QuestionHistory } from "../../state/question";
import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline";
import RadioButtonUncheckedIcon from "@mui/icons-material/RadioButtonUnchecked";
import NavBar from "../navBar";
import "../widgets/MyQuestionWidget.css";
import { DisplayDescription, DisplayAttempt } from "../widgets/DisplayQuestionInformation";
import {
  Box,
  Button,
  Typography,
  useTheme,
  useMediaQuery,
  Chip,
} from "@mui/material";
import { Stack, Theme } from "@mui/system";
import { PieChart } from "@mui/x-charts/PieChart";
import WidgetWrapper from "../../components/WidgetWrapper";
import { DataGrid, GridCellParams, GridColDef, GridFilterItem, getGridSingleSelectOperators } from "@mui/x-data-grid";
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
  const [openAttemptPopup, setOpenAttemptPopup] = useState(false);

  const [tags, setTags] = useState<string[]>([]);
  const [difficulties, setDifficulties] = useState<string[]>([]);


  //for empty selected question state
  const NoQuestionSelected: QuestionHistory = {
    _id: "",
    title: "",
    difficulty: "",
    description: "",
    examples: [],
    constraints: [],
    tags: "",
    date: new Date(),
    attempt: "",
    isCompleted: false
  };

  const [selectedQuestion, setSelectedQuestion] = useState(NoQuestionSelected);

  // Get the questions from DB
  useEffect(() => {
    async function getQuestionHistory() {
      const attemptedQns = await getAttemptList(user.id, token);

      const attemptedQuestionsData = await Promise.all(
        attemptedQns.map(async (attempted: any) => {
          const qnData = await getSingleQuestion(token, attempted.qid);
          if (qnData) {
            const date = convertDateTime(attempted.date, attempted.time);
            const attempt = attempted.attempt;
            const isCompleted = attempted.iscompleted;
            return { ...qnData, date, attempt, isCompleted };
          }
          return null;
        })
      );

      const updatedQuestionHistory = [
        ...attemptedQuestionsData.filter((item) => item !== null),
      ];
      updatedQuestionHistory.sort(
        (i, j) => i.date.getTime() - j.date.getTime()
      );
      setQuestionHistory(updatedQuestionHistory);
      const diff1: string[] = updatedQuestionHistory.map((question: QuestionHistory) => question.difficulty);
      const diff: string[] = [...new Set(diff1)];
      setDifficulties(diff);
      const tagArray: string[][] = updatedQuestionHistory.map((question: QuestionHistory) => question.tags.split(', '));
      const tag: string[] = [...new Set(tagArray.flat())];
      setTags(tag);
    }
    getQuestionHistory();
  }, []);

  //Toggle popup window for description of the question
  const openDescriptionPopupWindow = (question: QuestionHistory) => {
    setSelectedQuestion(question);
    setOpenDescriptionPopup(true);
  };

  const openAttemptPopupWindow = (question: QuestionHistory) => {
    setSelectedQuestion(question);
    setOpenAttemptPopup(true);
  };

  //credits to https://stackoverflow.com/questions/73942398/how-to-enable-filtering-and-sorting-for-a-multi-value-array-column-using-muis-d
  const tagsFilterOperators = getGridSingleSelectOperators()
  .filter((operator) => operator.value === "isAnyOf")
  .map((operator) => {
    const newOperator = { ...operator }
    const newGetApplyFilterFn = (filterItem: GridFilterItem, column: GridColDef) => {
      return (params: GridCellParams): boolean => {
        let isOk = true
        filterItem?.value?.forEach((fv: any) => {
          isOk = isOk && params.value.includes(fv)
        })
        return isOk
      }
    }
    newOperator.getApplyFilterFn = newGetApplyFilterFn
    return newOperator
  });

  const columns: GridColDef[] = [
    {
      field: "title",
      headerName: "Title",
      hideable: false,
      width: 300,
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
      type:"singleSelect", 
      valueOptions: difficulties
    },
    { 
      field: "tags", 
      headerName: "Tags", 
      hideable: false, 
      width: 120, 
      type:"singleSelect", 
      valueOptions: tags,
      renderCell: (params) => (
        <Stack direction="row" spacing={0.25}>
          {params.row.tags.split(', ').map((tag: string) => (
            <Chip label={tag} />
          ))}
        </Stack>
      ),
      filterOperators: tagsFilterOperators
    },
    {
      field: "date",
      headerName: "Past Attempts",
      hideable: false,
      width: 200,
      filterable: false,
      renderCell: (params) => {
        return (
          <Tooltip title="Click to see your attempt" placement="bottom">
            <Button sx={{ textTransform: "none" }}>
              {
                new Date(params.value).toLocaleDateString("en-GB", {
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                })
              }
            </Button>
          </Tooltip>
        );
      },
    },
    {
      field: "completed",
      headerName: "Completed?",
      sortable: false,
      hideable: false,
      width: 100,
      type: 'boolean',
      disableColumnMenu: true,
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
    } else if (param.field === "date") {
      openAttemptPopupWindow(param.row);
    }
  };

  const difficultyCounts = countDifficulty(questionHistory);

  if (questionHistory.length == 0) {
    return (
      <>
        <NavBar inRoomStatus={false} />
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
      <NavBar inRoomStatus={false} />
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
              <DataGrid disableColumnSelector
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
          <DisplayAttempt
            open={openAttemptPopup}
            onClose={() => {
              setOpenAttemptPopup(false);
              setSelectedQuestion(NoQuestionSelected);
            }}
            attempt={selectedQuestion!.attempt}
          />
        </WidgetWrapper>
      </Box>
    </>
  );
};

export default QnsHistPage;
