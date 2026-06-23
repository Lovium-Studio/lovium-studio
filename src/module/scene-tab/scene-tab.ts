
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

import { IScene2dOption } from "../../../ts/types.js";
import { gui } from "../gui/gui.js";
import { nodeProcessor } from "../node-processor/node-processor.js";
import { scene2d } from "../scene-2d/scene-2d.js";
import { SpriteNode } from "../sprite-node/sprite-node.js";

// SCENE TAB :

const CONTEXT_2D = gui.sceneTab.sceneCanvas.getContext("2d")!;
const SCENE_2D = scene2d;

const resizeCanvas = (): void => {
    const rect = gui.sceneTab.sceneCanvasContainer.getBoundingClientRect();
    gui.sceneTab.sceneCanvas.width = rect.width - 1;
    gui.sceneTab.sceneCanvas.height = rect.height - 2; 
}; 

new ResizeObserver(() => {   
    resizeCanvas(); 
}).observe(gui.sceneTab.sceneCanvasContainer);


const sceneTemlate : IScene2dOption = {
    name : "Stage 1",
    type : "2D_SCENE",
    id : "4454",
    nodeList : [
        { 
            type : "SPRITE_NODE", 
            x : 300,
            y : 100,  
            width : 100,
            height : 100,  
            src : "../.././src/asset/asset-template/bg.png", 
            location : "FOREIGNER",
            opacity : 1

        },
        {  
            type : "SPRITE_NODE",
            x : 100,
            y : 100, 
            width : 100,
            height : 100,
            src : "../.././src/asset/asset-template/grassHalf.png",
            location : "FOREIGNER",
            opacity : 1

        },
        {
            type : "SPRITE_NODE",
            x : 300,
            y : 100,  
            width : 100,
            height : 100,
            src : "../.././src/asset/asset-template/grassHalfLeft.png",
            location : "FOREIGNER",
            opacity : 1

        },
        {
            type : "SPRITE_NODE",
            x : 300,
            y : 100, 
            width : 100,
            height : 100, 
            src : "../.././src/asset/asset-template/grassHalfMid.png",
            location : "FOREIGNER",
            opacity : 1

        },
        {
            type : "SPRITE_NODE", 
            x : 400,
            y : 200, 
            width : 100,
            height : 100,  
            src : "../.././src/asset/asset-template/grassHalfRight.png",
            location : "FOREIGNER",
            opacity : 1

        },
        {
            type : "SPRITE_NODE",
            x : 300,
            y : 100, 
            width : 100,
            height : 100, 
            src : "../.././src/asset/asset-template/fence.png",
            location : "FOREIGNER",
            opacity : 1

        },
        {
            type : "SPRITE_NODE",
            x : 300,
            y : 100, 
            width : 100,
            height : 100, 
            src : "../.././src/asset/asset-template/p1_stand.png",
            location : "FOREIGNER",
            opacity : 1

        },
        {
            type : "SPRITE_NODE", 
            x : 300,
            y : 100, 
            width : 100,
            height : 100,  
            src : "../.././src/asset/asset-template/box.png",
            location : "FOREIGNER",
            opacity : 1

        },
        { 
            type : "SPRITE_NODE", 
            x : 300,
            y : 100,  
            width : 100,
            height : 100,  
            src : "../.././src/asset/asset-template/signExit.png", 
            location : "FOREIGNER",
            opacity : 1

        },
        { 
            type : "SPRITE_NODE", 
            x : 300,
            y : 100,  
            width : 100,
            height : 100,  
            src : "../.././src/asset/asset-template/signExit.png", 
            location : "FOREIGNER",
            opacity : 1

        },
        { 
            type : "SPRITE_NODE", 
            x : 300,
            y : 100,  
            width : 100,
            height : 100,  
            src : "../.././src/asset/asset-template/cloud1.png", 
            location : "FOREIGNER",
            opacity : 1

        },
        { 
            type : "SPRITE_NODE", 
            x : 300,
            y : 100,  
            width : 100,
            height : 100,  
            src : "../.././src/asset/asset-template/flagRed.png", 
            location : "FOREIGNER",
            opacity : 1

        },
        { 
            type : "SPRITE_NODE", 
            x : 300, 
            y : 100,  
            width : 100,
            height : 100,  
            src : "../.././src/asset/asset-template/springboardUp.png", 
            location : "FOREIGNER",
            opacity : 1
        },
        { 
            type : "SPRITE_NODE", 
            x : 300,
            y : 100,  
            width : 100,
            height : 100,  
            src : "../.././src/asset/asset-template/switchRight.png", 
            location : "FOREIGNER",
            opacity : 1

        }
    ]
};

const processor = nodeProcessor(sceneTemlate);

SCENE_2D.loadScene(processor);

const render = (): void => {

    CONTEXT_2D.clearRect( 0,0,gui.sceneTab.sceneCanvas.width,gui.sceneTab.sceneCanvas.height);
    SCENE_2D.renderScene(CONTEXT_2D); 
}; 

const frameLoop = (): void => {  
    render();
    requestAnimationFrame(frameLoop); 
};

export const sceneTab = (): void => { 

    resizeCanvas();    
    frameLoop();
};