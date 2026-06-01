
// WINDOW MENU :

import { IWindowMenu } from "../../../typescript/types.js";
import { gui } from "../gui/gui.js";

export const windowMenu = (menuButton : HTMLButtonElement, buttonList : IWindowMenu[] ) : void =>  {

    gui.windowMenu.windowMenuContainer.innerHTML = "";
    gui.windowMenu.windowMenuContainer.style.display = "flex"; 

    function hideWindowMenuContainer(event : MouseEvent ) {
        if (!gui.windowMenu.windowMenuContainer.contains(event.target as Node) && event.target !== gui.windowMenu.windowMenuBar) {
            gui.windowMenu.windowMenuContainer.style.display = "none";
            document.removeEventListener("click", hideWindowMenuContainer);
        };
    };

    gui.windowMenu.windowMenuContainer.addEventListener("click", function(event : MouseEvent ) {
        event.stopPropagation();
        gui.windowMenu.windowMenuContainer.style.display = "none";
    });
 
    menuButton.addEventListener("click", function(event) {
        event.stopPropagation();
        gui.windowMenu.windowMenuContainer.style.display = "flex";
        updatePosition();
        document.addEventListener("click", hideWindowMenuContainer);
    });

    function updatePosition() {
        const menuRect = menuButton.getBoundingClientRect();
        gui.windowMenu.windowMenuContainer.style.left = `${menuRect.left}px`;
    };

    buttonList.forEach( button=>{

        const windowMenuButton = document.createElement("button");
        windowMenuButton.classList.add("window-menu");
        windowMenuButton.textContent = button.label;

        if(button.id) windowMenuButton.id = button.id;

        gui.windowMenu.windowMenuContainer.appendChild(windowMenuButton);

        if (button.divisor) {
            const windowMenuSeparator = document.createElement("div");
            windowMenuSeparator.classList.add("window-menu-separator");
            gui.windowMenu.windowMenuContainer.appendChild(windowMenuSeparator);
        };
    });

    updatePosition();
};
