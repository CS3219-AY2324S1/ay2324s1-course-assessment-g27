import { EditOutlined, DeleteOutlined } from "@mui/icons-material";
import { useTheme, Button, Chip } from "@mui/material";
import WidgetWrapper from "../../components/WidgetWrapper";
import "./MyQuestionWidget.css";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { State } from "../../state";
import { Question } from "../../state/question";
import { Stack, Theme } from "@mui/system";
import { createQuestion } from "../../api/questionAPI/createQuestion";
import { getQuestionList } from "../../api/questionAPI/getQuestion";
import { deleteQuestionByID } from "../../api/questionAPI/deleteQuestion";
import { editQuestionById } from "../../api/questionAPI/editQuestion";
import {DisplayDescription} from "./DisplayQuestionInformation"
import EditQuestionPopup from "./editQuestionPopup";
import AddQuestionFormPopup from "./AddQuestionForm";
import { DataGrid, GridCellParams, GridColDef, GridFilterItem, getGridSingleSelectOperators} from '@mui/x-data-grid';
import Tooltip from '@mui/material/Tooltip';


const MyQuestionWidget = () => {
  const theme: Theme = useTheme();
  const user = useSelector((state: State) => state.user);
  const isAdmin = user.isAdmin;
  const token = useSelector((state: State) => state.token);

  const[questionData, setQuestionData] = useState<Question[]>([]);
  const [openAddFormPopup, setOpenAddFormPopup] = useState(false);
  const [openEditPopup, setOpenEditPopup] = useState(false);
  const [openDescriptionPopup, setOpenDescriptionPopup] = useState(false);

  const [tags, setTags] = useState<string[]>([]);
  const [difficulties, setDifficulties] = useState<string[]>([]);

  //for empty selected question state
  const NoQuestionSelected: Question = {
    _id: "",
    title: "",
    difficulty: "",
    description: "",
    examples: [],
    constraints: [],
    tags: ""
  };

  const [selectedQuestion, setSelectedQuestion] = useState(NoQuestionSelected);  
  let errorMsg:string = "";
  
  const addQuestion = async (newData: Partial<Question>) => {
    // Get back response status
    const questionsRes = await createQuestion(newData, token);
    // Get back the .json file
    const json = await questionsRes.json();
    if(!questionsRes.ok) {
      errorMsg = json.message;
    } else {
      errorMsg="";
      setQuestionData(json);
      // dispatch(setQuestions({ questions }));
    }
  };

  const getErrorMessages = async () => {
    return errorMsg;
  }

  // Get the questions from DB
  useEffect(() => {
    async function getQuestions() {
      const questionList = await getQuestionList(token);
      setQuestionData(questionList);
      const diff1: string[] = questionList.map((question: Question) => question.difficulty);
      const diff: string[] = [...new Set(diff1)];
      setDifficulties(diff);
      const tagArray: string[][] = questionList.map((question: Question) => question.tags.split(', '));
      const tag: string[] = [...new Set(tagArray.flat())];
      setTags(tag);
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
  }

  //Toggle popup window for add question form
  const openAddQuestionPopupWindow = () => {
    setOpenAddFormPopup(true);
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
        const updatedQuestionRes = await editQuestionById(
          selectedQuestion._id,
          updatedData,
          token
        );
        const updatedQuestion = await updatedQuestionRes.json();

        if(!updatedQuestionRes.ok) {
          errorMsg = updatedQuestion.message;
        } else {
          errorMsg = "";
          setQuestionData(
            questionData.map((question) =>
              question._id === selectedQuestion._id ? updatedQuestion : question
            )
          );
          setQuestionData(await getQuestionList(token));
        }
      } catch (err: any) {
        console.error(`Error editing question: ${err.message}`);
      }
    }
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
    { field: 'title', headerName: 'Title', hideable:false, width: 450,
        renderCell:(params) => {
          return(
            <Tooltip title="Click to see more information" placement="bottom">
              <Button sx={{display: "flex", textTransform: 'none'}}>{params.row.title}</Button>
          </Tooltip>
          );
        } 
    },

    { field: 'difficulty', headerName: 'Difficulty', hideable:false, width: 120, type:"singleSelect", valueOptions: difficulties},
    { 
      field: 'tags', 
      headerName: 'Tags', 
      hideable:false, 
      width: 220, 
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
    
    { field:'edit', headerName: '', sortable:false,hideable:false, disableColumnMenu:true, width:70, renderCell:(params) => {
      return(
        <Button style={{padding:"0"}} onClick={() => openEditPopupWindow(params.row)}>
          <EditOutlined />
        </Button> 
      );}
    }, 
    { field:'delete', headerName:'', sortable:false,hideable:false, disableColumnMenu:true, width:70, renderCell:(params) => {
      return(
        <Button style={{padding:"0"}} onClick={() => deleteQuestion(params.row._id)}>
          <DeleteOutlined />
        </Button>
      );}
    }
  ];

  const handleOnCellClick = (param:any) => {
    if(param.field === "title") {
      openDescriptionPopupWindow(param.row);
    }
  };


  return (
    <WidgetWrapper sx={{width:"100%"}}>
      {isAdmin && (<><Button 
        onClick={openAddQuestionPopupWindow}
        sx={{
          color: theme.palette.background.alt,
          backgroundColor: theme.palette.primary.main,
          borderRadius: "3rem",
        }}>
        Add
      </Button>
      <AddQuestionFormPopup
        open={openAddFormPopup}
        onClose={() => {
          setOpenAddFormPopup(false);
          errorMsg="";
        }}
        onSave={addQuestion}
        getErrorMsg={getErrorMessages}
      /></>)}
      <div>
      <div className="questionTable">
        <DataGrid disableColumnSelector
          rows={questionData}
          columns={columns}
          getRowId={(row: any) =>  row.title + row.difficulty + row.tags}
          onCellClick={handleOnCellClick}
          initialState={{
            columns: {
              columnVisibilityModel: {
                  edit: isAdmin,
                  delete: isAdmin,
              },
            },
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
          question={selectedQuestion!}/>
    <div>
      <EditQuestionPopup
        open={openEditPopup}
        onClose={() => {
          setOpenEditPopup(false);
          setSelectedQuestion(NoQuestionSelected);
          errorMsg="";
        }}
        question={selectedQuestion!}
        onSave={editQuestion}
        getErrorMsg={getErrorMessages}
      />
    </div>
    </WidgetWrapper>
  );
};

export default MyQuestionWidget;
