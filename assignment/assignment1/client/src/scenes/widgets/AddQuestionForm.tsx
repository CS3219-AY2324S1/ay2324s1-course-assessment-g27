// import React, { useState, ChangeEvent, FormEvent } from 'react';
// import './AddQuestionForm.css';

// interface FormData {
//   index: string;
//   title: string;
//   description: string;
//   difficulty: string;
//   tags: string[];
//   examples: string[];
//   constraints: string[];
// }

// interface AddQuestionFormProps {
//   onAddQuestion: (formData: FormData) => void;
// }

// const AddQuestionForm: React.FC<AddQuestionFormProps> = ({ onAddQuestion }) => {
//   const initialFormData: FormData = {
//     index: '',
//     title: '',
//     description: '',
//     difficulty: '',
//     tags: [],
//     examples: [],
//     constraints: [],
//   };

//   const [formData, setFormData] = useState<FormData>(initialFormData);

//   const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
//     const { name, value } = e.target;
//     setFormData({
//       ...formData,
//       [name]: value,
//     });
//   };

//   const handleSubmit = (e: FormEvent) => {
//     e.preventDefault();
//     // Call the onAddQuestion callback with the new question data
//     onAddQuestion(formData);
//     // Reset the form
//     setFormData(initialFormData);
//   };

//   return (
//     <div className="add-question-form">
//       <form onSubmit={handleSubmit}>
//         <div className="form-group">
//           <label>ID</label>
//           {/* <input
//             type="text"
//             name="id"
//             value={formData.id}
//             onChange={handleChange}
//             required
//           /> */}
//         </div>
//         <div className="form-group">
//           <label>Title</label>
//           <input
//             type="text"
//             name="title"
//             value={formData.title}
//             onChange={handleChange}
//             required
//           />
//         </div>
//         <div className="form-group">
//           <label>Description</label>
//           <textarea
//             name="description"
//             value={formData.description}
//             onChange={handleChange}
//             required
//           ></textarea>
//         </div>
//         <div className="form-group">
//           <label>Difficulty</label>
//           <input
//             type="text"
//             name="difficulty"
//             value={formData.difficulty}
//             onChange={handleChange}
//             required
//           />
//         </div>
//         <div className="form-group">
//           <label>Tags (comma-separated)</label>
//           <input
//             type="text"
//             name="tags"
//             value={formData.tags.join(', ')}
//             onChange={handleChange}
//             required
//           />
//         </div>
//         <div className="form-group">
//           <label>Examples (comma-separated)</label>
//           <input
//             type="text"
//             name="examples"
//             value={formData.examples.join(', ')}
//             onChange={handleChange}
//             required
//           />
//         </div>
//         <div className="form-group">
//           <label>Constraints (comma-separated)</label>
//           <input
//             type="text"
//             name="constraints"
//             value={formData.constraints.join(', ')}
//             onChange={handleChange}
//             required
//           />
//         </div>
//         <button type="submit">Add Question</button>
//       </form>
//     </div>
//   );
// };

// export default AddQuestionForm;
