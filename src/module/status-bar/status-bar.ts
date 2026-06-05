
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

// STATUS BAR :  

import { getUi } from "../get-ui/get-ui.js";
import { contextMenu } from "../context-menu/context-menu.js";
import { IStatusBadge } from "../../../typescript/types.js";
import { gui } from "../gui/gui.js";

export const statusBarLoader = ( badgeList : IStatusBadge[] ) : void => {

    badgeList.forEach((badge) => {

        const statusContainer : HTMLDivElement = document.createElement("div");
        statusContainer.classList.add("status-container");

        const statusBarIcon : HTMLElement = document.createElement("i");
        statusBarIcon.classList.add("status-bar-icon", badge.icon);

        const statusBarValue : HTMLSpanElement = document.createElement("span");
        statusBarValue.classList.add("status-bar-value");
        statusBarValue.textContent = badge.value.toString();
        statusBarValue.id = badge.id;

        statusContainer.appendChild(statusBarIcon);
        statusContainer.appendChild(statusBarValue);

        if (badge.position === "LEFT") gui.statusBar.statusBarLeftContainer.appendChild(statusContainer);
        if (badge.position === "RIGHT") gui.statusBar.statusBarRightContainer.appendChild(statusContainer);
        
        if (badge.isAction) statusContainer.classList.add("status-bar-badge");
        
        const statusBarActionHandleContextMenu = (e : MouseEvent) : void => {

            const statusBarContextMenu = [
                {
                    label : "Alternate",
                    id : "statusBarActionAlternate",
                    icon : "ri-arrow-left-right-fill"
                }, 
                {
                    label : "Hide",
                    id : "statusBarActionHide",
                    icon : "ri-eye-off-fill"
                },
                {
                    label : "Create",
                    id : "statusBarActionCreate",
                    icon : "ri-add-fill"
                },
            ]

            contextMenu(statusBarContextMenu,e);

            const actionAlternate = (statusAction : HTMLDivElement) : void => {
                if(badge.position === "LEFT"){
                    gui.statusBar.statusBarRightContainer.appendChild(statusAction);
                    badge.position = "LEFT";
                }else if (badge.position === "RIGHT"){
                    gui.statusBar.statusBarLeftContainer.appendChild(statusAction);
                    badge.position = "LEFT";
                };
            };

            const actionHide = (statusAction : HTMLDivElement) : void => {
                statusAction.style.display = "none";
            };

            const contextMenuActionAlternate = getUi("statusBarActionAlternate");
            contextMenuActionAlternate.addEventListener("click",function(){
                actionAlternate(statusContainer);
            });

            const contextMenuActionHide = getUi("statusBarActionHide");

            contextMenuActionHide.addEventListener("click",function(){
                actionHide(statusContainer); 
            });
        };

        statusContainer.addEventListener("contextmenu",statusBarActionHandleContextMenu)

    });
};
