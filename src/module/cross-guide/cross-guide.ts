
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
import { gui } from "../gui/gui.js";
import { ResizeHandle } from "../resize-handle/resize-handle.js";
import { SafeArea2d } from "../safe-area-2d/safe-area-2d.js";
import { SceneLabel } from "../scene-label/scene-label.js";

// CROSS GUIDE :  

type GuideLineSideOption = "ALL" | "TOP" | "BOTTOM" | "RIGHT" | "LEFT";

export class CrossGuide {

    private safeArea2d : SafeArea2d;
    private resizeHandle : ResizeHandle;
    private guideLeftLabel : SceneLabel;
    private guideRightLabel : SceneLabel;
    private guideTopLabel : SceneLabel;
    private guideBottomLabel : SceneLabel;

    private safeArea2dWidth : number;
    private safeArea2dHeight : number;
    private safeArea2dX : number;
    private safeArea2dY : number;

    private resizeHandleWidth : number;
    private resizeHandleHeight : number;
    private resizeHandleX : number;
    private resizeHandleY : number;
    private showSide : GuideLineSideOption;
    private labelCorrection : number;

    private isVisible : boolean;

    constructor ( option : CrossGuideOption ) {

        this.isVisible = false;
        this.showSide = "ALL"; 

        this.safeArea2d = option.safeArea2d;
        this.resizeHandle = option.resizeHandle;

        this.safeArea2dWidth = this.safeArea2d.width;
        this.safeArea2dHeight = this.safeArea2d.height;
        this.safeArea2dX = this.safeArea2d.x;
        this.safeArea2dY = this.safeArea2d.y;
        this.labelCorrection = 8;

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

        // SCENE LABELS : 

        this.guideLeftLabel = new SceneLabel({
            container : gui.sceneTab.sceneGUIContainer
        });

        this.guideRightLabel = new SceneLabel({
            container : gui.sceneTab.sceneGUIContainer
        });

        this.guideTopLabel = new SceneLabel({
            container : gui.sceneTab.sceneGUIContainer
        });

        this.guideTopLabel.setRotation(270)

        this.guideBottomLabel = new SceneLabel({
            container : gui.sceneTab.sceneGUIContainer
        });

        this.guideBottomLabel.setRotation(270)

    };

    public setSide = ( side : GuideLineSideOption ) : GuideLineSideOption => this.showSide = side;

    public render = ( context : CanvasRenderingContext2D ) : void => {

        if (!this.isVisible) return;
    
        context.strokeStyle = getCSSVar("--color-b");  
        context.lineWidth = 1;    
        
        const centerX = Math.floor(this.resizeHandleX + this.resizeHandleWidth / 2) + 0.5;
        const centerY = Math.floor(this.resizeHandleY + this.resizeHandleHeight / 2) + 0.5;

        // TOP GUIDE : 

        if(this.showSide === "ALL" || this.showSide === "TOP"){
            context.beginPath();   
            context.moveTo(centerX, Math.floor(this.safeArea2dY) + 0.5); 
            context.lineTo(centerX, Math.floor(this.resizeHandleY) + 0.5); 
            context.stroke();      

            const guideTopY = (this.safeArea2dY + this.resizeHandleY) / 2;
            const distanceTop = Math.abs(this.resizeHandleY - this.safeArea2dY);

            this.guideTopLabel.setX(centerX - 20);
            this.guideTopLabel.setY(guideTopY - this.labelCorrection);
            this.guideTopLabel.setContent(`${Math.round(distanceTop)} PX`);
        };

        // BOTTOM GUIDE : 

        if(this.showSide === "ALL" || this.showSide === "BOTTOM"){
            context.beginPath();   
            context.moveTo(centerX, Math.floor(this.resizeHandleY + this.resizeHandleHeight) + 0.5);  
            context.lineTo(centerX, Math.floor(this.safeArea2dY + this.safeArea2dHeight) + 0.5); 
            context.stroke();   

            const startY = this.resizeHandleY + this.resizeHandleHeight;
            const endY = this.safeArea2dY + this.safeArea2dHeight;
            const guideBottomY = (startY + endY) / 2;
            const distanceBottom = Math.abs(endY - startY);

            this.guideBottomLabel.setX(centerX - 20);
            this.guideBottomLabel.setY(guideBottomY - this.labelCorrection);
            this.guideBottomLabel.setContent(`${Math.round(distanceBottom)} PX`);
        };

        // LEFT GUIDE :

        if(this.showSide === "ALL" || this.showSide === "LEFT"){

            context.beginPath();
            context.moveTo(Math.floor(this.safeArea2dX) + 0.5, centerY);
            context.lineTo(Math.floor(this.resizeHandleX) + 0.5, centerY);
            context.stroke(); 

            const guideLeftX = (this.safeArea2dX + this.resizeHandleX) / 2;
            const distanceLeft = Math.abs(this.resizeHandleX - this.safeArea2dX);

            this.guideLeftLabel.setY(centerY - this.labelCorrection);
            this.guideLeftLabel.setX(guideLeftX);
            this.guideLeftLabel.setContent(`${Math.round(distanceLeft)} PX`); 
        };  

        // RIGHT GUIDE : 

        if(this.showSide === "ALL" || this.showSide === "RIGHT"){
            context.beginPath();
            context.moveTo(Math.floor(this.resizeHandleX + this.resizeHandleWidth) + 0.5, centerY);
            context.lineTo(Math.floor(this.safeArea2dX + this.safeArea2dWidth) + 0.5, centerY);
            context.stroke();

            // Centro geométrico do segmento horizontal direito
            const startX = this.resizeHandleX + this.resizeHandleWidth;
            const endX = this.safeArea2dX + this.safeArea2dWidth;
            const guideRightX = (startX + endX) / 2;
            const distanceRight = Math.abs(endX - startX);

            this.guideRightLabel.setY(centerY - this.labelCorrection);
            this.guideRightLabel.setX(guideRightX); 
            this.guideRightLabel.setContent(`${Math.round(distanceRight)} PX`); 
        };

    };

    public show = () : void => {
        this.isVisible = true;
        this.guideLeftLabel.show();
        this.guideRightLabel.show();
        this.guideTopLabel.show();
        this.guideBottomLabel.show();
    }
    
    public hide = () : void => {
        this.isVisible = false;
        this.guideLeftLabel.hide();
        this.guideRightLabel.hide();
        this.guideTopLabel.hide();
        this.guideBottomLabel.hide();
    }
};
