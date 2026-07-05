

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

import { AssetFileViewerType } from "../../../ts/types.js";
import { gui } from "../gui/gui.js";

// SETUP : 

let ZOOM_STATE : boolean = false;
let ZOOM_SCALE : number = 1;

export const assetTab = () : void => {

    return;
};

let selectedImagePreview : number = 0;
let imagePreviewMax : number = 0;
let imagePreviewMin : number = 0;
let imageList : string | string[] = [];

export const assetFileViewer = ( src : string | string[] , type : AssetFileViewerType ) : void => {
        
    if(type === "IMG"){

        selectedImagePreview = 0;
        imagePreviewMax = src.length;  
        imageList = src;

        assetImageLoad(src[selectedImagePreview])

        return;
    };

};

gui.assetTab.assetTabImageNext.addEventListener("click",()=>{
    if(selectedImagePreview >= imagePreviewMax -1) return;
    selectedImagePreview++;
    assetImageLoad(imageList[selectedImagePreview])    
});  

gui.assetTab.assetTabImagePrev.addEventListener("click",()=>{
    if(selectedImagePreview <= imagePreviewMin) return;
    selectedImagePreview--;
    assetImageLoad(imageList[selectedImagePreview])
});  
 
const assetSlotRange = ( current : number , max : number ) : void => {
    gui.assetTab.assetTabAssetSlotRange.textContent = current + " / " + (max - 1);
};

const assetImageLoad = ( src : string ) : void => {  
    gui.assetTab.assetTabImagePreview.src = src;
    assetNameLoad(src);
    assetSlotRange(selectedImagePreview,imagePreviewMax)
};

const assetNameLoad = ( src : string ) : void => {
    const name = src.split("/").pop() as string;
    gui.assetTab.assetTabAssetName.textContent = name.toString();
};

const updateZoomAreaPosition = (event : MouseEvent) : void => {

    const containerRect = gui.assetTab.simplePreviewContainer.getBoundingClientRect();
    const mouseX : number = event.clientX - containerRect.left;
    const mouseY : number = event.clientY - containerRect.top;
    const zoomAreaWidth : number = gui.assetTab.simplePreviewContainerZoomArea.offsetWidth;
    const zoomAreaHeight : number = gui.assetTab.simplePreviewContainerZoomArea.offsetHeight;

    gui.assetTab.simplePreviewContainerZoomArea.style.left = `${Math.max(0, Math.min(mouseX - (zoomAreaWidth / 2), containerRect.width - zoomAreaWidth))}px`;
    gui.assetTab.simplePreviewContainerZoomArea.style.top = `${Math.max(0, Math.min(mouseY - (zoomAreaHeight / 2), containerRect.height - zoomAreaHeight))}px`;
};

const zoomToPosition = (event : MouseEvent) : void => {

    if (ZOOM_STATE) {
        const mouseX = event.clientX;
        const mouseY = event.clientY;

        gui.assetTab.assetTabImagePreview.style.left = `${-mouseX + gui.assetTab.assetTabImagePreview.offsetWidth / 2}px`;
        gui.assetTab.assetTabImagePreview.style.top = `${-mouseY + gui.assetTab.assetTabImagePreview.offsetHeight / 2}px`;
    }
};  

gui.assetTab.simplePreviewContainer.addEventListener("click", (event : MouseEvent) => {

    ZOOM_STATE = !ZOOM_STATE;

    if (ZOOM_STATE) {
        gui.assetTab.assetTabImagePreview.style.height = "135%";
        gui.assetTab.assetTabImagePreview.style.cursor = "zoom-out";
        zoomToPosition(event); 
    } else {
        gui.assetTab.assetTabImagePreview.style.height = "";
        gui.assetTab.assetTabImagePreview.style.cursor = "";
        gui.assetTab.assetTabImagePreview.style.left = "auto";
        gui.assetTab.assetTabImagePreview.style.top = "auto";
    };

});

gui.assetTab.simplePreviewContainer.addEventListener("mousemove", (event : MouseEvent) => {
    if (ZOOM_STATE) zoomToPosition(event);
});

gui.assetTab.simplePreviewContainer.addEventListener("wheel", (event : WheelEvent) => {

    if (ZOOM_STATE) {
        const zoomSpeed = 0.1;
        const delta = Math.sign(event.deltaY);
        ZOOM_SCALE = Math.max(0.5, Math.min(2, ZOOM_SCALE - delta * zoomSpeed));

        const containerWidth = gui.assetTab.simplePreviewContainer.offsetWidth;
        const containerHeight = gui.assetTab.simplePreviewContainer.offsetHeight;

        const zoomAreaWidth = Math.min(containerWidth, containerWidth * ZOOM_SCALE);
        const zoomAreaHeight = Math.min(containerHeight, containerHeight * ZOOM_SCALE);

        gui.assetTab.simplePreviewContainerZoomArea.style.width = `${Math.min(containerWidth, zoomAreaWidth)}px`;
        gui.assetTab.simplePreviewContainerZoomArea.style.height = `${Math.min(containerHeight, zoomAreaHeight)}px`;

        updateZoomAreaPosition(event); 
    }
});

gui.assetTab.simplePreviewContainer.addEventListener("mouseleave",()=> {
    if (ZOOM_STATE) {
        gui.assetTab.simplePreviewContainerZoomArea.style.left = "";
        gui.assetTab.simplePreviewContainerZoomArea.style.top = "";
        gui.assetTab.simplePreviewContainerZoomArea.style.width = "";
        gui.assetTab.simplePreviewContainerZoomArea.style.height = "";
    };
});







