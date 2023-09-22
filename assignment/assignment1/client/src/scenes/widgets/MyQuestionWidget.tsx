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
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { State, setQuestions } from "../../state";
import { Theme } from "@mui/system";
import { PORT } from "../../constants/constants";

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

    const response = await fetch(`http://localhost:${PORT}/questions`, {
      method: "POST",
      headers: { Authorization: `Bearer ${token}` },
      body: formData,
    });
    const questions = await response.json();
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
          placeholder="Enter description"
          onChange={(e) => setTitle(e.target.value)}
          value={title}
          sx={{
            width: "100%",
            backgroundColor: theme.palette.neutral.light,
            borderRadius: "2rem",
            padding: "1rem 2rem",
          }}
        />
      </FlexBetween>
    </WidgetWrapper>
  );
};

export default MyQuestionWidget;
