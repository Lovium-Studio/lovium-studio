

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

// ASSET TAB : 

import { gui } from "../gui/gui.js";

// SETUP : 

let ZOOM_STATE : boolean = false;
let ZOOM_SCALE : number = 1;

export const assetTab = () : void => {

    simpleFileViewer();
};

const simpleFileViewer = () : void => {
        
    const updateZoomAreaPosition = (e : MouseEvent) : void => {

        const containerRect = gui.assetTab.simplePreviewContainer.getBoundingClientRect();
        const mouseX : number = e.clientX - containerRect.left;
        const mouseY : number = e.clientY - containerRect.top;
        const zoomAreaWidth : number = gui.assetTab.simplePreviewContainerZoomArea.offsetWidth;
        const zoomAreaHeight : number = gui.assetTab.simplePreviewContainerZoomArea.offsetHeight;

        gui.assetTab.simplePreviewContainerZoomArea.style.left = `${Math.max(0, Math.min(mouseX - (zoomAreaWidth / 2), containerRect.width - zoomAreaWidth))}px`;
        gui.assetTab.simplePreviewContainerZoomArea.style.top = `${Math.max(0, Math.min(mouseY - (zoomAreaHeight / 2), containerRect.height - zoomAreaHeight))}px`;
    };

    const zoomToPosition = (e : MouseEvent) : void => {

        if (ZOOM_STATE) {
            const mouseX = e.clientX;
            const mouseY = e.clientY;

            gui.assetTab.simpleImagePreview.style.left = `${-mouseX + gui.assetTab.simpleImagePreview.offsetWidth / 2}px`;
            gui.assetTab.simpleImagePreview.style.top = `${-mouseY + gui.assetTab.simpleImagePreview.offsetHeight / 2}px`;
        }
    };

    gui.assetTab.simplePreviewContainer.addEventListener("click", function(e) {

        ZOOM_STATE = !ZOOM_STATE;

        if (ZOOM_STATE) {
            gui.assetTab.simpleImagePreview.style.height = "135%";
            gui.assetTab.simpleImagePreview.style.cursor = "zoom-out";
            zoomToPosition(e); 
        } else {
            gui.assetTab.simpleImagePreview.style.height = "";
            gui.assetTab.simpleImagePreview.style.cursor = "";
            gui.assetTab.simpleImagePreview.style.left = "auto";
            gui.assetTab.simpleImagePreview.style.top = "auto";
        };

    });

    gui.assetTab.simplePreviewContainer.addEventListener("mousemove", function(e) {
        if (ZOOM_STATE) zoomToPosition(e);
    });

    gui.assetTab.simplePreviewContainer.addEventListener("wheel", function(e) {

        if (ZOOM_STATE) {
            const zoomSpeed = 0.1;
            const delta = Math.sign(e.deltaY);
            ZOOM_SCALE = Math.max(0.5, Math.min(2, ZOOM_SCALE - delta * zoomSpeed));

            const containerWidth = gui.assetTab.simplePreviewContainer.offsetWidth;
            const containerHeight = gui.assetTab.simplePreviewContainer.offsetHeight;

            const zoomAreaWidth = Math.min(containerWidth, containerWidth * ZOOM_SCALE);
            const zoomAreaHeight = Math.min(containerHeight, containerHeight * ZOOM_SCALE);

            gui.assetTab.simplePreviewContainerZoomArea.style.width = `${Math.min(containerWidth, zoomAreaWidth)}px`;
            gui.assetTab.simplePreviewContainerZoomArea.style.height = `${Math.min(containerHeight, zoomAreaHeight)}px`;

            updateZoomAreaPosition(e); 
        }
    });

    gui.assetTab.simplePreviewContainer.addEventListener("mouseleave", function() {
        if (ZOOM_STATE) {
            gui.assetTab.simplePreviewContainerZoomArea.style.left = "";
            gui.assetTab.simplePreviewContainerZoomArea.style.top = "";
            gui.assetTab.simplePreviewContainerZoomArea.style.width = "";
            gui.assetTab.simplePreviewContainerZoomArea.style.height = "";
        };
    });
};







