
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

import { IInspectorControlOption, IStatusBadge, ITab } from "../../../typescript/types.js";
import { assetTab } from "../asset-tab/asset-tab.js";
import { codeTab } from "../code-tab/code-tab.js";
import { console } from "../console/console.js";
import { INSPECTOR_ANCHOR_POINT_X_CONTROL, INSPECTOR_APPEARANCE_CONTROL_GROUP, INSPECTOR_NODE_CONTROL_GROUP, INSPECTOR_SPRITE_CONTROL_GROUP, inspectorTab, INESPECTOR_TRANSFORM_CONTROL_GROUP, INSPECTOR_NODE_ID_CONTROL, INSPECTOR_NODE_NAME_CONTROL, INSPECTOR_OPACITY_CONTROL, INSPECTOR_ROTATE_CONTROL, INSPECTOR_SCALE_X_CONTROL, INSPECTOR_SPRITE_DEPTH_CONTROL, INPSECTOR_SPRITE_START_CONTROL, INSPECTOR_SPRITE_VISIBILITY_CONTROL, INSPECTOR_TRANSLATE_X_CONTROL, INSPECTOR_ANIMATION_CONTROL_GROUP, INSPECTOR_SPRITE_ANIMATION_CONTROL, INSPECTOR_ANIMATION_FPS_CONTROL, INSPECTOR_ANIMATION_SPEED_CONTROL, INSPECTOR_ANIMATION_CURRENT_FRAME_CONTROL, INSPECTOR_GRID_CONTROL_GROUP, INSPECTOR_SPRITE_GRID_CONTROL, INSPECTOR_COLLISION_CONTROL_GROUP, INSPECTOR_COLLISION_CONTROL, INSPECTOR_COLLISION_VISIBILITY_CONTROL } from "../inspector-tab/inspector-tab.js";
import { splitter } from "../splitter/splitter.js";
import { timelineTab } from "../timeline-tab/timeline-tab.js";
import { viewport } from "../viewport/viewport.js";
import { statusBar } from "../status-bar/status-bar.js"; 
import { gui } from "../gui/gui.js";
import { tabManager } from "../tab-manager/tab-manager.js";


// APP LOAD :  

export const appLoad = () : void  => { 

    splitter();
    inspectorTab();
    tabLoader();
        viewport({
        gridWidth : 25,
        gridHeight : 25  
    })   
    codeTab();
    assetTab();
    timelineTab();
    statusBarLoader();
    console("Application Started...", "LOG");
    inspectorLoader()

};

// STATUS BAR LOAD : 

const statusBarLoader =  () : void => {

    const statusBarBadgeList : IStatusBadge[] = [
        {
            value: "0,0",
            icon: "ri-mouse-fill",
            isAction: false,
            id: "",
            position: "LEFT"
        },
        {
            value: "00:00:00",
            icon: "ri-timeline-view",
            isAction: false,
            id: "",
            position: "LEFT"
        },
        {
            value: "20MB", 
            icon: "ri-hard-drive-2-fill",
            isAction: false,
            id: "",
            position: "LEFT" 
        },
        { 
            value: "10/01",
            icon: "ri-calendar-todo-fill",
            isAction: true,
            id: "",
            position: "RIGHT"
        },
        {
            value: "01:31",
            icon: "ri-time-fill",
            isAction: true,
            id: "",
            position: "RIGHT"
        }
    ];  

    statusBar(statusBarBadgeList);
};

// TAB LOAD : 

