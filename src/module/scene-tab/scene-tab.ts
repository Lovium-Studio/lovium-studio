
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

// SCENE TAB : 

import { IScene2dOption, SceneNode } from "../../../ts/types.js";
import { SCENE_2D_GRID_2D } from "../2d-grid/2d-grid.js";
import { console } from "../console/console.js";
import { SCENE_2D_CONTEXT } from "../scene-2d-context/scene-2d-context.js";
import { SCENE_2D_CROSS_GUIDE } from "../cross-guide/cross-guide.js";
import { gui } from "../gui/gui.js";
import { INPSECTOR_SPRITE_START_CONTROL, INSPECTOR_OPACITY_CONTROL, INSPECTOR_ROTATE_CONTROL, INSPECTOR_SCALE_X_CONTROL, INSPECTOR_SCALE_Y_CONTROL, INSPECTOR_TRANSLATE_X_CONTROL, INSPECTOR_TRANSLATE_Y_CONTROL } from "../inspector-tab/inspector-tab.js";
import { nodeProcessor } from "../node-processor/node-processor.js";
import { SCENE_2D_RESIZE_HANDLE } from "../resize-handle/resize-handle.js";
import { SCENE_2D_SAFE_AREA } from "../safe-area-2d/safe-area-2d.js";
import { SCENE_2D } from "../scene-2d/scene-2d.js";
import { SCENE_2D_SELECT_REGION_2D } from "../select-region-2d/select-region-2d.js";
import { SCENE_2D_VIEWPORT_2D } from "../viewport-2d/viewport-2d.js";
import { Toggle } from "../../util/toggle/toggle.js";
import { getCSSVar } from "../anchor-node/theme/theme.js";
import { SCENE_2D_ORIGIN_2D } from "../origin-2d/origin-2d.js";
import { GuideLabel } from "../guide-label/guide-label.js";

const SCENE_NODE_LIST = SCENE_2D.getNodeList();

SCENE_2D.insertSceneOverlayBelow(SCENE_2D_GRID_2D);
SCENE_2D.insertSceneBelow(SCENE_2D_SAFE_AREA); 

SCENE_2D.insertSceneAbove(SCENE_2D_CROSS_GUIDE);  
SCENE_2D.insertSceneAbove(SCENE_2D_SELECT_REGION_2D);    
SCENE_2D.insertSceneAbove(SCENE_2D_RESIZE_HANDLE);    
 
let sceneSelectedNode : SceneNode | null; 
let lastSelectedNode : SceneNode | null;    

const resizeCanvas = (): void => {
    const rect = gui.sceneTab.sceneCanvasContainer.getBoundingClientRect();
    gui.sceneTab.sceneCanvas.width = rect.width - 1;
    gui.sceneTab.sceneCanvas.height = rect.height - 2; 
    SCENE_2D_VIEWPORT_2D.setWidth(rect.width - 1);
    SCENE_2D_VIEWPORT_2D.setHeight(rect.height - 2);
}; 

gui.sceneTab.scene2dZoomInButton.addEventListener("click",()=>{
    SCENE_2D_VIEWPORT_2D.zoomIn();
})

gui.sceneTab.scene2dZoomOutButton.addEventListener("click",()=>{
    SCENE_2D_VIEWPORT_2D.zoomOut();
})

INPSECTOR_SPRITE_START_CONTROL.onWrite((value)=> { 
    SCENE_2D_VIEWPORT_2D.setOffsetX(Number(value) ) 
})


let isDragging = false;
let lastMouseX = 0;
let lastMouseY = 0;

gui.sceneTab.sceneCanvasContainer.addEventListener("mousedown", (e: MouseEvent) => {

    if (e.button !== 2) return;

    isDragging = true;

    lastMouseX = e.clientX;
    lastMouseY = e.clientY;

    gui.sceneTab.sceneCanvasContainer.style.cursor = "move";  

});

gui.sceneTab.sceneCanvasContainer.addEventListener("contextmenu", (e: MouseEvent) => {
    e.preventDefault();
});
// VIEWPORT ZOOM (MOUSE WHEEL, ANCORADO NO CURSOR) :

