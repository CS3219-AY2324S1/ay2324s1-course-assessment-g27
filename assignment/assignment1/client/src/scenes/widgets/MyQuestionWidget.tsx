import {
  EditOutlined,
  DeleteOutlined,
  AttachFileOutlined,
  GifBoxOutlined,
  ImageOutlined,
  MicOutlined,
  MoreHorizOutlined,
} from "@mui/icons-material";
import {
  Box,
  Divider,
  Typography,
  InputBase,
  useTheme,
  Button,
  IconButton,
  useMediaQuery,
} from "@mui/material";
import FlexBetween from "../../components/FlexBetween";
import WidgetWrapper from "../../components/WidgetWrapper";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { State, setQuestions } from "../../state";
import { Question } from "../../state/question";
import { Theme } from "@mui/system";
import { PORT } from "../../constants/constants";
import { createQuestion } from "../../api/questionAPI/createQuestion";
import { getQuestionList } from "../../api/questionAPI/getQuestion";
import { API_URL } from "../../api/config";

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

    dispatch(setQuestions({ questions }));
    setTitle("");
    setDifficulty("");
    setDescription("");
    setExamples([]);
    setConstraints([]);
    setTags([]);
  };

  return (
    <WidgetWrapper>
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
    </WidgetWrapper>
  );
};

const DisplayQuestionsTableWidget = () => {
  const dispatch = useDispatch();
  const theme: Theme = useTheme();
  const { _id } = useSelector((state: State) => state.user);
  const token = useSelector((state: State) => state.token);
  const isNonMobileScreens = useMediaQuery("(min-width: 1000px)");
  const mediumMain = theme.palette.neutral.mediumMain;
  const medium = theme.palette.neutral.medium;

  const[data, setData] = useState<Question[]>([]);
  useEffect(() => {
    async function getQuestions() {
      const questionList = await getQuestionList(token);
      setData(questionList);
    }
    getQuestions();
  }, []);

  return (
    <div>
      <div style={{width:"auto"}}>
        <table style={{width: 500}}>
          <tr>
            <th>Name</th>
            <th>Diffculties</th>
            <th>Description</th>
          </tr>
          {data.map(i => {
            return(
              <tr>
                <td>{i.title}</td>
                <td>{i.difficulty}</td>
                <td>{i.description}</td>
              </tr>
            );
          })}
        </table>

      </div>
    </div>
  );
};

export  {MyQuestionWidget, DisplayQuestionsTableWidget};
