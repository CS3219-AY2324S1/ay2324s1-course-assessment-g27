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

  const handleAddQuestion = (newQuestion: Question) => {
    // Add the new question to the question list
    setQuestionList([...questionList, newQuestion]);
    // Close the form after adding a question
    setShowForm(false);
  };

  const handleDeleteQuestion = (id: number) => {
    // Filter out the question with the given id to delete it
    const updatedQuestions = questionList.filter((question) => question.id !== id);
    setQuestionList(updatedQuestions);
  };

  return (
    <div className="question-page">
      <h1>LeetCode Questions</h1>
      <button className="add-button" onClick={() => setShowForm(!showForm)}>
        Add Question
      </button>
      {showForm && <AddQuestionForm onAddQuestion={handleAddQuestion} />}
      <div className="question-list">
        <ul>
          {questionList.map((question) => (
            <li key={question.id} className="question-item">
              <button
                className="delete-button"
                onClick={() => handleDeleteQuestion(question.id)}
              >
                Delete
              </button>
              <h2>{question.title}</h2>
              <h3>{question.complexity}</h3>
              <h4>{question.category}</h4>
              <p>{question.description}</p>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default QuestionPage;


