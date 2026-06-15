
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

// CONTEXT MENU : 

import { IContextMenu } from "../../../ts/types.js";
import { gui } from "../gui/gui.js";

export const contextMenu = (buttonList : IContextMenu[] , event : MouseEvent ) : void =>  {

    gui.contextMenu.contextMenuContainer.innerHTML = "";

    buttonList.forEach(function(button) {

        const contextMenuButton = document.createElement("div");
        contextMenuButton.classList.add("context-menu-button");
        contextMenuButton.id = button.id; 

        const contextMenuLabel = document.createElement("span");
        contextMenuLabel.textContent = button.label;

        const contextMenuButtonIcon = document.createElement("i");
        contextMenuButtonIcon.classList.add(`${button.icon}`);

        const contextMenuButtonDivisor = document.createElement("div");
        contextMenuButtonDivisor.classList.add("context-menu-button-divisor")

        if (button.divisor == true){
            contextMenuButton.appendChild(contextMenuButtonDivisor)
        };
        
        contextMenuButton.appendChild(contextMenuButtonIcon);
        contextMenuButton.appendChild(contextMenuLabel);
        gui.contextMenu.contextMenuContainer.appendChild(contextMenuButton);
    });

    const mouseX : number = event.clientX;
    const mouseY : number = event.clientY;

    const setPosition = () : void => {

        gui.contextMenu.contextMenuContainer.style.left = `${mouseX}px`;
        gui.contextMenu.contextMenuContainer.style.top = `${mouseY}px`;

        const contextMenuContainerRect = gui.contextMenu.contextMenuContainer.getBoundingClientRect();

        if (contextMenuContainerRect.bottom > window.innerHeight) {
            gui.contextMenu.contextMenuContainer.style.top = `${window.innerHeight - contextMenuContainerRect.height - 10}px`;
        };

        if (contextMenuContainerRect.right > window.innerWidth) {
            gui.contextMenu.contextMenuContainer.style.left = `${window.innerWidth - contextMenuContainerRect.width - 10}px`;
        };
    };
 
    gui.contextMenu.contextMenuContainer.addEventListener("click", function() {
        gui.contextMenu.contextMenuContainer.style.display = "none";
    });

    gui.contextMenu.contextMenuContainer.style.display = "flex"; 

    document.addEventListener("click", function handleClickOutside(e: MouseEvent) { 
        if (!gui.contextMenu.contextMenuContainer.contains(e.target as Node)) {
            gui.contextMenu.contextMenuContainer.style.display = "none";
            document.removeEventListener("click", handleClickOutside);
        };
    });

    setPosition();
};
   