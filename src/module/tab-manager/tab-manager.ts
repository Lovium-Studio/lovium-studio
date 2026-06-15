
// TAB MANAGER : 

import { getUi } from "../get-ui/get-ui.js";
import { console } from "../console/console.js";
import { contextMenu } from "../context-menu/context-menu.js";
import { ITab, TabLocationOption } from "../../../ts/types.js";
import { gui } from "../gui/gui.js";

// SETUP : 

const tabContentsByLocation: Record<TabLocationOption, HTMLElement[]> = {
    LEFT: [],
    TOP: [], 
    BOTTOM: [],
    RIGHT: []
};

const tabButtonsByLocation: Record<TabLocationOption, HTMLButtonElement[]> = {
    LEFT: [],
    TOP: [], 
    BOTTOM: [],
    RIGHT: []
};

export const tabManager = (tabList: ITab[]): void => {

    tabList.forEach(tab => {

        const tabButton = document.createElement("button");
        tabButton.classList.add("tab-button");
        tabButton.textContent = tab.name;

        let tabLocation: TabLocationOption = tab.location;
        const tabContent = tab.content;

        tabContent.style.display = "none";

        const tabbuttonHandleContextMenu = (event: MouseEvent): void => {

            event.preventDefault();

            const tabButtonContextMenu = [      
                {
                    label: "Go to Left",
                    id: "tabGoToLeft",
                    icon: "ri-skip-left-line",
                    divisor: false,
                },
                {
                    label: "Go to Right",
                    id: "tabGoToRight",
                    icon: "ri-skip-right-line",
                    divisor: false,
                },
                {
                    label: "Go to Top",
                    id: "tabGoToTop",
                    icon: "ri-skip-up-line",
                    divisor: false,
                },
                {
                    label: "Go to Bottom",
                    id: "tabGoToBottom",
                    icon: "ri-skip-down-line",
                    divisor: true,
                },
                {
                    label: "Hide",
                    id: "tabHide",
                    icon: "ri-eye-off-fill",
                    divisor: false,
                },
                {
                    label: "Manage",
                    id: "",
                    icon: "ri-settings-4-fill",
                    divisor: false,
                }
            ];

            contextMenu(tabButtonContextMenu, event);

            const tabHideMenu = getUi("tabHide");

            tabHideMenu.addEventListener("click", function() {
                setTabVisibility(tab.content, tabButton);
            });

            const setTabVisibility = (tabToHide: HTMLElement, tabButtonToHide: HTMLButtonElement): void => {
                tabToHide.remove();
                tabButtonToHide.remove(); 
            };

            const removeTabFromPreviousLocation = (): void => {

                const oldLocation = tabLocation;

                const buttonIndex = tabButtonsByLocation[oldLocation].indexOf(tabButton);
            
                if (buttonIndex !== -1) {
                    tabButtonsByLocation[oldLocation].splice(buttonIndex, 1);
                };

                const contentIndex = tabContentsByLocation[oldLocation].indexOf(tabContent);

                if (contentIndex !== -1) {
                    tabContentsByLocation[oldLocation].splice(contentIndex, 1);
                };

                if (tabButtonsByLocation[oldLocation].length > 0) {
                    const adjacentIndex = buttonIndex > 0 ? buttonIndex - 1 : 0;
                    tabButtonsByLocation[oldLocation][adjacentIndex].click();
                };
            };

            const setTabLocation = (newLocation: TabLocationOption): void => {
                removeTabFromPreviousLocation();

                tabLocation = newLocation;

                switch(newLocation) {
                    case "LEFT":
                        gui.tabManager.tabLeftHeader.appendChild(tabButton);
                        gui.tabManager.tabLeftContainer.appendChild(tabContent);
                        tabButtonsByLocation.LEFT.push(tabButton);
                        tabContentsByLocation.LEFT.push(tabContent);
                        break;
                    case "TOP":

                        if (gui.tabManager.addTabButton) {
                            gui.tabManager.tabTopHeader.insertBefore(tabButton, gui.tabManager.addTabButton);
                        } else {
                            gui.tabManager.tabTopHeader.appendChild(tabButton);
                        };
                        
                        gui.tabManager.tabTopContainer.appendChild(tabContent);
                        tabButtonsByLocation.TOP.push(tabButton);
                        tabContentsByLocation.TOP.push(tabContent);
                    break;
                    case "BOTTOM":
                        gui.tabManager.tabBottomHeader.appendChild(tabButton);
                        gui.tabManager.tabBottomContainer.appendChild(tabContent);
                        tabButtonsByLocation.BOTTOM.push(tabButton);
                        tabContentsByLocation.BOTTOM.push(tabContent);
                        break;
                    case "RIGHT":
                        gui.tabManager.tabRightHeader.appendChild(tabButton);
                        gui.tabManager.tabRightContainer.appendChild(tabContent);
                        tabButtonsByLocation.RIGHT.push(tabButton);
                        tabContentsByLocation.RIGHT.push(tabContent);
                        break;
                }

                tabContentsByLocation[newLocation].forEach(content => {
                    content.style.display = "none";
                });
                tabButtonsByLocation[newLocation].forEach(button => {
                    button.classList.remove("active-tab");
                });

                tabContent.style.display = "flex";
                tabButton.classList.add("active-tab");
            };

            const tabGoToLeft = getUi("tabGoToLeft");
            tabGoToLeft.addEventListener("click", function() {
                setTabLocation("LEFT");
                tab.location = "LEFT";
            });

            const tabGoToRight = getUi("tabGoToRight");
            tabGoToRight.addEventListener("click", function() {
                setTabLocation("RIGHT");
                tab.location = "RIGHT";
            });

            const tabGoToTop = getUi("tabGoToTop");
            tabGoToTop.addEventListener("click", function() {
                setTabLocation("TOP");
                tab.location = "TOP";
            });

            const tabGoToBottom = getUi("tabGoToBottom");
            tabGoToBottom.addEventListener("click", function() {
                setTabLocation("BOTTOM");
                tab.location = "BOTTOM";
            });
        };

        tabButton.addEventListener("contextmenu", tabbuttonHandleContextMenu);

        tabButton.addEventListener("click", function() {
            tabContentsByLocation[tabLocation].forEach(content => {
                content.style.display = "none";
            });

            tabContent.style.display = "flex";

            tabButtonsByLocation[tabLocation].forEach(button => {
                button.classList.remove("active-tab");
            });

            tabButton.classList.add("active-tab");
        });

        if (["LEFT", "RIGHT", "BOTTOM", "TOP"].indexOf(tabLocation) === -1) {
            console(`LAYOUT_INSERT_TAB_ERROR: in tab '${tab.name}', error to insert the tab in the layout. You need to follow the 'location' specifications!`, "error");
            return;
        };

        switch(tabLocation) {
            case "LEFT":
                gui.tabManager.tabLeftHeader.appendChild(tabButton);
                gui.tabManager.tabLeftContainer.appendChild(tabContent);
                tabButtonsByLocation.LEFT.push(tabButton);
                tabContentsByLocation.LEFT.push(tabContent);
                break;
            case "TOP":
                if (gui.tabManager.addTabButton) {
                    gui.tabManager.tabTopHeader.insertBefore(tabButton, gui.tabManager.addTabButton);
                } else {
                    gui.tabManager.tabTopHeader.appendChild(tabButton);
                }
                gui.tabManager.tabTopContainer.appendChild(tabContent);
                tabButtonsByLocation.TOP.push(tabButton);
                tabContentsByLocation.TOP.push(tabContent);
                break;
            case "BOTTOM":
                gui.tabManager.tabBottomHeader.appendChild(tabButton);
                gui.tabManager.tabBottomContainer.appendChild(tabContent);
                tabButtonsByLocation.BOTTOM.push(tabButton);
                tabContentsByLocation.BOTTOM.push(tabContent);
                break;
            case "RIGHT":
                gui.tabManager.tabRightHeader.appendChild(tabButton);
                gui.tabManager.tabRightContainer.appendChild(tabContent);
                tabButtonsByLocation.RIGHT.push(tabButton);
                tabContentsByLocation.RIGHT.push(tabContent);
                break;
        }
    }); 

    (Object.keys(tabContentsByLocation) as TabLocationOption[]).forEach(layout => {
        if (tabContentsByLocation[layout].length > 0) {
            tabContentsByLocation[layout][0].style.display = "flex";
            tabButtonsByLocation[layout][0].classList.add("active-tab");
        };
    }); 
};

