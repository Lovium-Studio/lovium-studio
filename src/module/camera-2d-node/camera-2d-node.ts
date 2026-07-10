
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

import { ICamera2DNode } from "../../ts/types.js";
import { getCSSVar } from "../anchor-node/theme/theme.js";
import { Origin2D } from "../origin-2d/origin-2d.js";
import { SafeArea2d } from "../safe-area-2d/safe-area-2d.js";
import { Viewport2D } from "../viewport-2d/viewport-2d.js";

// CAMERA 2D : 

export class Camera2DNode {

    public x : number; 
    public y : number;
    public width : number;
    public height : number;
    public isSelected : boolean;
    public isSelectable : boolean;
    public type : "CAMERA_2D_NODE";
    public verticalGap : number;
    public horizontalGap : number;
    public cameraZoom : number;
    public isMask : boolean;

    private viewport : Viewport2D | null;
    private origin2d : Origin2D | null;
    private safeArea : SafeArea2d | null;

    private isVisible : boolean;
    private crossSize : number;

    constructor ( option : ICamera2DNode ) {
        this.type = "CAMERA_2D_NODE";
        this.x = option.x;
        this.y = option.y;
        this.width = option.width;
        this.height = option.height;
        this.isVisible = true;
        this.viewport = option.viewport || null;
        this.origin2d = option.origin2d || null;
        this.isSelectable = true;
        this.isSelected = false;
        this.verticalGap = 10;
        this.horizontalGap = 40;
        this.safeArea = option.safeArea || null; 
        this.crossSize = 10;
        this.cameraZoom = 1;
        this.isMask = option.isMask;
    };

    public render = ( context : CanvasRenderingContext2D ) : void => {

        if(!this.isVisible) return;

        if(this.viewport && this.origin2d && this.safeArea){ 

            const zoom : number = this.viewport.currentZoom;

            context.save();

            context.setTransform(1, 0, 0, 1, 0, 0);
            context.scale(zoom, zoom);
            context.translate(this.origin2d.x, this.origin2d.y);

            context.strokeStyle = getCSSVar("--color-c");
            context.lineWidth = 1 / zoom;

            // CAMERA AREA : 

            context.setLineDash([]);
            context.strokeRect(this.x, this.y, this.width, this.height);

            // CAMERA ZOOM AREA : 
            const marginX = this.horizontalGap + this.cameraZoom;
            const marginY = this.verticalGap + this.cameraZoom;

            const zoomAreaX = this.x + marginX;
            const zoomAreaY = this.y + marginY;
            const zoomAreaWidth = this.width - (marginX * 2);
            const zoomAreaHeight = this.height - (marginY * 2);

            context.setLineDash([3 / zoom, 3 / zoom]); 
            context.strokeRect(zoomAreaX, zoomAreaY, zoomAreaWidth, zoomAreaHeight);

            // CAMERA CROSS :

            context.setLineDash([]);  

            const crossCenterX: number = this.x + this.width / 2; 
            const crossCenterY: number = this.y + this.height / 2;

            // VERTICAL LINE:  

            context.beginPath();
            context.moveTo(crossCenterX,crossCenterY - this.crossSize / 2);
            context.lineTo(crossCenterX,crossCenterY + this.crossSize / 2); 
            context.stroke();

            // HORIZONTAL LINE :

            context.beginPath();
            context.moveTo(crossCenterX - this.crossSize / 2,crossCenterY);
            context.lineTo(crossCenterX + this.crossSize / 2,  crossCenterY);
            context.stroke();

            // // CAMERA MASK :

            // context.globalAlpha = 0.3;

            // context.fillStyle = getCSSVar("--color-c");

            // context.beginPath();  

            // context.rect(0,0, this.safeArea.width, this.safeArea.height);
            
            // // CAMERA MASK AREA :  

            // context.rect(zoomAreaX, zoomAreaY, zoomAreaWidth, zoomAreaHeight);

            // context.fill("evenodd");  

            context.restore();
        };

    };

    public setSelected = (state : boolean ) : boolean => this.isSelected = state;
    public setX = (x : number) : number => this.x = x;
    public setY = (y : number) : number => this.y = y;
    public setWidth = ( width : number) : number => this.width = width;
    public setHeight = ( height : number) : number => this.height = height;
    public setZoom = ( scale : number ) : number => this.cameraZoom = scale;
    public setHorizontalGap = ( gap : number ) : number => this.horizontalGap = gap;
    public setVerticalGap = ( gap : number ) : number => this.verticalGap = gap;
    public enableMask = () : boolean => this.isMask = true;
    public desableMask = () : boolean => this.isMask = false;

    
};
