
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

// DROPDOWN : 

import { IDropdown } from "../../../ts/types.js";
import { gui } from "../gui/gui.js";
import { shild } from "../shild/shild.js";

// SETUP : 

let DROPDOWN_TIMEOUT : number;

export const dropdown = (dropdownTo : HTMLElement ,buttonList : IDropdown[]) : void => {

    gui.dropdown.dropdownContainer.innerHTML = ""; 
    gui.dropdown.dropdownContainer.style.display = "flex";

    shild({visible: true, opaque: false});

    let dropdownToRect = dropdownTo.getBoundingClientRect();
    let uiDropdownRect = gui.dropdown.dropdownContainer.getBoundingClientRect();
    let mainViewRect = gui.mainContainer.getBoundingClientRect();

    const getHeight = dropdownToRect.height;
    const getTop = dropdownToRect.top; 
    const setToBottom = getTop + getHeight + 3;

    gui.dropdown.dropdownContainer.style.left = `${dropdownToRect.left}px`;
    gui.dropdown.dropdownContainer.style.width = `${dropdownToRect.width - 2}px`;
    gui.dropdown.dropdownContainer.style.top = `${setToBottom}px`;

    const mainViewHeight = mainViewRect.height;
    const newDropdownHeight = gui.mainContainer.offsetHeight - gui.dropdown.dropdownContainer.offsetTop - 29;

    if (uiDropdownRect.bottom < gui.mainContainer.offsetHeight) {
        gui.dropdown.dropdownContainer.style.height = "auto";
    }else {
        gui.dropdown.dropdownContainer.style.height = `${newDropdownHeight}px`;
    };

    if (DROPDOWN_TIMEOUT) clearTimeout(DROPDOWN_TIMEOUT);

    DROPDOWN_TIMEOUT = setTimeout(() => {
        document.addEventListener('click', handleClickOutside);
    }, 100);

    buttonList.forEach(button => {

        const dropdownButton = document.createElement("button");
        dropdownButton.classList.add("ui-dropdown-button");
        dropdownButton.textContent = button.label;

        if(button.id) dropdownButton.id = button.id ;
    
        const dropdownIcon = document.createElement("i");
        dropdownIcon.classList.add(button.icon);
    
        dropdownButton.appendChild(dropdownIcon);
        gui.dropdown.dropdownContainer.appendChild(dropdownButton);

    });
 
    window.addEventListener('resize', () => {
        gui.dropdown.dropdownContainer.style.display = "none";
        shild({visible: false, opaque: false});
    });
    
};

const handleClickOutside = (event : MouseEvent ) : void => {
    if (!gui.dropdown.dropdownContainer.contains(event.target as Node)) {
        gui.dropdown.dropdownContainer.style.display = "none";
        shild({visible: false, opaque: false});
        document.removeEventListener('click', handleClickOutside);
    }else{
        gui.dropdown.dropdownContainer.style.display = "none";
        shild({visible: false, opaque: false});
        document.removeEventListener('click', handleClickOutside);
    };
};

