import React, { useState } from 'react';
import './QuestionPage.css';
import FormComponent from '../widgets/FormComponent';

interface Question {
  id: string;
  title: string;
  description: string;
  difficulty: string;
  tags: Array<string>;
  examples: Array<string>;
  constraints: Array<string>;
}

interface QuestionPageProps {
  questions: Question[];
}

const QuestionPage: React.FC<QuestionPageProps> = ({ questions }) => {
  const [questionList, setQuestionList] = useState<Question[]>(questions);
  const [selectedQuestion, setSelectedQuestion] = useState<Question | null>(null);
  const [deleteConfirmation, setDeleteConfirmation] = useState<Question | null>(null);
  const [isFormVisible, setIsFormVisible] = useState(false);

  const handleDeleteQuestion = (id: string) => {
    const questionToDelete = questionList.find((question) => question.id === id);
    setDeleteConfirmation(questionToDelete || null);
  };

  const confirmDelete = () => {
    if (deleteConfirmation) {
      const updatedQuestions = questionList.filter((question) => question.id !== deleteConfirmation.id);
      setQuestionList(updatedQuestions);
      setDeleteConfirmation(null);
    }
  };

  const cancelDelete = () => {
    setDeleteConfirmation(null);
  };

  const toggleFormVisibility = () => {
    setIsFormVisible(!isFormVisible);
  };

  const handleAddQuestion = (newQuestion: FormData) => {
    setQuestionList([...questionList, { ...newQuestion, id: String(Date.now()) }]); // Assign a unique ID
    setIsFormVisible(false);
  };

  const DeleteConfirmation: React.FC<{
    question: Question;
    onConfirm: () => void;
    onCancel: () => void;
  }> = ({ question, onConfirm, onCancel }) => {
    return (
      <div className="modal-container">
        <div className="modal-card">
          <p>Are you sure you want to delete the question:</p>
          <h2>{question.title}</h2>
          <div className="delete-buttons">
            <button className="confirm-delete" onClick={onConfirm}>Yes</button>
            <button className="cancel-delete" onClick={onCancel}>No</button>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="question-page-container">
      <h1>Questions</h1>
      <button className='add-button' onClick={toggleFormVisibility}>Add Questions</button>
      {isFormVisible && <FormComponent onAddQuestion={handleAddQuestion} />}
      <div className="question-list-container">
        <ul className="question-list">
          {questionList.map((question) => (
            <li key={question.id} className="question-item">
              <div
                className="question-card"
                onClick={() => setSelectedQuestion(question)}
              >
                <button
                  className="delete-button"
                  onClick={() => handleDeleteQuestion(question.id)}
                >
                  Delete
                </button>
                <h2>{"Title: " + question.title}</h2>
                <h2>{"Difficulty: " + question.difficulty}</h2>
                <h2>{"Tags: " + question.tags.join(', ')}</h2>
                <h2>{"Description: " + question.description}</h2>
                <h2> {"Examples: " + question.examples.join(', ')}</h2>
                <h2> {"Constraints: " + question.constraints.join(', ')}</h2>
              </div>
            </li>
          ))}
        </ul>
      </div>
      {deleteConfirmation && (
        <DeleteConfirmation
          question={deleteConfirmation}
          onConfirm={confirmDelete}
          onCancel={cancelDelete}
        />
      )}
    </div>
  );
};

export default QuestionPage;
