// import React, { useState } from 'react';
// import './QuestionPage.css';
// import FormComponent from '../widgets/FormComponent';

// interface Question {
//   index: string;
//   title: string;
//   description: string;
//   difficulty: string;
//   tags: Array<string>;
//   examples: Array<string>;
//   constraints: Array<string>;
// }

// interface QuestionPageProps {
//   questions: Question[];
// }

// const QuestionPage: React.FC<QuestionPageProps> = ({ questions }) => {
//   const [questionList, setQuestionList] = useState<Question[]>(questions);
//   const [selectedQuestion, setSelectedQuestion] = useState<Question | null>(null);
//   const [deleteConfirmation, setDeleteConfirmation] = useState<Question | null>(null);
//   const [isFormVisible, setIsFormVisible] = useState(false);

//   const handleDeleteQuestion = (index: string) => {
//     const questionToDelete = questionList.find((question) => question.index === index);
//     setDeleteConfirmation(questionToDelete || null);
//   };

//   const confirmDelete = () => {
//     if (deleteConfirmation) {
//       const updatedQuestions = questionList.filter((question) => question.index !== deleteConfirmation.index);
//       setQuestionList(updatedQuestions);
//       setDeleteConfirmation(null);
//     }
//   };

//   const cancelDelete = () => {
//     setDeleteConfirmation(null);
//   };

//   const toggleFormVisibility = () => {
//     setIsFormVisible(!isFormVisible);
//   };

//   const handleAddQuestion = (newQuestion: FormData) => {
//     setQuestionList([...questionList, { ...newQuestion, index: String(Date.now()) }]); // Assign a unique ID
//     setIsFormVisible(false);
//   };

//   const DeleteConfirmation: React.FC<{
//     question: Question;
//     onConfirm: () => void;
//     onCancel: () => void;
//   }> = ({ question, onConfirm, onCancel }) => {
//     return (
//       <div className="modal-container">
//         <div className="modal-card">
//           <p>Are you sure you want to delete the question:</p>
//           <h2>{question.title}</h2>
//           <div className="delete-buttons">
//             <button className="confirm-delete" onClick={onConfirm}>Yes</button>
//             <button className="cancel-delete" onClick={onCancel}>No</button>
//           </div>
//         </div>
//       </div>
//     );
//   };

//   return (
//     <div className="question-page-container">
//       <h1>Questions</h1>
//       <button className='add-button' onClick={toggleFormVisibility}>Add Questions</button>
//       {/* {isFormVisible && <FormComponent onAddQuestion={handleAddQuestion} />} */}
//       <div className="question-list-container">
//         <ul className="question-list">
//           {questionList.map((question) => (
//             <li key={question.index} className="question-item">
//               <div
//                 className="question-card"
//                 onClick={() => setSelectedQuestion(question)}
//               >
//                 <button
//                   className="delete-button"
//                   onClick={() => handleDeleteQuestion(question.index)}
//                 >
//                   Delete
//                 </button>
//                 <h2>{"Title: " + question.title}</h2>
//                 <h2>{"Difficulty: " + question.difficulty}</h2>
//                 <h2>{"Tags: " + question.tags.join(', ')}</h2>
//                 <h2>{"Description: " + question.description}</h2>
//                 <h2> {"Examples: " + question.examples.join(', ')}</h2>
//                 <h2> {"Constraints: " + question.constraints.join(', ')}</h2>
//               </div>
//             </li>
//           ))}
//         </ul>
//       </div>
//       {deleteConfirmation && (
//         <DeleteConfirmation
//           question={deleteConfirmation}
//           onConfirm={confirmDelete}
//           onCancel={cancelDelete}
//         />
//       )}
//     </div>
//   );
// };

// export default QuestionPage;
import { Box, useMediaQuery } from "@mui/material";
import Navbar from "../navBar";
import {MyQuestionWidget, DisplayQuestionsTableWidget} from "../widgets/MyQuestionWidget";
const QuestionPage = () => {
  const isNonMobileScreens = useMediaQuery("(min-width:1000px)");

  return (
    <Box>
      <Navbar />
      <Box
        width="100%"
        padding="2rem 6%"
        display={isNonMobileScreens ? "flex" : "block"}
        gap="0.5rem"
        justifyContent="space-between"
      >
        <Box
          flexBasis={isNonMobileScreens ? "42%" : undefined}
          mt={isNonMobileScreens ? undefined : "2rem"}
        >
          <MyQuestionWidget/>
          <DisplayQuestionsTableWidget/>
        </Box>
        {isNonMobileScreens && <Box flexBasis="26%"></Box>}
      </Box>
    </Box>
  );
};

export default QuestionPage;
