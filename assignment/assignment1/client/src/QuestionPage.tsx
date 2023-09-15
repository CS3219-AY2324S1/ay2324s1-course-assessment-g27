import React, { useState } from 'react';
import AddQuestionForm from './AddQuestionForm';

interface Question {
  id: number;
  title: string;
  complexity: string;
  category: string;
  description: string;
}

interface QuestionPageProps {
  questions: Question[];
}

const QuestionPage: React.FC<QuestionPageProps> = ({ questions }) => {
  const [questionList, setQuestionList] = useState<Question[]>(questions);
  const [showForm, setShowForm] = useState<boolean>(false);
  const [selectedQuestion, setSelectedQuestion] = useState<Question | null>(null);
  const [deleteConfirmation, setDeleteConfirmation] = useState<Question | null>(null);

  const handleAddQuestion = (newQuestion: Question) => {
    // Add the new question to the question list
    setQuestionList([...questionList, newQuestion]);
    // Close the form after adding a question
    setShowForm(false);
  };

  const handleDeleteQuestion = (id: number) => {
    // Show the delete confirmation for the selected question
    const questionToDelete = questionList.find((question) => question.id === id);
    setDeleteConfirmation(questionToDelete || null);
  };

  const confirmDelete = () => {
    if (deleteConfirmation) {
      // Delete the question
      const updatedQuestions = questionList.filter((question) => question.id !== deleteConfirmation.id);
      setQuestionList(updatedQuestions);
      // Close the delete confirmation
      setDeleteConfirmation(null);
    }
  };

  const cancelDelete = () => {
    // Cancel the delete confirmation
    setDeleteConfirmation(null);
  };

  const AddQuestionFormModal: React.FC<{ showForm: boolean; onClose: () => void }> = ({
    showForm,
    onClose,
  }) => {
    if (!showForm) return null;

    return (
      <div className="modal-container">
        <div className="modal-card">
          <h2>Add Question</h2>
          <AddQuestionForm onAddQuestion={handleAddQuestion} />
          <button onClick={onClose}>Close</button>
        </div>
      </div>
    );
  };

  const QuestionModal: React.FC<{ question: Question | null; onClose: () => void }> = ({
    question,
    onClose,
  }) => {
    if (!question) return null;

    return (
      <div className="modal-container">
        <div className="modal-card">
          <h2>{question.title}</h2>
          <h3>{question.complexity}</h3>
          <h4>{question.category}</h4>
          <p>{question.description}</p>
          <button onClick={onClose}>Close</button>
        </div>
      </div>
    );
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
    <div className="question-page">
      <h1>LeetCode Questions</h1>
      <button className="add-button" onClick={() => setShowForm(!showForm)}>
        Add Question
      </button>
      <div className="question-list">
        <ul>
          {questionList.map((question) => (
            <li key={question.id} className="question-item">
              {/* Make the entire question card clickable */}
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
                <h2>{question.title}</h2>
                <h3>{question.complexity}</h3>
                <h4>{question.category}</h4>
              </div>
            </li>
          ))}
        </ul>
      </div>
      {!deleteConfirmation && <QuestionModal question={selectedQuestion} onClose={() => setSelectedQuestion(null)} />}
      {deleteConfirmation && (
        <DeleteConfirmation
          question={deleteConfirmation}
          onConfirm={confirmDelete}
          onCancel={cancelDelete}
        />
      )}
      <AddQuestionFormModal showForm={showForm} onClose={() => setShowForm(false)} />
    </div>
  );
};

export default QuestionPage;
