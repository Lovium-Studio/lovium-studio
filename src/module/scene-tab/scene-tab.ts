
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

import { gui } from "../gui/gui.js";
import { scene2d } from "../scene-2d/scene-2d.js";

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