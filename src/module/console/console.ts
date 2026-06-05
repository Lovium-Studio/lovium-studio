
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

// CONSOLE TAB : 

import { ConsoleTypeOption } from "../../../typescript/types.js";
import { gui } from "../gui/gui.js";

const ALERT_COLOR : string = "--color-a";
const SUCCESS_COLOR : string = "--color-b";

export const console = (text : string ,type : ConsoleTypeOption = "LOG") : void => {

    const logRow = document.createElement("span");
    logRow.className = "log-row";

    if (type === "ERROR") gui.consoleTab.consoleTabButton.style.borderColor = ALERT_COLOR;
    
    const getCurrentTime = () : string => {

        const now = new Date();

        let hours = now.getHours();
        let minutes = now.getMinutes();
        let seconds = now.getSeconds();  
    
        hours = hours < 10 ? 0 + hours : hours;
        minutes = minutes < 10 ? 0 + minutes : minutes;
        seconds = seconds < 10 ? 0 + seconds : seconds;
    
        return `${hours}:${minutes}:${seconds}`;
    };
    
    logRow.textContent = `${text} [${getCurrentTime()}]`;

    switch (type){
        case "LOG":
            logRow.style.color = "";
        break;
        case "ERROR":
            logRow.style.color = ALERT_COLOR;
        break;
        case "ALERT":
            logRow.style.color = SUCCESS_COLOR;
        break;
    };
    
    gui.consoleTab.consoleTab.appendChild(logRow);

    gui.consoleTab.consoleTab.scrollTo({
        top: gui.consoleTab.consoleTab.scrollHeight,
        behavior: 'smooth'
    });

};