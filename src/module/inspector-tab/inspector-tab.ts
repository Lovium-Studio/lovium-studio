
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