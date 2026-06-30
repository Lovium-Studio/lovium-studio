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
import { Origin2D, SCENE_2D_ORIGIN_2D } from "../origin-2d/origin-2d.js";
import { ResizeHandle, SCENE_2D_RESIZE_HANDLE } from "../resize-handle/resize-handle.js";
import { SafeArea2d, SCENE_2D_SAFE_AREA } from "../safe-area-2d/safe-area-2d.js";
import { SceneLabel } from "../scene-label/scene-label.js";

// CROSS GUIDE :  

export class CrossGuide {

    private safeArea2d : SafeArea2d;
    private resizeHandle : ResizeHandle;
    private guideLeftLabel : SceneLabel;
    private guideRightLabel : SceneLabel;
    private guideTopLabel : SceneLabel;
    private guideBottomLabel : SceneLabel;
    private origin2d : Origin2D;

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
        this.origin2d = option.origin2d;

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

    public render = (context: CanvasRenderingContext2D): void => {

    if (!this.isVisible) return;

    context.save();

    context.translate(this.origin2d.x, this.origin2d.y);

    context.strokeStyle = getCSSVar("--color-b");
    context.lineWidth = 1;

    const relResizeX = this.resizeHandleX;
    const relResizeY = this.resizeHandleY;

    const safeX = this.safeArea2d.x;
    const safeY = this.safeArea2d.y;

    const safeWidth = this.safeArea2d.width;
    const safeHeight = this.safeArea2d.height;

    const centerX = Math.floor(relResizeX + this.resizeHandleWidth / 2) + 0.5;
    const centerY = Math.floor(relResizeY + this.resizeHandleHeight / 2) + 0.5;

    // TOP GUIDE :

    if (this.showSide === "ALL" || this.showSide === "TOP" || this.showSide === "VERTICAL") {

        context.beginPath();

        context.moveTo(centerX, Math.floor(safeY) + 0.5);

        context.lineTo(centerX, Math.floor(relResizeY) + 0.5);

        context.stroke();

        const guideTopY = (safeY + relResizeY) / 2;

        const distanceTop = Math.abs(relResizeY - safeY);

        this.guideTopLabel.setX(centerX - 20);

        this.guideTopLabel.setY(guideTopY - this.labelCorrection);

        this.guideTopLabel.setContent(`${Math.round(distanceTop)} PX`);

        this.guideTopLabel.show();
    };

    // BOTTOM GUIDE :

    if (this.showSide === "ALL" || this.showSide === "BOTTOM" || this.showSide === "VERTICAL") {

        const relResizeBottom = relResizeY + this.resizeHandleHeight;

        const safeBottom = safeY + safeHeight;

        context.beginPath();

        context.moveTo(centerX, Math.floor(relResizeBottom) + 0.5);

        context.lineTo(centerX, Math.floor(safeBottom) + 0.5);

        context.stroke();

        const guideBottomY = (relResizeBottom + safeBottom) / 2;

        const distanceBottom = Math.abs(relResizeBottom - safeBottom);

        this.guideBottomLabel.setX(centerX - 20);

        this.guideBottomLabel.setY(guideBottomY - this.labelCorrection);

        this.guideBottomLabel.setContent(`${Math.round(distanceBottom)} PX`);

        this.guideBottomLabel.show();
    };

    // LEFT GUIDE :

    if (this.showSide === "ALL" || this.showSide === "LEFT" || this.showSide === "HORIZONTAL") {

        context.beginPath();

        context.moveTo(Math.floor(safeX) + 0.5, centerY);

        context.lineTo(Math.floor(relResizeX) + 0.5, centerY);

        context.stroke();

        const guideLeftX = (safeX + relResizeX) / 2;

        const distanceLeft = Math.abs(relResizeX - safeX);

        this.guideLeftLabel.setX(guideLeftX);

        this.guideLeftLabel.setY(centerY - this.labelCorrection);

        this.guideLeftLabel.setContent(`${Math.round(distanceLeft)} PX`);

        this.guideLeftLabel.show();
    };

    // RIGHT GUIDE :

    if (this.showSide === "ALL" || this.showSide === "RIGHT" || this.showSide === "HORIZONTAL") {

        const relResizeRight = relResizeX + this.resizeHandleWidth;

        const safeRight = safeX + safeWidth;

        context.beginPath();

        context.moveTo(Math.floor(relResizeRight) + 0.5, centerY);

        context.lineTo(Math.floor(safeRight) + 0.5, centerY);

        context.stroke();

        const guideRightX = (relResizeRight + safeRight) / 2; 

        const distanceRight = Math.abs(relResizeRight - safeRight);

        this.guideRightLabel.setX(guideRightX); 

        this.guideRightLabel.setY(centerY - this.labelCorrection);

        this.guideRightLabel.setContent(`${Math.round(distanceRight)} PX`);

        this.guideRightLabel.show();
    }; 

    context.restore();
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
    };
};

export const SCENE_2D_CROSS_GUIDE = new CrossGuide({
    safeArea2d : SCENE_2D_SAFE_AREA, 
    resizeHandle : SCENE_2D_RESIZE_HANDLE ,  
    origin2d : SCENE_2D_ORIGIN_2D
});