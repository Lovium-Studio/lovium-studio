









// ACE EDITOR :

import { console } from "../console/console.js";
import { autoComplete } from "../auto-complete/auto-complete.js";
import { contextMenu } from "../context-menu/context-menu.js";
import { getUi } from "../get-ui/get-ui.js";


export function codeEditor(){

    const codeEditorContainer = getUi("code-editor");

    const editor = ace.edit("code-editor");

    editor.session.setMode("ace/mode/javascript");

    editor.setTheme("ace/theme/monokai");

    editor.setOptions({
        fontSize: "10pt",
        showLineNumbers: true,
        showGutter: true,
        enableBasicAutocompletion: true,
        enableLiveAutocompletion: true,
        enableSnippets: true, 
        customScrollbar: false
    });

    function getCursorXPosition() {
        const cursorPosition = editor.getCursorPosition();
        const screenPos = editor.renderer.textToScreenCoordinates(cursorPosition.row, cursorPosition.column); // Converte para coordenadas de tela
        
        return {
            cursorX: screenPos.pageX,
            cursorY: screenPos.pageY
        };
    }

    function getWordAtCursor() {
        const cursorPosition = editor.getCursorPosition();
        const wordRange = editor.session.getWordRange(cursorPosition.row, cursorPosition.column);
        return editor.session.getTextRange(wordRange); 
    }

    editor.on("input", function() {
        const getCursorCoordenate = getCursorXPosition();
        const  getWord = getWordAtCursor();
        console(getCursorCoordenate.cursorX);
        console(getWordAtCursor());
        setAutoComplete(getWord,getCursorCoordenate.cursorX,getCursorCoordenate.cursorY)

    });

    function setAutoComplete(value,x,y){
        autoComplete(value,x,y)
    }

    function codeEditorHandleContextMenu(){

        const codeEditorContextMenu = [
            {
                name : "Save and Run",
                id : "codeRunCode",
                icon : "ri-code-s-slash-line",
                divisor : true
            },
            {
                name : "Copy",
                id : "codeCopy",
                icon : "ri-file-copy-line",
                divisor : false
            },
            {
                name : "Paste",    
                id : "codeCopy",
                icon : "ri-clipboard-line",
                divisor : false
            },
            {
                name : "Cut",
                id : "codeCopy",
                icon : "ri-scissors-cut-fill",
                divisor : true
            },
            {
                name : "Shot",
                id : "codeCopy",
                icon : "ri-camera-lens-fill",
                divisor : false
            }
        ]

        contextMenu(codeEditorContextMenu,event)
    }

    codeEditorContainer.addEventListener("contextmenu",codeEditorHandleContextMenu)

}                                                               