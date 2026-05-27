












// STATUS BAR : 

import { getUi } from "../get-ui/get-ui.js";
import { contextMenu } from "../context-menu/context-menu.js";

const statusBarActions = [
    {
        value: "0,0",
        icon: "ri-mouse-fill",
        isAction: false,
        id: "",
        position: "left"
    },
    {
        value: "00:00:00",
        icon: "ri-timeline-view",
        isAction: false,
        id: "",
        position: "left"
    },
    {
        value: "20MB", 
        icon: "ri-hard-drive-2-fill",
        isAction: false,
        id: "",
        position: "left" 
    },
    { 
        value: "10/01",
        icon: "ri-calendar-todo-fill",
        isAction: true,
        id: "",
        position: "right"
    },
    {
        value: "01:31",
        icon: "ri-time-fill",
        isAction: true,
        id: "",
        position: "right"
    }
];  

export function statusBar() {

    const statusBarLeftContainer = getUi("status-bar-left-container");
    const statusBarRightContainer = getUi("status-bar-right-container");

    statusBarActions.forEach(function(action) {

        const statusContainer = document.createElement("div");
        statusContainer.classList.add("status-container");

        const statusBarIcon = document.createElement("i");
        statusBarIcon.classList.add("status-bar-icon", action.icon);

        const statusBarValue = document.createElement("span");
        statusBarValue.classList.add("status-bar-value");
        statusBarValue.textContent = action.value;
        statusBarValue.id = action.id;

        statusContainer.appendChild(statusBarIcon);
        statusContainer.appendChild(statusBarValue);

        if (action.position === "left") {
            statusBarLeftContainer.appendChild(statusContainer);
        } else if (action.position === "right") {
            statusBarRightContainer.appendChild(statusContainer);
        }

        if (action.isAction) {
            statusContainer.classList.add("status-bar-action");
        }

        function statusBarActionHandleContextMenu(){

            const statusBarContextMenu = [
                {
                    name : "Alternate",
                    id : "statusBarActionAlternate",
                    icon : "ri-arrow-left-right-fill"
                }, 
                {
                    name : "Hide",
                    id : "statusBarActionHide",
                    icon : "ri-eye-off-fill"
                },
                {
                    name : "Create",
                    id : "statusBarActionCreate",
                    icon : "ri-add-fill"
                },
            ]

            contextMenu(statusBarContextMenu,event);

            function actionAlternate(statusAction){
                if(action.position === "left"){
                    statusBarRightContainer.appendChild(statusAction);
                    action.position = "right";
                }else if (action.position === "right"){
                    statusBarLeftContainer.appendChild(statusAction);
                    action.position = "left";
                }
            }

            function actionHide(statusAction){
                statusAction.style.display = "none";
            }

            const contextMenuActionAlternate = getUi("statusBarActionAlternate");
            contextMenuActionAlternate.addEventListener("click",function(){
                actionAlternate(statusContainer);
            })

            const contextMenuActionHide = getUi("statusBarActionHide");
            contextMenuActionHide.addEventListener("click",function(){
                actionHide(statusContainer); 
            })
        }

        statusContainer.addEventListener("contextmenu",statusBarActionHandleContextMenu)

    });
}