gui.sceneTab.sceneCanvasContainer.addEventListener("wheel", (e: WheelEvent) => {

    e.preventDefault();

    const rect = gui.sceneTab.sceneCanvasContainer.getBoundingClientRect();

    const mouseX = e.clientX - rect.left;
    const mouseY = e.clientY - rect.top;

    SCENE_2D_VIEWPORT_2D.setZoomOffsetX(mouseX);
    SCENE_2D_VIEWPORT_2D.setZoomOffsetY(mouseY);

    if (e.deltaY < 0) {
        SCENE_2D_VIEWPORT_2D.zoomIn();
    } else {
        SCENE_2D_VIEWPORT_2D.zoomOut();
    };

});

document.addEventListener("mousemove", (e: MouseEvent) => {

    if (!isDragging) return;

    const dx = e.clientX - lastMouseX;
    const dy = e.clientY - lastMouseY;

    lastMouseX = e.clientX;
    lastMouseY = e.clientY; 

    const zoom = SCENE_2D_VIEWPORT_2D.currentZoom;

    const value = SCENE_2D_VIEWPORT_2D.offsetX + (dx / zoom);
    const valueY = SCENE_2D_VIEWPORT_2D.offsetY + (dy / zoom);
 
    SCENE_2D_VIEWPORT_2D.setOffsetX(Number(value));
    SCENE_2D_VIEWPORT_2D.setOffsetY(Number(valueY));

});

document.addEventListener("mouseup", (e: MouseEvent) => {

    if (e.button !== 2) return;
 
    isDragging = false;

    gui.sceneTab.sceneCanvasContainer.style.cursor = "default";

});

const canvasSizeObserver = new ResizeObserver(resizeCanvas)
canvasSizeObserver.observe(gui.sceneTab.sceneCanvasContainer);

const sceneTemlate : IScene2dOption = {
    name : "Stage 1",
    type : "2D_SCENE",
    id : "4454",
    nodeList : [ 
        { 
            type : "SPRITE_NODE", 
            x : 100,
            y : 100,  
            width : 80,
            height : 80,  
            src : "../.././src/asset/asset-template/tile65.png", 
            location : "FOREIGNER",
            opacity : 1,  
            rotation : 0, 
            anchorPoint : [300,100] 

        },
        { 
            type : "SPRITE_NODE", 
            x : 100,
            y : 100,  
            width : 80,
            height : 80,  
            src : "../.././src/asset/asset-template/tile68.png", 
            location : "FOREIGNER",
            opacity : 1,  
            rotation : 0, 
            anchorPoint : [300,100] 

        },
        { 
            type : "SPRITE_NODE", 
            x : 100,
            y : 100,  
            width : 80,
            height : 80,  
            src : "../.././src/asset/asset-template/tile69.png", 
            location : "FOREIGNER",
            opacity : 1,  
            rotation : 0, 
            anchorPoint : [300,100] 

        },
        { 
            type : "SPRITE_NODE", 
            x : 100,
            y : 100,  
            width : 80,
            height : 80,  
            src : "../.././src/asset/asset-template/tile70.png", 
            location : "FOREIGNER",
            opacity : 1,  
            rotation : 0, 
            anchorPoint : [300,100] 

        },
        { 
            type : "SPRITE_NODE", 
            x : 100,
            y : 100,  
            width : 80,
            height : 80,  
            src : "../.././src/asset/asset-template/tile71.png", 
            location : "FOREIGNER",
            opacity : 1,  
            rotation : 0, 
            anchorPoint : [300,100] 

        },
        { 
            type : "SPRITE_NODE", 
            x : 100,
            y : 100,  
            width : 80,
            height : 80,  
            src : "../.././src/asset/asset-template/tile72.png", 
            location : "FOREIGNER",
            opacity : 1,  
            rotation : 0, 
            anchorPoint : [300,100] 

        },
        { 
            type : "SPRITE_NODE", 
            x : 100,
            y : 100,  
            width : 80,
            height : 80,  
            src : "../.././src/asset/asset-template/pointer.png", 
            location : "FOREIGNER",
            opacity : 1,  
            rotation : 0, 
            anchorPoint : [300,100] 

        },
        { 
            type : "SPRITE_NODE", 
            x : 100,
            y : 100,  
            width : 80,
            height : 80,  
            src : "../.././src/asset/asset-template/rectangle2.png", 
            location : "FOREIGNER",
            opacity : 1,  
            rotation : 0, 
            anchorPoint : [300,100] 

        },
        { 
            type : "SPRITE_NODE", 
            x : 100,
            y : 100,  
            width : 80,
            height : 80,  
            src : "../.././src/asset/asset-template/rectangle3.png", 
            location : "FOREIGNER",
            opacity : 1,  
            rotation : 0, 
            anchorPoint : [300,100]  

        },
        { 
            type : "SPRITE_NODE", 
            x : 100,
            y : 100,  
            width : 80,
            height : 80,  
            src : "../.././src/asset/asset-template/trees1_1.png", 
            location : "FOREIGNER",
            opacity : 1,  
            rotation : 0, 
            anchorPoint : [300,100] 

        }
    ]
};

