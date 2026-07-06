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
import { Origin2D } from "../origin-2d/origin-2d.js";
import { Viewport2D, SCENE_2D_VIEWPORT_2D } from "../viewport-2d/viewport-2d.js";
import { SCENE_2D_ORIGIN_2D } from "../origin-2d/origin-2d.js";

// CAMERA MASK : 

export class CameraMask {

    private viewport : Viewport2D;
    private origin2d : Origin2D;
    private camera : Camera2DNode | null;
    private isEnabled : boolean;

    constructor (viewport : Viewport2D, origin2d : Origin2D) {
        this.camera = null;
        this.viewport = viewport;
        this.origin2d = origin2d;
        this.isEnabled = true;
    }; 

    public render = ( context : CanvasRenderingContext2D ) : void => {

        if(!this.isEnabled) return;

        if(this.camera){

            const zoom = this.viewport.currentZoom;

            context.save();

            context.setTransform(1, 0, 0, 1, 0, 0);

            const outerWidth = this.viewport.getWidth();
            const outerHeight = this.viewport.getHeight();

            const marginX = this.camera.horizontalGap + this.camera.cameraZoom;
            const marginY = this.camera.verticalGap + this.camera.cameraZoom;

            const localZoomAreaX = this.camera.x + marginX;
            const localZoomAreaY = this.camera.y + marginY;
            const localZoomAreaWidth = this.camera.width - (marginX * 2);
            const localZoomAreaHeight = this.camera.height - (marginY * 2);

            const zoomAreaX = (this.origin2d.x + localZoomAreaX) * zoom;
            const zoomAreaY = (this.origin2d.y + localZoomAreaY) * zoom;
            const zoomAreaWidth = localZoomAreaWidth * zoom;
            const zoomAreaHeight = localZoomAreaHeight * zoom;

            context.globalAlpha = 0.2; 
            context.fillStyle = getCSSVar("--color-c");
            context.beginPath();  
            context.rect(0, 0, outerWidth, outerHeight);

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

export const SCENE_2D_CAMERA_MASK = new CameraMask(SCENE_2D_VIEWPORT_2D, SCENE_2D_ORIGIN_2D);