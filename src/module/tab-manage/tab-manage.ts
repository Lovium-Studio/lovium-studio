import { getUi } from "../get-ui/get-ui.js";
import { console } from "../console/console.js";
import { contextMenu } from "../context-menu/context-menu.js";

const uiLeftContainerTabRow = getUi("ui-left-container-tab-row");
const uiTopContainerTabRow = getUi("ui-top-container-tab-row");
const uiBottomContainerTabRow = getUi("ui-bottom-container-tab-row");
const uiRightContainerTabRow = getUi("ui-right-container-tab-row");

const uiLeftContainer = getUi("tab-left");
const uiTopContainer = getUi("tab-top");
const uiBottomContainer = getUi("tab-bottom");
const uiRightContainer = getUi("tab-right");

const addTabButton = getUi("add-tab-button");

const tabContentsByLocation = {
    left: [],
    top: [],
    bottom: [],
    right: []
};

const tabButtonsByLocation = {
    left: [],
    top: [], 
    bottom: [],
    right: []
};

export function tabManage(tabList) {
    tabList.forEach(tab => {

        const tabButton = document.createElement("button");
        tabButton.classList.add("tab-button");
        tabButton.textContent = tab.name;

        let tabLocation = tab.location;
        const tabContent = tab.content;

        tabContent.style.display = "none";

        function tabbuttonHandleContextMenu() {
            const tabButtonContextMenu = [      
                {
                    name: "Go to Left",
                    id: "tabGoToLeft",
                    icon: "ri-skip-left-line",
                    divisor: false,
                },
                {
                    name: "Go to Right",
                    id: "tabGoToRight",
                    icon: "ri-skip-right-line",
                    divisor: false,
                },
                {
                    name: "Go to Top",
                    id: "tabGoToTop",
                    icon: "ri-skip-up-line",
                    divisor: false,
                },
                {
                    name: "Go to Bottom",
                    id: "tabGoToBottom",
                    icon: "ri-skip-down-line",
                    divisor: true,
                },
                {
                    name: "Hide",
                    id: "tabHide",
                    icon: "ri-eye-off-fill",
                    divisor: false,
                },
                {
                    name: "Manage",
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

            function setTabVisibility(tabToHide, tabButtonToHide) {
                tabToHide.remove();
                tabButtonToHide.remove();
            }

            function removeTabFromPreviousLocation() {
                const oldLocation = tabLocation;

                const buttonIndex = tabButtonsByLocation[oldLocation].indexOf(tabButton);
                if (buttonIndex !== -1) {
                    tabButtonsByLocation[oldLocation].splice(buttonIndex, 1);
                }

                const contentIndex = tabContentsByLocation[oldLocation].indexOf(tabContent);
                if (contentIndex !== -1) {
                    tabContentsByLocation[oldLocation].splice(contentIndex, 1);
                }

                if (tabButtonsByLocation[oldLocation].length > 0) {
                    const adjacentIndex = buttonIndex > 0 ? buttonIndex - 1 : 0;
                    tabButtonsByLocation[oldLocation][adjacentIndex].click();
                }
            }

            function setTabLocation(newLocation) {
                removeTabFromPreviousLocation();

                tabLocation = newLocation;

                switch(newLocation) {
                    case "left":
                        uiLeftContainerTabRow.appendChild(tabButton);
                        uiLeftContainer.appendChild(tabContent);
                        tabButtonsByLocation.left.push(tabButton);
                        tabContentsByLocation.left.push(tabContent);
                        break;
                    case "top":
                        uiTopContainerTabRow.insertBefore(tabButton, addTabButton);
                        uiTopContainer.appendChild(tabContent);
                        tabButtonsByLocation.top.push(tabButton);
                        tabContentsByLocation.top.push(tabContent);
                        break;
                    case "bottom":
                        uiBottomContainerTabRow.appendChild(tabButton);
                        uiBottomContainer.appendChild(tabContent);
                        tabButtonsByLocation.bottom.push(tabButton);
                        tabContentsByLocation.bottom.push(tabContent);
                        break;
                    case "right":
                        uiRightContainerTabRow.appendChild(tabButton);
                        uiRightContainer.appendChild(tabContent);
                        tabButtonsByLocation.right.push(tabButton);
                        tabContentsByLocation.right.push(tabContent);
                        break;
                }

                // Atualizar visibilidade e estado ativo
                tabContentsByLocation[newLocation].forEach(content => {
                    content.style.display = "none";
                });
                tabButtonsByLocation[newLocation].forEach(button => {
                    button.classList.remove("active-tab");
                });

                tabContent.style.display = "flex";
                tabButton.classList.add("active-tab");

            }

            const tabGoToLeft = getUi("tabGoToLeft");
            tabGoToLeft.addEventListener("click", function() {
                setTabLocation("left");
                tab.location = "left";
            });

            const tabGoToRight = getUi("tabGoToRight");
            tabGoToRight.addEventListener("click", function() {
                setTabLocation("right");
                tab.location = "right";
            });

            const tabGoToTop = getUi("tabGoToTop");
            tabGoToTop.addEventListener("click", function() {
                setTabLocation("top");
                tab.location = "top";
            });

            const tabGoToBottom = getUi("tabGoToBottom");
            tabGoToBottom.addEventListener("click", function() {
                setTabLocation("bottom");
                tab.location = "bottom";
            });
        }

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

        if (["left", "right", "bottom", "top"].indexOf(tabLocation) === -1) {
            console(`LAYOUT_INSERT_TAB_ERROR: in tab '${tab.name}', error to insert the tab in the layout. You need to follow the 'location' specifications!`, "error");
            return;
        }

        switch(tabLocation) {
            case "left":
                uiLeftContainerTabRow.appendChild(tabButton);
                uiLeftContainer.appendChild(tabContent);
                tabButtonsByLocation.left.push(tabButton);
                tabContentsByLocation.left.push(tabContent);
                break;
            case "top":
                uiTopContainerTabRow.insertBefore(tabButton, addTabButton);
                uiTopContainer.appendChild(tabContent);
                tabButtonsByLocation.top.push(tabButton);
                tabContentsByLocation.top.push(tabContent);
                break;
            case "bottom":
                uiBottomContainerTabRow.appendChild(tabButton);
                uiBottomContainer.appendChild(tabContent);
                tabButtonsByLocation.bottom.push(tabButton);
                tabContentsByLocation.bottom.push(tabContent);
                break;
            case "right":
                uiRightContainerTabRow.appendChild(tabButton);
                uiRightContainer.appendChild(tabContent);
                tabButtonsByLocation.right.push(tabButton);
                tabContentsByLocation.right.push(tabContent);
                break;
        }
    }); 

    Object.keys(tabContentsByLocation).forEach(layout => {
        if (tabContentsByLocation[layout].length > 0) {
            tabContentsByLocation[layout][0].style.display = "flex";
            tabButtonsByLocation[layout][0].classList.add("active-tab");
        }
    });
}