const processor = nodeProcessor(sceneTemlate);

SCENE_2D.loadScene(processor);

const render = (): void => {
    SCENE_2D_CONTEXT.clearRect( 0,0,gui.sceneTab.sceneCanvas.width,gui.sceneTab.sceneCanvas.height);
    SCENE_2D.renderScene(SCENE_2D_CONTEXT); 
}; 

const frameLoop = (): void => {  
    render();
    requestAnimationFrame(frameLoop); 
};

export const sceneTab = (): void => { 
    resizeCanvas();    
    frameLoop();
};

SCENE_2D_RESIZE_HANDLE.config({
    lineType: "DASHED",
}); 

// RESIZE HANDLE EVENT :

SCENE_2D_RESIZE_HANDLE.onTransform(coord => {

    if (!sceneSelectedNode) return; 
    

    sceneSelectedNode.setX(coord.x);
    sceneSelectedNode.setY(coord.y);
    sceneSelectedNode.setWidth(coord.width);
    sceneSelectedNode.setHeight(coord.height); 

    INSPECTOR_SCALE_X_CONTROL.setValue(coord.width);
    INSPECTOR_SCALE_Y_CONTROL.setValue(coord.height);
    INSPECTOR_TRANSLATE_X_CONTROL.setValue(coord.x);
    INSPECTOR_TRANSLATE_Y_CONTROL.setValue(coord.y);

});   

gui.sceneTab.scene2dAlignHorizontalButton.addEventListener("click",()=>{
    if(sceneSelectedNode){
        const x = ( SCENE_2D_SAFE_AREA.x + SCENE_2D_SAFE_AREA.width ) / 2 - sceneSelectedNode.width / 2;
        sceneSelectedNode.setX(x) 
        SCENE_2D_RESIZE_HANDLE.setNode(sceneSelectedNode) 
    }; 
});

INSPECTOR_OPACITY_CONTROL.onDrag(value => {
    if(sceneSelectedNode?.type === "SPRITE_NODE"){
        sceneSelectedNode.setOpacity(parseFloat(value))
        console(value) 
    };
});

SCENE_2D_RESIZE_HANDLE.onResizeHandleMouseDown(()=> {
    crossHideVisibility(true);
});

SCENE_2D_RESIZE_HANDLE.onResizeHandleMouseUp(()=> {
    crossHideVisibility(false);
}); 

const crossHideVisibility = ( state : boolean ) : void => {
    state ? SCENE_2D_CROSS_GUIDE.show() : SCENE_2D_CROSS_GUIDE.hide();
    SCENE_2D_CROSS_GUIDE.setSide("ALL") 
};

// INSPECTOR :

INSPECTOR_SCALE_X_CONTROL.onWrite(value => {
    SCENE_2D_RESIZE_HANDLE.setWidth(parseInt(value));
});

INSPECTOR_SCALE_Y_CONTROL.onWrite(value => {
    SCENE_2D_RESIZE_HANDLE.setHeight(parseInt(value));
});

INSPECTOR_TRANSLATE_X_CONTROL.onWrite(value => { 
    SCENE_2D_RESIZE_HANDLE.setX(parseInt(value));
});

