
/**************************************************************************/
/*                                                                        */
/*                         This file is part of :                         */
/*                             Lovium Studio                              */
/*              https://github.com/Lovium-Studio/lovium-studio            */
/*                                                                        */
/*                             MIT LICENSE                                */
/*                                                                        */
/*                (C) 2026 - YYYY Lovium Studio & Community               */
/*                (C) 2026 - YYYY Rhyan Eduardo Ferreira.                 */
/*                                                                        */
/*                   https://opensource.org/license/mit                   */
/*                                                                        */
/**************************************************************************/

// ACE EDITOR :

import { console } from "../console/console.js";
import { autoComplete } from "../auto-complete/auto-complete.js";
import { contextMenu } from "../context-menu/context-menu.js";
import { getUi } from "../get-ui/get-ui.js";

export const codeTab = () : void => {

    const codeEditorContainer = getUi("code-editor");

    // @ts-ignore
    const editor = ace.edit("code-editor");

    editor.session.setMode("ace/mode/lua");


    editor.setTheme("ace/theme/monokai");

    editor.setOptions({
        fontSize: "10pt", 
        showLineNumbers: true,
        showGutter: true,
        enableBasicAutocompletion: false,
        enableLiveAutocompletion: false,
        enableSnippets: true, 
        customScrollbar: false
    }); 

    const getCursorXPosition = () : any => {
        const cursorPosition = editor.getCursorPosition();
        const screenPos = editor.renderer.textToScreenCoordinates(cursorPosition.row, cursorPosition.column); // Converte para coordenadas de tela
        
        return {
            cursorX: screenPos.pageX,
            cursorY: screenPos.pageY
        };
    };

    const getWordAtCursor = () : void => {
        const cursorPosition = editor.getCursorPosition();
        const wordRange = editor.session.getWordRange(cursorPosition.row, cursorPosition.column);
        return editor.session.getTextRange(wordRange); 
    };

    editor.on("input", function() {
        const getCursorCoordenate = getCursorXPosition();
        const getWord = getWordAtCursor();
        setAutoComplete(getWord,getCursorCoordenate.cursorX,getCursorCoordenate.cursorY)
    });

    const setAutoComplete = (value : any ,x : number ,y : number) : void => {
        autoComplete(value,x,y)
    };

    const codeEditorHandleContextMenu = ( e : MouseEvent) : void => {

        const codeEditorContextMenu = [
            {
                label : "Save and Run",
                id : "codeRunCode",
                icon : "ri-code-s-slash-line",
                divisor : true
            },
            {
                label : "Copy",
                id : "codeCopy",
                icon : "ri-file-copy-line",
                divisor : false
            },
            {
                label : "Paste",    
                id : "codeCopy",
                icon : "ri-clipboard-line",
                divisor : false
            },
            {
                label : "Cut",
                id : "codeCopy",
                icon : "ri-scissors-cut-fill",
                divisor : true
            },
            {
                label : "Shot",
                id : "codeCopy",
                icon : "ri-camera-lens-fill",
                divisor : false
            }
        ];

        contextMenu(codeEditorContextMenu,e)
    };

    codeEditorContainer.addEventListener("contextmenu", (e : MouseEvent)=> codeEditorHandleContextMenu(e));

};                                                   