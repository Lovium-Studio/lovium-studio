
// TOOLTIP : 

import { gui } from "../gui/gui.js";

export const tooltip = (tool : HTMLElement, info : string ,event : MouseEvent) : void => {

    gui.tooltip.tooltipLabel.textContent = info;

    tool.addEventListener("mouseleave", ()=> gui.tooltip.tooltipContainer.style.display = "none");
          
    const mouseX : number = event.clientX;
    const mouseY : number = event.clientY;

    gui.tooltip.tooltipContainer.style.transform = `translate(${mouseX}px ${mouseY}px)`;

};
