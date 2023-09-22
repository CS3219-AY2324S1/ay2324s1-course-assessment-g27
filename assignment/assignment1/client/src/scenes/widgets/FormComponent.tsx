// import React, { useState } from 'react';
// import './FormComponent.css';

// interface FormData {
//   index: string;
//   title: string;
//   description: string;
//   difficulty: string;
//   tags: string[];
//   examples: string[];
//   constraints: string[];
// }

// interface FormComponentProps {
//   onAddQuestion: (newQuestion: FormData) => void;
// }

// const initialFormData: FormData = {
//   index: '',
//   title: '',
//   description: '',
//   difficulty: '',
//   tags: [],
//   examples: [],
//   constraints: [],
// };

// const FormComponent: React.FC<FormComponentProps> = ({ onAddQuestion }) => {
//   const [formData, setFormData] = useState<FormData>(initialFormData);

//   const handleChange = (
//     event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
//   ) => {
//     const { name, value } = event.target;
//     setFormData({
//       ...formData,
//       [name]: value,
//     });
//   };

//   const handleTagsChange = (event: React.ChangeEvent<HTMLInputElement>) => {
//     const { value } = event.target;
//     setFormData({
//       ...formData,
//       tags: value.split(',').map((tag) => tag.trim()),
//     });
//   };

//   const handleExamplesChange = (event: React.ChangeEvent<HTMLInputElement>) => {
//     const { value } = event.target;
//     setFormData({
//       ...formData,
//       examples: value.split(',').map((example) => example.trim()),
//     });
//   };

//   const handleConstraintsChange = (
//     event: React.ChangeEvent<HTMLInputElement>
//   ) => {
//     const { value } = event.target;
//     setFormData({
//       ...formData,
//       constraints: value.split(',').map((constraint) => constraint.trim()),
//     });
//   };

//   const handleSubmit = (event: React.FormEvent) => {
//     event.preventDefault();

//     // Pass the new question data to the parent component
//     onAddQuestion(formData);

//     // Reset the form
//     setFormData(initialFormData);
//   };

//   return (
//     <form onSubmit={handleSubmit}
//     className='form-component'
//     >

//       <div>
//         <label className="form-label"
//         htmlFor="title">Title:</label>
//         <input className='form-input'
//           type="text"
//           id="title"
//           name="title"
//           value={formData.title}
//           onChange={handleChange}
//         />
//       </div>
//       <div>
//         <label className="form-label" htmlFor="description">Description:</label>
//         <input className='form-input'
//           id="description"
//           name="description"
//           value={formData.description}
//           onChange={handleChange}
//         />
//       </div>
//       <div>
//         <label className="form-label" htmlFor="difficulty">Difficulty:</label>
//         <input className='form-input'
//           type="text"
//           id="difficulty"
//           name="difficulty"
//           value={formData.difficulty}
//           onChange={handleChange}
//         />
//       </div>
//       <div>
//         <label className="form-label" htmlFor="tags">Tags (comma-separated):</label>
//         <input className='form-input'
//           type="text"
//           id="tags"
//           name="tags"
//           value={formData.tags.join(', ')}
//           onChange={handleTagsChange}
//         />
//       </div>
//       <div>
//         <label className="form-label" htmlFor="examples">Examples (comma-separated):</label>
//         <input className='form-input'
//           type="text"
//           id="examples"
//           name="examples"
//           value={formData.examples.join(', ')}
//           onChange={handleExamplesChange}
//         />
//       </div>
//       <div>
//         <label className="form-label" htmlFor="constraints">Constraints (comma-separated):</label>
//         <input className='form-input'
//           type="text"
//           id="constraints"
//           name="constraints"
//           value={formData.constraints.join(', ')}
//           onChange={handleConstraintsChange}
//         />
//       </div>
//       {/* Submit button */}
//       <div>
//         <button type="submit">Add Question</button>
//       </div>
//     </form>
//   );
// };

// export default FormComponent;
