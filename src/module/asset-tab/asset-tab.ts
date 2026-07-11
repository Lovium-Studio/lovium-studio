

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

import { AssetFileViewerType } from "../../ts/types.js"; 
import { FlashButton, FlashRow, FlashTable } from "../flash-table/flash-table.js";
// import { ASSET_TAB_HTML } from "../../static-ui/asset-tab-html/asset-tab-html.js";
import { gui } from "../gui/gui.js";
import { SCENE_2D_SPRITE_NODE_ANIMATE } from "../sprite-node-animate/sprite-node-animate.js";
import { fileApi } from "../../ipc/file-ipc/file-ipc.js";   

// SETUP : 

let ZOOM_STATE : boolean = false;
let ZOOM_SCALE : number = 1;

export const assetTab = () : void => { 

    return;
};

    // ASSET_TAB_HTML();   


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

gui.assetTab?.assetTabImageNext?.addEventListener("click",()=>{
    if(selectedImagePreview >= imagePreviewMax -1) return;
    selectedImagePreview++;
    assetImageLoad(imageList[selectedImagePreview])     
});    

console.log(gui.assetTab.assetTabImageNext)   
 
gui.assetTab?.assetTabImagePrev?.addEventListener("click",()=>{
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

gui.assetTab.simplePreviewContainer?.addEventListener("click", (event : MouseEvent) => {

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

gui.assetTab.simplePreviewContainer?.addEventListener("mousemove", (event : MouseEvent) => {
    if (ZOOM_STATE) zoomToPosition(event);
});

gui.assetTab.simplePreviewContainer?.addEventListener("wheel", (event : WheelEvent) => {

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

gui.assetTab.simplePreviewContainer?.addEventListener("mouseleave",()=> {
    if (ZOOM_STATE) {
        gui.assetTab.simplePreviewContainerZoomArea.style.left = "";
        gui.assetTab.simplePreviewContainerZoomArea.style.top = "";
        gui.assetTab.simplePreviewContainerZoomArea.style.width = "";
        gui.assetTab.simplePreviewContainerZoomArea.style.height = "";
    };
});

// SPRITE NODE FLASH TABLE : 

const SPRITE_NODE_FLASH_TABLE : FlashTable = new FlashTable(gui.nativeTab.assetTab);

export const SPRITE_NODE_NAME_ROW : FlashRow = new FlashRow({
    name : "Name",
    value : "image.png" 
});

export const SPRITE_NODE_SIZE_ROW : FlashRow = new FlashRow({
    name : "Size",
    value : "40x40"
});

export const SPRITE_NODE_SLOT_ROW : FlashRow = new FlashRow({
    name : "Slot",
    value : "0/10"
});

export const SPRITE_NODE_PLAY_BUTTON : FlashButton = new FlashButton({
    name : "Play",
    icon : "ri-play-circle-fill",
    onClick : ()=> {
        SCENE_2D_SPRITE_NODE_ANIMATE.start()  
    }
});

export const SPRITE_NODE_STOP_BUTTON : FlashButton = new FlashButton({
    name : "Stop", 
    icon : "ri-stop-circle-fill",
    onClick : ()=> {
        SCENE_2D_SPRITE_NODE_ANIMATE.stop()  
    } 
});

const SPRITE_NODE_DELETE_BUTTON : FlashButton = new FlashButton({
    name : "Delete",
    icon : "ri-indeterminate-circle-fill"
});

const SPRITE_NODE_FLASH_TABLE_NAME : string = "asset-tab-sprite-node-flash-table"

SPRITE_NODE_FLASH_TABLE.register(SPRITE_NODE_FLASH_TABLE_NAME); 

SPRITE_NODE_FLASH_TABLE.append(SPRITE_NODE_NAME_ROW,SPRITE_NODE_FLASH_TABLE_NAME);
SPRITE_NODE_FLASH_TABLE.append(SPRITE_NODE_SIZE_ROW,SPRITE_NODE_FLASH_TABLE_NAME);
SPRITE_NODE_FLASH_TABLE.append(SPRITE_NODE_SLOT_ROW,SPRITE_NODE_FLASH_TABLE_NAME);

SPRITE_NODE_FLASH_TABLE.append(SPRITE_NODE_PLAY_BUTTON,SPRITE_NODE_FLASH_TABLE_NAME);
SPRITE_NODE_FLASH_TABLE.append(SPRITE_NODE_STOP_BUTTON,SPRITE_NODE_FLASH_TABLE_NAME);
SPRITE_NODE_FLASH_TABLE.append(SPRITE_NODE_DELETE_BUTTON,SPRITE_NODE_FLASH_TABLE_NAME);

SPRITE_NODE_FLASH_TABLE.switch(SPRITE_NODE_FLASH_TABLE_NAME);  

const loadFiles = async (): Promise<void> => {
    const files = await fileApi.readDirectory("C:\\lovium-project");
    console.log(files); 
};

loadFiles();
// cc(files)       

// console.log(files[0].name);
// console.log(files[0].isDirectory());
// console.log(files[0].isFile());