INSPECTOR_TRANSLATE_Y_CONTROL.onWrite(value => {
    SCENE_2D_RESIZE_HANDLE.setY(parseInt(value));
});

INSPECTOR_TRANSLATE_Y_CONTROL.onIncrementorStart(()=>{ 
    SCENE_2D_CROSS_GUIDE.show();
    SCENE_2D_CROSS_GUIDE.setSide("VERTICAL");   
}); 

INSPECTOR_TRANSLATE_Y_CONTROL.onIncrementorEnd(()=>{
    SCENE_2D_CROSS_GUIDE.hide();   
    SCENE_2D_CROSS_GUIDE.setSide("VERTICAL");
});

INSPECTOR_TRANSLATE_X_CONTROL.onIncrementorStart(()=>{ 
    SCENE_2D_CROSS_GUIDE.show();
    SCENE_2D_CROSS_GUIDE.setSide("HORIZONTAL");   
}); 

INSPECTOR_TRANSLATE_X_CONTROL.onIncrementorEnd(()=>{  
    SCENE_2D_CROSS_GUIDE.hide();   
    SCENE_2D_CROSS_GUIDE.setSide("HORIZONTAL");
});

INSPECTOR_ROTATE_CONTROL.onWrite(value => {
    if(sceneSelectedNode?.type === "SPRITE_NODE"){
        sceneSelectedNode.setRotation(parseInt(value));
    };
}); 

// TOGGLE SELECT REGION : 

const toggleSelectRegion = new Toggle(false);

gui.sceneTab.scene2dSelectRegionButton.addEventListener("click",()=>toggleSelectRegion.press());
const icon = gui.sceneTab.scene2dSelectRegionButton.querySelector("i") as HTMLElement;
 
toggleSelectRegion.onToggle(state =>{   
    if(state){
        SCENE_2D_SELECT_REGION_2D.enabled();  
        SCENE_2D_RESIZE_HANDLE.desabled();
    }else{
        SCENE_2D_SELECT_REGION_2D.desabled();  
    }
    icon.style.color = state ? getCSSVar("--color-b") : ""; 
});     

// SCENE 2D SELECT NODE : 

gui.sceneTab.sceneCanvasContainer.addEventListener("click", (e: MouseEvent) => {

    const rect = gui.sceneTab.sceneCanvas.getBoundingClientRect(); 

        const zoom = SCENE_2D.zoom;
        const mouseX = (e.clientX - rect.left) / zoom - SCENE_2D_ORIGIN_2D.x;
        const mouseY = (e.clientY - rect.top) / zoom - SCENE_2D_ORIGIN_2D.y;

        SCENE_NODE_LIST.find(n => {     

        if(!n.node) return; 

        if (mouseX >= n.node.x && mouseX <= n.node.x + n.node.width && mouseY >= n.node.y && mouseY <= n.node.y + n.node.height && n.node.isSelectable) {

            if (lastSelectedNode && lastSelectedNode !== n.node) {
                lastSelectedNode.setSelected(false);
            }; 

            lastSelectedNode = n.node; 
            sceneSelectedNode = n.node;  

            n.node.setSelected(true);

            SCENE_2D_RESIZE_HANDLE.setHandle({
                x: n.node.x,
                y: n.node.y,
                width: n.node.width, 
                height: n.node.height, 
                rotate: 0,
                type: "SINGLE_OBJECT"
            });

            SCENE_2D_RESIZE_HANDLE.enabled();

            if (sceneSelectedNode?.type === "SPRITE_NODE") {
                INSPECTOR_OPACITY_CONTROL.setValue(sceneSelectedNode.opacity); 
                INSPECTOR_ROTATE_CONTROL.setValue(sceneSelectedNode.rotation);  
            };     

            INSPECTOR_SCALE_X_CONTROL.setValue(n.node.width);
            INSPECTOR_SCALE_Y_CONTROL.setValue(n.node.height); 
            INSPECTOR_TRANSLATE_X_CONTROL.setValue(n.node.x); 
            INSPECTOR_TRANSLATE_Y_CONTROL.setValue(n.node.y); 

            return true;
        };
 
        return false;
    });

});