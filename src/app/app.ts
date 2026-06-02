
/*---------------------------------------------------------------------------------------------
 *  copyright (c) 2024 BioBit Games Ltda. CREACTED IN 06/05/2024 DD/MM/YYYYY
 *  all rights reserverds.
 *---------------------------------------------------------------------------------------------*/

// APP MODULES : 

import { getUi } from "../module/get-ui/get-ui.js";
import { terminal } from "../module/terminal/terminal.js";
import { splitter } from "../module/splitter/splitter.js";
import { console } from "../module/console/console.js";
import { viewportGrid } from "../module/viewport-grid/viewport-grid.js";
import { viewportSelection } from "../module/viewport-selection/viewport-selection.js";
// import { animation } from "../module/animation/animation.js";
import { inspectorTab } from "../module/inspector-tab/inspector-tab.js";
import { shild } from "../module/shild/shild.js";
import { windowMenu } from "../module/menu-window/window-menu.js";
import { viewport } from "../module/viewport/viewport.js"
// import { tabManage } from "../module/tab-manage/tab-manage.js";
import { tabLoad } from "../module/tab-load/tab-load.js";
import { applicationPath } from "../module/application-path/application-path-.js";
import { codeTab } from "../module/code-tab/code-tab.js";
import { statusBar } from "../module/status-bar/status-bar.js";
import { resizeHandle } from "../module/resize-handle/resize-handle.js"
// import { explorerTab } from "../module/tooltip/tooltip.js";
import { assetTab } from "../module/asset-tab/asset-tab.js";
import { gui } from "../module/gui/gui.js";
import { timeline } from "../module/timeline-tab/timeline-tab.js";

// WINDOWS : 

// import { windowCreate } from "../window/window-create/window-create.js";

// UI IMPORTS : 

const termninalTabButton = getUi("terminal-tab-button");
const consoleTabButton = getUi("console-tab-button");
const timelineTabButton = getUi("timeline-tab-button");
// const tabCButton = document.querySelectorAll(".tab-c-button")
const terminalInput = getUi("terminal-input");

// APP LOAD : 

function appLoad(){   
    splitter();
    // viewportSelection();
    // viewportGrid(20,20)
    // animation();
    inspectorTab();
    tabLoad();
    viewport({
        gridWidth : 25,
        gridHeight : 25  
    })    
    applicationPath();
    codeTab();
    statusBar();
    // explorerTab();
    assetTab();

    timeline(); 

    console("Application Started...", "LOG");
    
    

    // resizeHandle({
    //     x : 300,
    //     y : 400, 
    //     width : 300,
    //     height : 200,
    //     type : "SINGLE_OBJECT",
    //     rotate : false
    // })



    resizeHandle.config({
        lineType : "DASHED" 
    });
 
};

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
}) 

resizeHandle.onChange(coord=>{
    dt.style.left = coord.x + "px";
    dt.style.top = coord.y + "px";
    dt.style.width = coord.width + "px";
    dt.style.height = coord.height + "px";
})

document.addEventListener("DOMContentLoaded",appLoad);

// TERMINAL :  

terminalInput.addEventListener("keydown", function(e : KeyboardEvent ) {
    if (e.key === "Enter") {
        const { result } = terminal(terminalInput.value.trim());
        terminalInput.value = '';
        // console(result,"LOG");  // Exibe o objeto no console para depuração
    }
});


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





 





