
// TAB LOAD : 

import { tabManager } from "../tab-manager/tab-manager.js";
import { ITab } from "../../../typescript/types.js";
import { gui } from "../gui/gui.js";

export const tabLoad = () : ITab[] => {
 
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

    return tabList;
    
};