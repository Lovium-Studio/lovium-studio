
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

import { getCSSVar } from "../anchor-node/theme/theme.js";
import { Camera2DNode } from "../camera-2d-node/camera-2d-node.js";
import { SafeArea2d, SCENE_2D_SAFE_AREA } from './../safe-area-2d/safe-area-2d.js';

// CAMERA MASK : 

export class CameraMask {

    private safeArea : SafeArea2d;
    private camera : Camera2DNode | null;
    private isEnabled : boolean;

    constructor (safeArea : SafeArea2d) {
        this.camera = null;
        this.safeArea = safeArea;
        this.isEnabled = true;
    }; 

    public render = ( context : CanvasRenderingContext2D ) : void => {

    if(!this.isEnabled) return;

    if(this.camera){

        context.save();

        const marginX = this.camera.horizontalGap + this.camera.cameraZoom;
        const marginY = this.camera.verticalGap + this.camera.cameraZoom;

        const zoomAreaX = this.camera.x + marginX;
        const zoomAreaY = this.camera.y + marginY;
        const zoomAreaWidth = this.camera.width - (marginX * 2);
        const zoomAreaHeight = this.camera.height - (marginY * 2);

        // CAMERA MASK : 

        const outerX = -this.safeArea.offsetLeft;
        const outerY = -this.safeArea.offsetTop;
        const outerWidth = this.safeArea.width + this.safeArea.offsetLeft + this.safeArea.offsetRight;
        const outerHeight = this.safeArea.height + this.safeArea.offsetTop + this.safeArea.offsetBottom;

        context.globalAlpha = 0.2; 
        context.fillStyle = getCSSVar("--color-c");
        context.beginPath();  
        context.rect(outerX, outerY, outerWidth, outerHeight);
         
        // CAMERA MASK AREA :   

        context.rect(zoomAreaX, zoomAreaY, zoomAreaWidth, zoomAreaHeight);
        context.fill("evenodd");  
        context.restore();
    };

};

    public enabled = () : boolean => this.isEnabled = true;
    public desabled = () : boolean => this.isEnabled = false;
    public setCamera = ( camera : Camera2DNode ) : Camera2DNode => this.camera = camera;

};

export const SCENE_2D_CAMERA_MASK = new CameraMask(SCENE_2D_SAFE_AREA)