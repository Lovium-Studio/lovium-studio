










// TOOLTIP : 

import { getUi } from "../get-ui/get-ui.js";

export function tooltip(tool, info,event) {

    const tooltipEl = getUi("tooltip");
    const tooltipInfo = getUi("tooltip-info");

    tooltipInfo.textContent = info;

    tool.addEventListener("mouseleave", function() {
        tooltipEl.style.display = "none";
    });       

        const mouseX = event.clientX;
        const mouseY = event.clientY;

        tooltipEl.style.left = `${mouseX}px`;
        tooltipEl.style.top = `${mouseY}px`;

}