export const tabLoader = () : void => {
 
    const tabList : ITab[] = [
        {
            name: "Animation",
            content: gui.nativeTab.timelineTab,
            id: "TABTL",
            location: "BOTTOM"
        },
        {
            name: "Console",
            content: gui.nativeTab.consoleTab,
            id: "TABTgL",
            location: "BOTTOM"
        },
        {
            name: "Terminal",
            content: gui.nativeTab.terminalTab,
            id: "TABTgL",
            location: "BOTTOM"
        },
        {
            name: "Board",
            content: gui.nativeTab.boardTab,
            id: "TABTgL",
            location: "TOP"
        },
        {
            name: "Inspector",
            content: gui.nativeTab.inspectorTab,
            id: "TABTgL",
            location: "RIGHT"  
        },
        {
            name: "Explorer",
            content: gui.nativeTab.explorerTab,
            id: "TABTgL",
            location: "LEFT"
        },
        {
            name: "Asset",
            content: gui.nativeTab.assetTab,
            id: "TABTgL",
            location: "LEFT"
        },
        {
            name: "Code",
            content: gui.nativeTab.codeTab,
            id: "TABTgL",
            location: "TOP"
        }
    ];

    tabManager(tabList);

};

// INSPECTOR LOAD :

const inspectorLoader = (): void => {
    
    const GROUP_MAP = {
        TRANSFORM: INESPECTOR_TRANSFORM_CONTROL_GROUP,
        SPRITE: INSPECTOR_SPRITE_CONTROL_GROUP,
        NODE : INSPECTOR_NODE_CONTROL_GROUP,
        APPEARANCE : INSPECTOR_APPEARANCE_CONTROL_GROUP,
        ANIMATION : INSPECTOR_ANIMATION_CONTROL_GROUP,
        GRID : INSPECTOR_GRID_CONTROL_GROUP,
        COLLISION : INSPECTOR_COLLISION_CONTROL_GROUP
    };

    const controlList: IInspectorControlOption[] = [
        {
            control: INSPECTOR_SCALE_X_CONTROL,
            groupType: "TRANSFORM"
        },
        {
            control: INSPECTOR_TRANSLATE_X_CONTROL,
            groupType: "TRANSFORM" 
        },
        { 
            control: INSPECTOR_ROTATE_CONTROL,
            groupType: "TRANSFORM" 
        }, 
        { 
            control: INSPECTOR_ANCHOR_POINT_X_CONTROL,
            groupType: "TRANSFORM" 
        },
        {
            control: INPSECTOR_SPRITE_START_CONTROL, 
            groupType: "SPRITE" 
        },
        {
            control: INSPECTOR_SPRITE_DEPTH_CONTROL, 
            groupType: "SPRITE" 
        },
        {
            control: INSPECTOR_NODE_NAME_CONTROL,  
            groupType: "NODE" 
        },
        {
            control: INSPECTOR_NODE_ID_CONTROL, 
            groupType: "NODE" 
        },
        {
            control: INSPECTOR_SPRITE_VISIBILITY_CONTROL, 
            groupType: "SPRITE" 
        }, 
        {
            control: INSPECTOR_OPACITY_CONTROL, 
            groupType: "APPEARANCE" 
        },
        {
            control: INSPECTOR_SPRITE_ANIMATION_CONTROL,  
            groupType: "ANIMATION" 
        },
        {
            control: INSPECTOR_ANIMATION_FPS_CONTROL,  
            groupType: "ANIMATION" 
        },
        {
            control: INSPECTOR_ANIMATION_SPEED_CONTROL, 
            groupType: "ANIMATION" 
        },
        {
            control: INSPECTOR_ANIMATION_CURRENT_FRAME_CONTROL, 
            groupType: "ANIMATION" 
        },
        {
            control: INSPECTOR_SPRITE_GRID_CONTROL, 
            groupType: "GRID" 
        },
        {
            control: INSPECTOR_COLLISION_CONTROL, 
            groupType: "COLLISION" 
        },
        {
            control: INSPECTOR_COLLISION_VISIBILITY_CONTROL, 
            groupType: "COLLISION" 
        }
    ];

    controlList.forEach(control => {
        const g = GROUP_MAP[control.groupType as keyof typeof GROUP_MAP];
        if (g) g.addControl(control.control);
    });

};
