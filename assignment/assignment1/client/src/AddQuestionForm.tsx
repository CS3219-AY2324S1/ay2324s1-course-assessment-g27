import React, { useState, ChangeEvent, FormEvent } from 'react';

interface FormData {
  id: number;
  title: string;
  complexity: string;
  category: string;
  description: string;
}

interface AddQuestionFormProps {
  onAddQuestion: (formData: FormData) => void;
}

const AddQuestionForm: React.FC<AddQuestionFormProps> = ({ onAddQuestion }) => {
  const [formData, setFormData] = useState<FormData>({
    id: -1,
    title: '',
    complexity: '',
    category: '',
    description: '',
  });

  const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    // Call the onAddQuestion callback with the new question data
    onAddQuestion(formData);
    // Reset the form
    setFormData({
      id: -1,
      title: '',
      complexity: '',
      category: '',
      description: '',
    });
  };

  return (
    <div className="add-question-form">
    
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Title</label>
          <input
            type="text"
            name="title"
            value={formData.title}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label>Complexity</label>
          <input
            type="text"
            name="complexity"
            value={formData.complexity}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label>Category</label>
          <input
            type="text"
            name="category"
            value={formData.category}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label>Description</label>
          <textarea
            name="description"
            value={formData.description}
            onChange={handleChange}
            required
          ></textarea>
        </div>
        <button type="submit">Add Question</button>
      </form>
    </div>
  );
};

export default AddQuestionForm;
