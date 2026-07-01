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

import { ICrossGuide, GuideLineSideOption } from "../../../ts/types.js";
import { getCSSVar } from "../anchor-node/theme/theme.js";
import { gui } from "../gui/gui.js";
import { Origin2D, SCENE_2D_ORIGIN_2D } from "../origin-2d/origin-2d.js";
import { ResizeHandle, SCENE_2D_RESIZE_HANDLE } from "../resize-handle/resize-handle.js";
import { SafeArea2d, SCENE_2D_SAFE_AREA } from "../safe-area-2d/safe-area-2d.js";
import { SceneLabel } from "../scene-label/scene-label.js";
import { SCENE_2D_VIEWPORT_2D, Viewport2D } from "../viewport-2d/viewport-2d.js";

// CROSS GUIDE :  

export class CrossGuide {

    private safeArea2d : SafeArea2d;
    private resizeHandle : ResizeHandle;
    private viewport : Viewport2D;
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

    constructor ( option : ICrossGuide ) {

        this.isVisible = false;
        this.showSide = "ALL"; 

        this.safeArea2d = option.safeArea2d; 
        this.resizeHandle = option.resizeHandle;
        this.origin2d = option.origin2d;
        this.viewport = option.viewport;

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

        this.guideLeftLabel = new SceneLabel({ container : gui.sceneTab.sceneGUIContainer });
        this.guideRightLabel = new SceneLabel({ container : gui.sceneTab.sceneGUIContainer });

        this.guideTopLabel = new SceneLabel({ container : gui.sceneTab.sceneGUIContainer });
        this.guideTopLabel.setRotation(270)

        this.guideBottomLabel = new SceneLabel({ container : gui.sceneTab.sceneGUIContainer });
        this.guideBottomLabel.setRotation(270)

    };

    public setSide = ( side : GuideLineSideOption ) : GuideLineSideOption => this.showSide = side;

    private getGuideLabelRect = ( label : SceneLabel ) : DOMRect => {
        return label.getHTMLElement().getBoundingClientRect();
    };

    // converte coordenada local (espaço do node / safe area) pra pixel de tela
    private toScreen = ( localX : number, localY : number ) : { x : number, y : number } => {
        const zoom = this.viewport.currentZoom;
        return {
            x: (this.origin2d.x + localX) * zoom,
            y: (this.origin2d.y + localY) * zoom
        };
    };

    public render = (context: CanvasRenderingContext2D): void => {

        if (!this.isVisible) return;

        const zoom = this.viewport.currentZoom;

        context.save();
        context.setTransform(1, 0, 0, 1, 0, 0);
        context.scale(zoom, zoom);
        context.translate(this.origin2d.x, this.origin2d.y);

        context.strokeStyle = getCSSVar("--color-b");
        context.lineWidth = 1 / zoom;

        const relResizeX = this.resizeHandleX;
        const relResizeY = this.resizeHandleY;

        // a safe area já É a origem, então no espaço local ela começa em (0,0), não em (safeArea.x, safeArea.y)
        const safeX = 0;
        const safeY = 0;

        const safeWidth = this.safeArea2d.width;
        const safeHeight = this.safeArea2d.height;

        const centerX = relResizeX + this.resizeHandleWidth / 2;
        const centerY = relResizeY + this.resizeHandleHeight / 2;

        // TOP GUIDE :
        if (this.showSide === "ALL" || this.showSide === "TOP" || this.showSide === "VERTICAL") {

            context.beginPath();
            context.moveTo(centerX, safeY);
            context.lineTo(centerX, relResizeY);
            context.stroke();

            const guideTopY = (safeY + relResizeY) / 2;
            const distanceTop = Math.abs(relResizeY - safeY);

            const p = this.toScreen(centerX - 20, guideTopY - this.labelCorrection);
            this.guideTopLabel.setX(p.x);
            this.guideTopLabel.setY(p.y);
            this.guideTopLabel.setContent(`${Math.round(distanceTop)} PX`);
            this.guideTopLabel.show();
        };

        // BOTTOM GUIDE :
        if (this.showSide === "ALL" || this.showSide === "BOTTOM" || this.showSide === "VERTICAL") {

            const relResizeBottom = relResizeY + this.resizeHandleHeight;
            const safeBottom = safeY + safeHeight;

            context.beginPath();
            context.moveTo(centerX, relResizeBottom);
            context.lineTo(centerX, safeBottom);
            context.stroke();

            const guideBottomY = (relResizeBottom + safeBottom) / 2;
            const distanceBottom = Math.abs(relResizeBottom - safeBottom);

            const p = this.toScreen(centerX - 20, guideBottomY - this.labelCorrection);
            this.guideBottomLabel.setX(p.x);
            this.guideBottomLabel.setY(p.y);
            this.guideBottomLabel.setContent(`${Math.round(distanceBottom)} PX`);
            this.guideBottomLabel.show();
        };

        // LEFT GUIDE :
        if (this.showSide === "ALL" || this.showSide === "LEFT" || this.showSide === "HORIZONTAL") {

            context.beginPath();
            context.moveTo(safeX, centerY);
            context.lineTo(relResizeX, centerY);
            context.stroke();

            const guideLeftX = (safeX + relResizeX) / 2;
            const distanceLeft = Math.abs(relResizeX - safeX);

            const p = this.toScreen(guideLeftX, centerY - this.labelCorrection);
            this.guideLeftLabel.setX(p.x);
            this.guideLeftLabel.setY(p.y);
            this.guideLeftLabel.setContent(`${Math.round(distanceLeft)} PX`);
            this.guideLeftLabel.show();
        };

        // RIGHT GUIDE :
        if (this.showSide === "ALL" || this.showSide === "RIGHT" || this.showSide === "HORIZONTAL") {

            const relResizeRight = relResizeX + this.resizeHandleWidth;
            const safeRight = safeX + safeWidth;

            context.beginPath();
            context.moveTo(relResizeRight, centerY);
            context.lineTo(safeRight, centerY);
            context.stroke();

            const guideRightX = (relResizeRight + safeRight) / 2;
            const distanceRight = Math.abs(relResizeRight - safeRight);

            const p = this.toScreen(guideRightX, centerY - this.labelCorrection);
            this.guideRightLabel.setX(p.x);
            this.guideRightLabel.setY(p.y);
            this.guideRightLabel.setContent(`${Math.round(distanceRight)} PX`);
            this.guideRightLabel.show();
        };

        context.restore();
    };

    public show = () : void => { this.isVisible = true; }

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
    origin2d : SCENE_2D_ORIGIN_2D,
    viewport : SCENE_2D_VIEWPORT_2D
});