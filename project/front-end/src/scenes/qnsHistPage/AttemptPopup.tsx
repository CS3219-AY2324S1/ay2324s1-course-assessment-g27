import "codemirror/lib/codemirror.css";
import "codemirror/theme/dracula.css";
import "codemirror/mode/javascript/javascript";
import "codemirror/mode/python/python.js";
import "codemirror/addon/edit/closetag";
import "codemirror/addon/edit/closebrackets";

interface AttemptPopupProps {
  attempt: string;
}

const AttemptPopup: React.FC<AttemptPopupProps> = ({ attempt }) => {
  const text = attempt.toString();

  return (
    <div>
      <textarea
        id="codeblock"
        readOnly={true}
        defaultValue={text}
        rows={40}
        cols={50}
        style={{
          whiteSpace: "pre-wrap",
          overflowX: "auto",
          resize: "vertical",
        }}
      ></textarea>
    </div>
  );
};

export default AttemptPopup;
