










// EXPLORER TAB : 

import { getUi } from "../get-ui/get-ui.js";
import { tooltip } from "../tooltip/tooltip.js";

export function explorerTab(){

    const viewportPlay = getUi("viewportPlay");

    viewportPlay.addEventListener("mouseenter",function(event){
        tooltip(viewportPlay,"Play Game",event);
    })

    // function listPath(path){

    // }

}