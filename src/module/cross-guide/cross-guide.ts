
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

import { CrossGuideOption, GuideLineSideOption } from "../../../ts/types.js";
import { getCSSVar } from "../anchor-node/theme/theme.js";
import { gui } from "../gui/gui.js";
import { ResizeHandle } from "../resize-handle/resize-handle.js";
import { SafeArea2d } from "../safe-area-2d/safe-area-2d.js";
import { SceneLabel } from "../scene-label/scene-label.js";

// CROSS GUIDE :  


export class CrossGuide {

    private safeArea2d : SafeArea2d;
    private resizeHandle : ResizeHandle;
    private guideLeftLabel : SceneLabel;
    private guideRightLabel : SceneLabel;
    private guideTopLabel : SceneLabel;
    private guideBottomLabel : SceneLabel;

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

    private getGuideLabelRect = ( label : SceneLabel ) : DOMRect => {
        const rect = label.getHTMLElement().getBoundingClientRect();
        return rect;
    };

    public render = ( context : CanvasRenderingContext2D ) : void => {

        if (!this.isVisible) return;
    
        context.strokeStyle = getCSSVar("--color-b");  
        context.lineWidth = 1;    
        
        const centerX = Math.floor(this.resizeHandleX + this.resizeHandleWidth / 2) + 0.5;
        const centerY = Math.floor(this.resizeHandleY + this.resizeHandleHeight / 2) + 0.5;

        // TOP GUIDE : 

        if(this.showSide === "ALL" || this.showSide === "TOP" || this.showSide == "VERTICAL"){
            context.beginPath();   
            context.moveTo(centerX, Math.floor(this.safeArea2d.y) + 0.5); 
            context.lineTo(centerX, Math.floor(this.resizeHandleY) + 0.5); 
            context.stroke();      

            const guideTopY = (this.safeArea2d.y + this.resizeHandleY) / 2;
            const distanceTop = Math.abs(this.resizeHandleY - this.safeArea2d.y);

            this.guideTopLabel.setX(centerX - 20);
            this.guideTopLabel.setY(guideTopY - this.labelCorrection);
            this.guideTopLabel.setContent(`${Math.round(distanceTop)} PX`);

            this.guideTopLabel.show();

        };

        // BOTTOM GUIDE : 

        if(this.showSide === "ALL" || this.showSide === "BOTTOM" || this.showSide == "VERTICAL"){

            context.beginPath();   
            context.moveTo(centerX, Math.floor(this.resizeHandleY + this.resizeHandleHeight) + 0.5);  
            context.lineTo(centerX, Math.floor(this.safeArea2d.y + this.safeArea2d.height) + 0.5); 
            context.stroke();   

            const startY = this.resizeHandleY + this.resizeHandleHeight;
            const endY = this.safeArea2d.y + this.safeArea2d.height;
            const guideBottomY = (startY + endY) / 2;
            const distanceBottom = Math.abs(endY - startY); 

            const labelBottomRect = this.getGuideLabelRect(this.guideBottomLabel);

            if(distanceBottom > 60) {
                this.guideBottomLabel.setY(guideBottomY - this.labelCorrection); 
                this.guideBottomLabel.getHTMLElement().style.borderTopRightRadius = ""; 
                this.guideBottomLabel.getHTMLElement().style.borderBottomRightRadius = "";      
            }
 
            if(distanceBottom < 60) { 
                this.guideBottomLabel.setY(this.safeArea2d.y + this.safeArea2d.height + labelBottomRect.height - this.safeArea2d.padding);
                this.guideBottomLabel.getHTMLElement().style.borderTopRightRadius = "0px";   
                this.guideBottomLabel.getHTMLElement().style.borderBottomRightRadius = "0px";     
            }
                
            this.guideBottomLabel.setX(centerX - 20);
            this.guideBottomLabel.setContent(`${Math.round(distanceBottom)} PX`); 

            this.guideBottomLabel.show();
        };

        // LEFT GUIDE :

        if(this.showSide === "ALL" || this.showSide === "LEFT" || this.showSide == "HORIZONTAL"){

            context.beginPath();
            context.moveTo(Math.floor(this.safeArea2d.x) + 0.5, centerY);
            context.lineTo(Math.floor(this.resizeHandleX) + 0.5, centerY);
            context.stroke(); 

            const guideLeftX = (this.safeArea2d.x + this.resizeHandleX) / 2;
            const distanceLeft = Math.abs(this.resizeHandleX - this.safeArea2d.x);

            this.guideLeftLabel.setY(centerY - this.labelCorrection);
            this.guideLeftLabel.setX(guideLeftX);
            this.guideLeftLabel.setContent(`${Math.round(distanceLeft)} PX`); 

            this.guideLeftLabel.show();

        };  

        // RIGHT GUIDE : 

        if(this.showSide === "ALL" || this.showSide === "RIGHT" || this.showSide == "HORIZONTAL"){
            context.beginPath();
            context.moveTo(Math.floor(this.resizeHandleX + this.resizeHandleWidth) + 0.5, centerY);
            context.lineTo(Math.floor(this.safeArea2d.x + this.safeArea2d.width) + 0.5, centerY);
            context.stroke();

            // Centro geométrico do segmento horizontal direito
            const startX = this.resizeHandleX + this.resizeHandleWidth;
            const endX = this.safeArea2d.x + this.safeArea2d.width;
            const guideRightX = (startX + endX) / 2;
            const distanceRight = Math.abs(endX - startX);

            this.guideRightLabel.setY(centerY - this.labelCorrection);
            this.guideRightLabel.setX(guideRightX); 
            this.guideRightLabel.setContent(`${Math.round(distanceRight)} PX`); 

            this.guideRightLabel.show();

        };

    };

    public show = () : void => {
        this.isVisible = true;
    }
    
    public hide = () : void => {
        this.isVisible = false;
        this.guideLeftLabel.hide();
        this.guideRightLabel.hide();
        this.guideTopLabel.hide();
        this.guideBottomLabel.hide();
    }
};
