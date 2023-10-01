import { EditOutlined, DeleteOutlined } from "@mui/icons-material";
import { InputBase, useTheme, Button, useMediaQuery } from "@mui/material";
import FlexBetween from "../../components/FlexBetween";
import WidgetWrapper from "../../components/WidgetWrapper";
import "./MyQuestionWidget.css";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { State, setQuestions } from "../../state";
import { Question } from "../../state/question";
import { Theme, style } from "@mui/system";
import { createQuestion } from "../../api/questionAPI/createQuestion";
import { getQuestionList } from "../../api/questionAPI/getQuestion";
import { deleteQuestionByID } from "../../api/questionAPI/deleteQuestion";
import { editQuestionById } from "../../api/questionAPI/editQuestion";
import DisplayDescription from "./DisplayDescriptionForm";
import EditQuestionPopup from "./EditQuestionPopup";

const MyQuestionWidget = () => {
  const dispatch = useDispatch();
  const [newData, setData] = useState<Partial<Question>>({
    title: "",
    difficulty: "",
    description: "",
    tags: [],
    examples: [],
    constraints: [],
  });

  const theme: Theme = useTheme();
  const user = useSelector((state: State) => state.user);
  console.log("user: ", user);
  const isAdmin = user.isadmin;
  console.log(isAdmin);
  const token = useSelector((state: State) => state.token);
  // const isNonMobileScreens = useMediaQuery("(min-width: 1000px)");
  // const mediumMain = theme.palette.neutral.mediumMain;
  // const medium = theme.palette.neutral.medium;

  const [questionData, setQuestionData] = useState<Question[]>([]);
  const [openEditPopup, setOpenEditPopup] = useState(false);
  const [openDescriptionPopup, setOpenDescriptionPopup] = useState(false);

  //for empty selected question state
  const NoQuestionSelected: Question = {
    _id: "",
    title: "",
    difficulty: "",
    description: "",
    examples: [],
    constraints: [],
    tags: [],
  };

  const [selectedQuestion, setSelectedQuestion] = useState(NoQuestionSelected);
  const handleQuestion = async () => {
    // Get back the .json file
    const questions = await createQuestion(newData, token);
    setQuestionData(questions);
    dispatch(setQuestions({ questions }));
    setData(NoQuestionSelected);
  };

  // Get the questions from DB
  useEffect(() => {
    async function getQuestions() {
      const questionList = await getQuestionList(token);
      setQuestionData(questionList);
    }
    getQuestions();
  }, []);

  //Delete the question
  const deleteQuestion = async (id: string) => {
    try {
      await deleteQuestionByID(id, token);
      const updatedQuestionData = questionData.filter(
        (question) => question._id !== id
      );
      setQuestionData(updatedQuestionData);
    } catch (err: any) {
      console.error(`Error deleting question: ${err.message}`);
    }
  };
  //Toggle popup window for description of the question
  const openDescriptionPopupWindow = (question: Question) => {
    setSelectedQuestion(question);
    setOpenDescriptionPopup(true);
  };

  //Toggle popup window for edit question
  const openEditPopupWindow = (question: Question) => {
    setSelectedQuestion(question);
    setOpenEditPopup(true);
  };
  // Edit a question
  const editQuestion = async (updatedData: Partial<Question>) => {
    if (selectedQuestion!) {
      try {
        const updatedQuestion = await editQuestionById(
          selectedQuestion._id,
          updatedData,
          token
        );
        setQuestionData(
          questionData.map((question) =>
            question._id === selectedQuestion._id ? updatedQuestion : question
          )
        );
        setQuestionData(await getQuestionList(token));
      } catch (err: any) {
        console.error(`Error editing question: ${err.message}`);
      }
    }
  };

  const InputBaseSxCSS = {
    width: "100%",
    backgroundColor: theme.palette.neutral.light,
    borderRadius: "2rem",
    padding: "1rem 2rem",
  };

  return (
    <WidgetWrapper sx={{ width: "100%" }}>
      {isAdmin && (
        <FlexBetween gap="1.5rem">
          <InputBase
            placeholder="Enter title"
            onChange={(e) => setData({ ...newData, title: e.target.value })}
            value={newData.title}
            sx={{
              ...InputBaseSxCSS,
            }}
          />
          <InputBase
            placeholder="Enter difficulty"
            onChange={(e) =>
              setData({ ...newData, difficulty: e.target.value })
            }
            value={newData.difficulty}
            sx={{
              ...InputBaseSxCSS,
            }}
          />
          <InputBase
            placeholder="Enter description"
            onChange={(e) =>
              setData({ ...newData, description: e.target.value })
            }
            value={newData.description}
            sx={{
              ...InputBaseSxCSS,
            }}
          />
          <InputBase
            placeholder="Enter tags"
            onChange={(e) => setData({ ...newData, tags: [e.target.value] })}
            value={newData.tags}
            sx={{
              ...InputBaseSxCSS,
            }}
          />
          <Button
            disabled={
              newData.title == "" ||
              newData.difficulty == "" ||
              newData.description == ""
            }
            onClick={handleQuestion}
            sx={{
              color: theme.palette.background.alt,
              backgroundColor: theme.palette.primary.main,
              borderRadius: "3rem",
            }}
          >
            Add
          </Button>
        </FlexBetween>
      )}
      <div>
        <div className="questionTable">
          <table className="questionTableList">
            <tr>
              <th>Title</th>
              <th>Difficulty</th>
              <th>Tags</th>
            </tr>
            {questionData.map((i) => {
              return (
                <tr>
                  <td onClick={() => openDescriptionPopupWindow(i)}>
                    {i.title}
                  </td>
                  <td>{i.difficulty}</td>
                  <td>{i.tags}</td>
                  {isAdmin && (
                    <>
                      <td style={{ padding: "0" }}>
                        <Button
                          style={{ padding: "0" }}
                          onClick={() => openEditPopupWindow(i)}
                        >
                          <EditOutlined />
                        </Button>
                      </td>
                      <td>
                        <Button
                          style={{ padding: "0" }}
                          onClick={() => deleteQuestion(i._id)}
                        >
                          <DeleteOutlined />
                        </Button>
                      </td>
                    </>
                  )}
                  <DisplayDescription
                    open={openDescriptionPopup}
                    onClose={() => {
                      setOpenDescriptionPopup(false);
                      setSelectedQuestion(NoQuestionSelected);
                    }}
                    question={selectedQuestion!}
                  />
                </tr>
              );
            })}
          </table>
        </div>
      </div>
      <div>
        <EditQuestionPopup
          open={openEditPopup}
          onClose={() => {
            setOpenEditPopup(false);
            setSelectedQuestion(NoQuestionSelected);
          }}
          question={selectedQuestion!}
          onSave={editQuestion}
        />
      </div>
    </WidgetWrapper>
  );
};

export default MyQuestionWidget;
