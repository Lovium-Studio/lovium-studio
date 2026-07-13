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

// CODE EDITOR THEME :

// @ts-ignore
ace.define("ace/theme/lovium-theme", ["require", "exports", "module", "ace/lib/dom"], function(require, exports, module) {

    exports.isDark = true;
    exports.cssClass = "lovium-theme";
    exports.cssText = `
        .lovium-theme .ace_gutter {
            background: var(--color-f);  
            color: var(--color-c); 
        }   

        .lovium-theme {
            background-color: #2e1a1f;  
            color: var(--color-c);   
        }

        .lovium-theme .ace_cursor {
            color: var(--color-b);  
        }

        .lovium-theme .ace_marker-layer .ace_selection {
            background: var(--color-a-t);   
        }

        .lovium-theme .ace_marker-layer .ace_active-line {
            background:  var(--color-d);
        } 

        .lovium-theme .ace_gutter-active-line {
            background-color: var(--color-b);  
            color: var(--color-d);    
        }

        .lovium-theme .ace_keyword {
            color: var(--color-a);
        } 

        .lovium-theme .ace_string {
            color: #4962f3;
        }
 
        .lovium-theme .ace_comment { 
            color: #676e95;
            font-style: italic;
        }

        .lovium-theme .ace_constant.ace_numeric {
            color: var(--color-b);   
        }

        .lovium-theme .ace_support.ace_function {
            color: rgb(255, 144, 92); 
        }

        .lovium-theme .ace_variable { 
            color: var(--color-b);
        }   

        .lovium-theme .ace_entity.ace_name.ace_tag {
            color: #f07178;
        }

        .lovium-theme .ace_indent-guide {
            background: repeating-linear-gradient(
                to right,
                transparent,
                transparent 2px,
                rgba(255,255,255,0.05) 2px,
                rgba(255,255,255,0.05) 4px
            );
        }

        /* ACE EDITOR SCROLL : */

        .ace_scrollbar-v::-webkit-scrollbar {
            background: none;
            width: 9px;
            left: -5px; 
   
        }
        .ace_scrollbar-v::-webkit-scrollbar-thumb {
            background: var(--color-d);
            border-right: 3px solid var(--color-f);               
            border-top: 3px solid var(--color-f);               
            border-bottom: 3px solid var(--color-f);                  
        }
        .ace_scrollbar-v::-webkit-scrollbar-thumb:active {
            background: var(--color-c); 
        } 
        .ace_scrollbar-v::-webkit-scrollbar-track {
            background: none;
        }

        .ace_scrollbar-h::-webkit-scrollbar {
            background: none;
            height: 9px;          
            left: -5px;
        } 
        .ace_scrollbar-h::-webkit-scrollbar-thumb {
            background: var(--color-d); 
            border-bottom: 3px solid var(--color-f);           
            border-left: 3px solid var(--color-f);           
            border-right: 3px solid var(--color-f);             
        }
        .ace_scrollbar-h::-webkit-scrollbar-thumb:active {
            background: var(--color-c);
        }
        .ace_scrollbar-h::-webkit-scrollbar-track {
            background: none;
        }    

        .lovium-theme .ace_gutter-cell.ace_error {
            background-image: none; /* remove o ícone padrão do Ace */
        }

        .lovium-theme .ace_gutter-cell.ace_error::before {
            content: "✕"; /* ou use um ícone de fonte, tipo Remix Icon */
            color: #ff5555;
            font-weight: bold;
        }

        .lovium-theme .ace_gutter-cell.ace_warning::before {
            content: "!";  
            color: #ffb86c;  
            font-weight: bold;
        }

        .lovium-theme .ace_gutter-cell.ace_info::before {
            content: "i";
            color: #8be9fd;
        }

        .lovium-theme .ace_gutter-cell.ace_error::before {
            font-family: "remixicon";
            content: "&#xECAF;"; /* código unicode do ícone ri-close-circle-fill, por exemplo */
            color: #ff5555;   
        }         
    `; 

    var dom = require("../lib/dom");   
    dom.importCssString(exports.cssText, exports.cssClass, false);
});