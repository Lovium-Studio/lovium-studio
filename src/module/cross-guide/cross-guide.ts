
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

import { CrossGuideOption } from "../../../ts/types.js";
import { getCSSVar } from "../anchor-node/theme/theme.js";
import { ResizeHandle } from "../resize-handle/resize-handle.js";
import { SafeArea2d } from "../safe-area-2d/safe-area-2d.js";

// CROSS GUIDE : 

export class CrossGuide {

    private safeArea2d : SafeArea2d;
    private resizeHandle : ResizeHandle;

    private safeArea2dWidth : number;
    private safeArea2dHeight : number;
    private safeArea2dX : number;
    private safeArea2dY : number;

    private resizeHandleWidth : number;
    private resizeHandleHeight : number;
    private resizeHandleX : number;
    private resizeHandleY : number;

    constructor ( option : CrossGuideOption ) {

        this.safeArea2d = option.safeArea2d;
        this.resizeHandle = option.resizeHandle;

        this.safeArea2dWidth = this.safeArea2d.width;
        this.safeArea2dHeight = this.safeArea2d.height;
        this.safeArea2dX = this.safeArea2d.x;
        this.safeArea2dY = this.safeArea2d.y;

        this.resizeHandleWidth = 0;
        this.resizeHandleHeight = 0;
        this.resizeHandleX = 0;
        this.resizeHandleY = 0;

        this.resizeHandle.onTransform(coord => {
            this.resizeHandleWidth = coord.width;
            this.resizeHandleHeight = coord.height;
            this.resizeHandleX = coord.x;
            this.resizeHandleY = coord.y;
        });

    };

    public render = ( context : CanvasRenderingContext2D ) : void => {
    
        context.strokeStyle = getCSSVar("--color-b");  
        context.lineWidth = 1;    
        
        const centerX = Math.floor(this.resizeHandleX + this.resizeHandleWidth / 2) + 0.5;
        const centerY = Math.floor(this.resizeHandleY + this.resizeHandleHeight / 2) + 0.5;

        context.beginPath();   
        context.moveTo(centerX, Math.floor(this.safeArea2dY) + 0.5); 
        context.lineTo(centerX, Math.floor(this.resizeHandleY) + 0.5); 
        context.stroke();      
    
        context.beginPath();   
        context.moveTo(centerX, Math.floor(this.resizeHandleY + this.resizeHandleHeight) + 0.5);  
        context.lineTo(centerX, Math.floor(this.safeArea2dY + this.safeArea2dHeight) + 0.5); 
        context.stroke();   
    
        context.beginPath();
        context.moveTo(Math.floor(this.safeArea2dX) + 0.5, centerY);
        context.lineTo(Math.floor(this.resizeHandleX) + 0.5, centerY);
        context.stroke();

        context.beginPath();
        context.moveTo(Math.floor(this.resizeHandleX + this.resizeHandleWidth) + 0.5, centerY);
        context.lineTo(Math.floor(this.safeArea2dX + this.safeArea2dWidth) + 0.5, centerY);
        context.stroke();

    };
};



