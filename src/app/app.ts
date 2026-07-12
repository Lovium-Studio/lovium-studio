
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

import { appLoad } from "../module/app-load/app-load.js";
import { getUi } from "../module/get-ui/get-ui.js";
import { gui } from "../module/gui/gui.js";
import { windowMenu } from "../module/menu-window/window-menu.js";
import { TreeView } from "../module/tree-view/tree-view.js";
import { ITreeView } from "../ts/types.js";
import { fileApi } from './../ipc/file-ipc/file-ipc.js';

// APP LOAD : 

document.addEventListener("DOMContentLoaded",appLoad);  

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


const treeData: ITreeView[] = [
    {
        type: "FOLDER",
        name: "Sprites Folder",
        path: "/sprites",
        children: [
            { type: "FILE", name: "player.png", path: "/sprites/player.png", children: [] },
            { 
                type: "FOLDER", 
                name: "Enemies", 
                path: "/sprites/enemies",  
                children: [
                    { type: "FILE", name: "goblin.png", path: "/sprites/enemies/goblin.png", children: [] }
                ]
            }
        ]
    }
];

const loadFiles = async (): Promise<void> => {
    const files = await fileApi.readDirectory("C:\\lovium-project");
    const tree = new TreeView(files, gui.nativeTab.explorerTab);
    console.log(files); 
};

loadFiles();

