
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

// APP : 

import { getUi } from "../module/get-ui/get-ui.js";
import { console } from "../module/console/console.js";
import { windowMenu } from "../module/menu-window/window-menu.js";
import { resizeHandle } from "../module/resize-handle/resize-handle.js"
import { gui } from "../module/gui/gui.js";
import { appLoad } from "../module/app-load/app-load.js";

// APP LOAD : 

document.addEventListener("DOMContentLoaded",appLoad);

resizeHandle.config({
    lineType : "DASHED" 
});
 

const dt = gui.custom("divtestb") as HTMLDivElement;

dt.addEventListener("click",function(){

    console("IMG CLICKED ")

    const dtRect = dt.getBoundingClientRect(); 
 
    resizeHandle.setHandle({ 
        x : dtRect.x,
        y : dtRect.y,  
        width : dtRect.width,
        height : dtRect.height,
        type : "SINGLE_OBJECT",  
        rotate : true, 
        object : "HTML"
    });
});

setTimeout(() => {
        console("IMG CLICKED ")

    const dtRect = dt.getBoundingClientRect(); 
 
    resizeHandle.setHandle({ 
        x : dtRect.x,
        y : dtRect.y,  
        width : dtRect.width,  
        height : dtRect.height, 
        type : "SINGLE_OBJECT",  
        rotate : true, 
        object : "HTML"
    });
}, 5000);

resizeHandle.onChange(coord=>{
    dt.style.left = coord.x + "px";
    dt.style.top = coord.y + "px";
    dt.style.width = coord.width + "px";
    dt.style.height = coord.height + "px";
})



// WINDOW MENU : 

// FILE : 

const fileMenu = getUi("menu-file")

function handleMenuNew(){
    const fileMenus = [
        {
            label: "New",
            divisor: false,
            id: "new-menu"
        },
        {
            label: "Open",
            divisor: true,
            id: "HGT"
        },
        {
            label: "Save",
            divisor: false,
            id: "HGT"
        },
        {
            label: "Save as..",
            divisor: true,
            id: "HGT"
        },
        {
            label: "Inport",
            divisor: false,
            id: "HGT"
        },
        {
            label: "Export",
            divisor: true,
            id: "HGT"
        },
        {
            label: "Preferences",
            divisor: true,
            id: "HGT"
        },
        {
            label: "Addon",
            divisor: true,
            id: "HGT"
        }
        ,
        {
            label: "Exit",
            divisor: false,
            id: "HGT"
        } 
    ];

    windowMenu(fileMenu, fileMenus);

    const menuNew = getUi("new-menu").addEventListener("click",function(){
        // const openWindowCreate = windowCreate();
        // openWindowCreate.createWindow();
    });

}

fileMenu.addEventListener("click",handleMenuNew)

// EDIT : 

const editMenu = getUi("menu-edit")

function handleMenuEdit(){
    const editMenus = [
        {
            label: "Desfazer",
            divisor: false,
            id: "new-menu"
        },
        {
            label: "Refazer",
            divisor: true,
            id: "HGT"
        },
        {
            label: "Selecionar",
            divisor: false,
            id: "HGT"
        },
        {
            label: "Save as..",
            divisor: true,
            id: "HGT" 
        },
        {
            label: "edit Option",
            divisor: false,
            id: "HGT"
        },
        {
            label: "edit Option",
            divisor: false,
            id: "HGT"
        }
    ];

    windowMenu(editMenu, editMenus);

    // const menuEdit = getUi("new-menu").addEventListener("click",function(){
    //     const openWindowCreate = windowCreate();
    //     openWindowCreate.createWindow();
    // });

}

editMenu.addEventListener("click",handleMenuEdit)





 





