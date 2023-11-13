import CodeMirror from 'codemirror';
// import CodeMirror from "react-codemirror";
import 'codemirror/lib/codemirror.css';
import 'codemirror/theme/dracula.css';
import 'codemirror/mode/javascript/javascript'
import 'codemirror/mode/python/python.js';
import 'codemirror/addon/edit/closetag';
import 'codemirror/addon/edit/closebrackets';
import { NoEncryption } from "@mui/icons-material";

interface AttemptPopupProps {
  attempt: String;
}

const AttemptPopup: React.FC<AttemptPopupProps> = ({ attempt }) => {
    // const editorElement = document.getElementById('codeblock') as HTMLTextAreaElement;
    const text = attempt.toString();
    // const editor = CodeMirror.fromTextArea(editorElement, {
    //   mode: 'javascript',
    //   theme: 'dracula',
    //   autoCloseTags: true,
    //   autoCloseBrackets: true,
    //   lineNumbers: true,
    // })
  
    // editor.setValue(attempt.toString());
  
    return (
      <div>
        <textarea 
          id="codeblock" 
          readOnly={true} 
          defaultValue={text}
          rows={40}
          cols={50}
          
          style={{
            whiteSpace: 'pre-wrap',
            overflowX: 'auto',
            resize: 'vertical',
          }} ></textarea>
      </div>
    );
  }

  export default AttemptPopup;