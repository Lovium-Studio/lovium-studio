
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

// INSPECTOR 

import { getUi } from "../get-ui/get-ui.js"
import { dropdown } from "../dropdown/dropdown.js";
import { console } from "../console/console.js";
import { gui } from "../gui/gui.js";

export const inspectorTab = () : void => {

    const handleFontDropdown = () : void => {

        const buttonList = [
            {
                label : "Bold",
                id : "bold-id",
                icon : "ri-home-3-line"
            },
            {
                label : "Regular",
                id : "ggt",
                icon : "ri-home-3-line"
            },
            {
                label : "Black",
                id : "ggt",
                icon : "ri-home-3-line"
            }
            
        ]

        dropdown(gui.inspectorTab.inspectorFontWheightDropdown,buttonList);

        const fontBold = getUi("bold-id").addEventListener("click",function(){
            console("Font Bold Setado!","LOG");
        });

    };

    gui.inspectorTab.inspectorFontWheightDropdown.addEventListener("click",handleFontDropdown)

};