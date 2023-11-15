import { useEffect, useRef } from "react";
import CodeMirror from "codemirror";
import "codemirror/lib/codemirror.css";
import "codemirror/theme/dracula.css";
import "codemirror/mode/javascript/javascript";
import "codemirror/mode/python/python.js";
import "codemirror/mode/clike/clike.js";
import "codemirror/addon/edit/closetag";
import "codemirror/addon/edit/closebrackets";
import { Socket } from "socket.io-client";
import "./editor.css";
import Chip from "@mui/material/Chip";
import {LANGUAGE} from "../../constants/constants"

const Editor = ({
  socket,
  roomId,
  saveAttempt,
  selectedLanguage,
}: {
  socket: Socket;
  roomId: any;
  saveAttempt: (attempt: string) => void;
  selectedLanguage: any;
}) => {
  const editorRef = useRef<CodeMirror.Editor | null>(null);

  useEffect(() => {
    async function init() {
      const editorElement = document.getElementById(
        "realtimeEditor"
      ) as HTMLTextAreaElement;

      if (editorElement) {
        editorRef.current = CodeMirror.fromTextArea(editorElement, {
          mode: selectedLanguage,
          theme: "dracula",
          autoCloseTags: true,
          autoCloseBrackets: true,
          lineNumbers: true,
        });

        if (editorRef.current) {
          editorRef.current.on("change", (instance, changes) => {
            const { origin } = changes;
            const code = instance.getValue();
            if (origin !== "setValue") {
              socket.emit("code_change", {
                roomId,
                code,
              });
              saveAttempt(code);
            }
          });
          editorRef.current.getWrapperElement().style.borderRadius = "15px";
          editorRef.current.getWrapperElement().style.height = "95%";
          editorRef.current.getWrapperElement().style.width = "100%";
          editorRef.current.getWrapperElement().style.overflow = "scroll";

          if (editorRef.current.getValue() === "") {
            editorRef.current.setValue("// TYPE CODE HERE");
          }

          editorRef.current.on("blur", () => {
            if (editorRef.current && editorRef.current.getValue() === "") {
              editorRef.current.setValue("// TYPE CODE HERE");
            }
          });

          editorRef.current.on("focus", () => {
            if (
              editorRef.current &&
              editorRef.current.getValue() === "// TYPE CODE HERE"
            ) {
              editorRef.current.setValue("");
            }
          });
        }
      }
    }

    init();
  }, []);

  useEffect(() => {
    socket.on("code_change", (code) => {
      if (code !== null && editorRef.current) {
        editorRef.current.setValue(code);
        saveAttempt(code);
      }
    });

    return () => {
      socket.off("code_change");
    };
  }, [socket, roomId]);

  return (
    <div
      className="editor"
      style={{ height: "80%", maxHeight: "68vh", overflow: "scroll" }}
    >
      <Chip label={Object.keys(LANGUAGE)[Object.values(LANGUAGE).indexOf(selectedLanguage)]} color="primary" variant="outlined" />
      <textarea id="realtimeEditor" placeholder="//TYPE CODE HERE"></textarea>
    </div>
  );
};

export default Editor;
