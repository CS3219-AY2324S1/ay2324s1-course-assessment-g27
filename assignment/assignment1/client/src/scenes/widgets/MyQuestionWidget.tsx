import {
  EditOutlined,
  DeleteOutlined,
} from "@mui/icons-material";
import {
  InputBase,
  useTheme,
  Button,
  useMediaQuery,
} from "@mui/material";
import FlexBetween from "../../components/FlexBetween";
import WidgetWrapper from "../../components/WidgetWrapper";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { State, setQuestions } from "../../state";
import { Question } from "../../state/question";
import { Theme } from "@mui/system";
import { createQuestion } from "../../api/questionAPI/createQuestion";
import { getQuestionList } from "../../api/questionAPI/getQuestion";
import { deleteQuestionByID } from "../../api/questionAPI/deleteQuestion";
import { editQuestionById } from "../../api/questionAPI/editQuestion";
import EditQuestionPopup from "./editQuestionPopup";

const MyQuestionWidget = () => {
  const dispatch = useDispatch();
  const [title, setTitle] = useState("");
  const [difficulty, setDifficulty] = useState("");
  const [description, setDescription] = useState("");
  const [examples, setExamples] = useState([]);
  const [constraints, setConstraints] = useState([]);
  const [tags, setTags] = useState([]);
  const theme: Theme = useTheme();
  const { _id } = useSelector((state: State) => state.user);
  const token = useSelector((state: State) => state.token);
  const isNonMobileScreens = useMediaQuery("(min-width: 1000px)");
  const mediumMain = theme.palette.neutral.mediumMain;
  const medium = theme.palette.neutral.medium;

  const[questionData, setQuestionData] = useState<Question[]>([]);
  const [openEditPopup, setOpenEditPopup] = useState(false);

  //for empty selected question state
  const NoQuestionSelected: Question = {
    _id: "",
    title: "",
    difficulty: "",
    description: "",
    examples: [],
    constraints: [],
    tags: []
  };

  const [selectedQuestion, setSelectedQuestion] = useState(NoQuestionSelected);

  
  const handleQuestion = async () => {
    const formData = new FormData();
    formData.append("title", title);
    formData.append("difficulty", difficulty);
    formData.append("description", description);
    for (let i = 0; i < examples.length; i++) {
      formData.append("examples[]", examples[i]);
    }
    for (let i = 0; i < constraints.length; i++) {
      formData.append("constraints[]", constraints[i]);
    }
    for (let i = 0; i < tags.length; i++) {
      formData.append("tags[]", tags[i]);
    }
    // Get back the .json file
    const questions = await createQuestion(formData, token);
    setQuestionData(questions);
    dispatch(setQuestions({ questions }));
    setTitle("");
    setDifficulty("");
    setDescription("");
    setExamples([]);
    setConstraints([]);
    setTags([]);
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
  const deleteQuestion = async (id : any) => {
    try {
      await deleteQuestionByID(id, token);
        const updatedQuestionData = questionData.filter(question => question._id !== id);
      setQuestionData(updatedQuestionData);
  
    } catch (err:any) {
      console.error(`Error deleting question: ${err.message}`);
    }
  }

  //Toggle popup window for edit question
  const openEditPopupWindow = (question: Question) => {
    setSelectedQuestion(question);
    setOpenEditPopup(true);
  };
  // Edit a question
  const editQuestion = async (updatedData: Partial<Question>) => {
    if (selectedQuestion!) {
      try {
        const updatedQuestion = await editQuestionById(selectedQuestion._id, updatedData, token);
        setQuestionData(questionData.map((question) =>
          question._id === selectedQuestion._id ? updatedQuestion : question));
        setQuestionData(await getQuestionList(token));
      } catch (err:any) {
        console.error(`Error editing question: ${err.message}`);
      }
    }
  };

  return (
    <WidgetWrapper sx={{width:"100%"}}>
      <FlexBetween gap="1.5rem">
        <InputBase
          placeholder="Enter title"
          onChange={(e) => setTitle(e.target.value)}
          value={title}
          sx={{
            width: "100%",
            backgroundColor: theme.palette.neutral.light,
            borderRadius: "2rem",
            padding: "1rem 2rem",
          }}
        />
        <InputBase
          placeholder="Enter difficulty"
          onChange={(e) => setDifficulty(e.target.value)}
          value={difficulty}
          sx={{
            width: "100%",
            backgroundColor: theme.palette.neutral.light,
            borderRadius: "2rem",
            padding: "1rem 2rem",
          }}
        />
        <InputBase
          placeholder="Enter description"
          onChange={(e) => setDescription(e.target.value)}
          value={description}
          sx={{
            width: "100%",
            backgroundColor: theme.palette.neutral.light,
            borderRadius: "2rem",
            padding: "1rem 2rem",
          }}
        />
        {/* <InputBase
          placeholder="Enter example"
          onChange={(e) => setExamples(e.target.value)}
          value={examples}
          sx={{
            width: "100%",
            backgroundColor: theme.palette.neutral.light,
            borderRadius: "2rem",
            padding: "1rem 2rem",
          }}
        /> */}
        <Button
          disabled={!title && !difficulty && ! description}
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
      <div>
      <div style={{width:"auto"}}>
        <table style={{width:"100%"}}>
          <tr>
            <th>Name</th>
            <th>Difficulty</th>
            <th>Description</th>
          </tr>
          {questionData.map(i => {
            return(
              <tr>
                <td>{i.title}</td>
                <td>{i.difficulty}</td>
                <td>{i.description}</td>
                <td style={{padding:"0"}}> <Button style={{padding:"0"}} onClick={() => openEditPopupWindow(i)}>
                <EditOutlined /></Button></td>
                <td ><Button style={{padding:"0"}} onClick={() => deleteQuestion(i._id)}>
                <DeleteOutlined />
              </Button></td>
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


export default  MyQuestionWidget;
