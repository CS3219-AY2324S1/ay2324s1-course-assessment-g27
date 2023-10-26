import { useEffect, useRef, useState } from 'react';
import CodeMirror from 'codemirror';
import 'codemirror/lib/codemirror.css';
import 'codemirror/theme/dracula.css';
import 'codemirror/mode/javascript/javascript'
import 'codemirror/mode/python/python.js';
import 'codemirror/addon/edit/closetag';
import 'codemirror/addon/edit/closebrackets';
import { Socket } from 'socket.io-client';
import "./editor.css"

// if (typeof window !== "undefined") {
//   require("codemirror/mode/javascript/javascript");
//   require('codemirror/mode/python/python.js');

//   // ... other imports you might need.
// }

const Editor = ({ socket, roomId }: { socket: Socket, roomId: any}) => {
  const [selectedLanguage, setSelectedLanguage] = useState('javascript');
  const editorRef = useRef<CodeMirror.Editor | null>(null);

  useEffect(() => {
    async function init() {
      const editorElement = document.getElementById('realtimeEditor') as HTMLTextAreaElement;

      if (editorElement) {
        editorRef.current = CodeMirror.fromTextArea(editorElement, {
          mode: selectedLanguage,
          theme: 'dracula',
          autoCloseTags: true,
          autoCloseBrackets: true,
          lineNumbers: true,
        });
        

        if (editorRef.current) {
          editorRef.current.on('change', (instance, changes) => {
            const { origin } = changes;
            const code = instance.getValue();
            console.log(code);
            if (origin !== 'setValue') {
                socket.emit("code_change", {
                    roomId,
                    code,
                });
            }
    
          });
          editorRef.current.getWrapperElement().style.borderRadius = '15px';
          editorRef.current.getWrapperElement().style.height = '100%';
          editorRef.current.getWrapperElement().style.width = '100%';

        }
      }
    }

    init();
  }, []);

  useEffect(() => {
    if (editorRef.current) {
      editorRef.current.setOption('mode', selectedLanguage);
    }
  }, [selectedLanguage]);

  useEffect(() => {
    
      socket.on("code_change", (code) => {
        console.log(`FROM SERVER ${code}`)
        // setText(code);
        if (code !== null && editorRef.current) {
          editorRef.current.setValue(code);
          
        }
      });
    
    // setText(editorRef.current!.getValue());
    return () => {
        socket.off("code_change");
    };
  }, [socket, roomId]);

  return(
    <div className='editor' style={{height:"78%"}}>
      <textarea  id="realtimeEditor" placeholder="//TYPE CODE HERE"></textarea>
      <div className='dropDownMenu'>
        <select className="selection" value={selectedLanguage} onChange={(input) => setSelectedLanguage(input.target.value)} style={{background:"#5ee3f7", borderRadius:"10px"}}>
          <option value="javascript" >Javascript</option>
          <option value="python">Python</option>
        </select>
      </div>
    </div>
  );
};

export default Editor;