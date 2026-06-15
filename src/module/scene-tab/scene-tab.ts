
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

const spriteTest = new SpriteNode({
    src : "https://cdn.gamedevmarket.net/wp-content/uploads/20200917133059/3af0c8e7df0b43d37fcd5cc736fc559d.png",
    width : 200,
    height : 200,
    y : 50,
    x : 50 
})

const sceneTemlate : IScene2dOption = {
    name : "Stage 1",
    id : "4454",
    nodeList : [
        {
            node : spriteTest
        }
    ]
}

SCENE_2D.loadScene(sceneTemlate)

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