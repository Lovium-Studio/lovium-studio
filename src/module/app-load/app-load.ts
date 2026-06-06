
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
import { inspectorTab } from "../inspector-tab/inspector-tab.js";
import { splitter } from "../splitter/splitter.js";
import { timelineTab } from "../timeline-tab/timeline-tab.js";
import { viewport } from "../viewport/viewport.js";
import { statusBar } from "../status-bar/status-bar.js"; 
import { gui } from "../gui/gui.js";
import { tabManager } from "../tab-manager/tab-manager.js";
import { NumberControl, TextControl } from "../control/control.js";
import { ControlGroup } from "../control-group/control-group.js";

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

const inspectorTransformControlGroup: ControlGroup = new ControlGroup({
    label: "Transform",
    container: gui.nativeTab.inspectorTab
});

const scaleXControl: NumberControl = new NumberControl({
    label: "Scale X"
});

const scaleYControl: NumberControl = new NumberControl({
    label: "Scale Y"
});

scaleXControl.joinControl(scaleYControl);

const controlList: IInspectorControlOption[] = [
    {
        type: "NUMBER_CONTROL",
        control: scaleXControl,
        groupType: "TRANSFORM"
    }
];

const groupMap = {
    TRANSFORM: inspectorTransformControlGroup
};

const inspectorLoader = (): void => {
    controlList.forEach(control => {
        const group = groupMap[control.groupType as keyof typeof groupMap];
        if (group) group.addControl(control.control);
    });

};
