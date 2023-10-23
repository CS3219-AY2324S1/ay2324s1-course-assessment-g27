import { useEffect, useRef } from 'react';
import CodeMirror from 'codemirror';
import 'codemirror/lib/codemirror.css';
import 'codemirror/theme/dracula.css';
import 'codemirror/mode/javascript/javascript.js';
import 'codemirror/addon/edit/closetag';
import 'codemirror/addon/edit/closebrackets';
import { Socket } from 'socket.io-client';
import "./editor.css"

const Editor = ({ socket, roomId }: { socket: Socket, roomId: any}) => {
  const editorRef = useRef<CodeMirror.Editor | null>(null);

  useEffect(() => {
    async function init() {
      const editorElement = document.getElementById('realtimeEditor') as HTMLTextAreaElement;

      if (editorElement) {
        editorRef.current = CodeMirror.fromTextArea(editorElement, {
          mode: 'javascript',
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
        }
      }
    }

    init();
  }, []);

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

  return <textarea  id="realtimeEditor" placeholder="//TYPE CODE HERE"></textarea>;
};

export default Editor;