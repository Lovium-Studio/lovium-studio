
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
import { IGrid2D } from "../../../ts/types.js";
import { getCSSVar } from "../anchor-node/theme/theme.js";
import { gui } from "../gui/gui.js";
import { SCENE_2D_VIEWPORT_2D, Viewport2D } from "../viewport-2d/viewport-2d.js";

// 2D GRID : 

export class Grid2D {    

    private canvas : HTMLCanvasElement;
    private width : number;
    private height : number;
    private x : number;
    private y : number;
    private viewport : Viewport2D;

    constructor( option : IGrid2D, viewport : Viewport2D ){
        
        this.canvas = option.canvas;
        this.width = option.width;
        this.height = option.height;
        this.x = option.x;
        this.y = option.y;
        this.viewport = viewport;

    }

    public render = ( context : CanvasRenderingContext2D ) : void => {

        const zoom = this.viewport.currentZoom;
        const offsetX = this.viewport.offsetX;
        const offsetY = this.viewport.offsetY;

        context.save();
        context.setTransform(1, 0, 0, 1, 0, 0);
        context.scale(zoom, zoom);
        context.translate(offsetX, offsetY);

        context.beginPath();
        context.strokeStyle = getCSSVar("--color-c");
        context.lineWidth = 1 / zoom;
        context.globalAlpha = 0.2;

        // limites visíveis em espaço local (mundo), considerando pan e zoom
        const worldLeft = -offsetX;
        const worldTop = -offsetY;
        const worldRight = (this.canvas.width / zoom) - offsetX;
        const worldBottom = (this.canvas.height / zoom) - offsetY;

        const startX = Math.floor(worldLeft / this.width) * this.width + (this.x % this.width);
        const startY = Math.floor(worldTop / this.height) * this.height + (this.y % this.height);

        for (let x = startX; x < worldRight; x += this.width) {
            context.moveTo(x, worldTop);
            context.lineTo(x, worldBottom);
        }

        for (let y = startY; y < worldBottom; y += this.height) {
            context.moveTo(worldLeft, y);
            context.lineTo(worldRight, y);
        }
 
        context.stroke();
        context.globalAlpha = 1;

        context.restore();

    };

    public setX = (x : number) : number => this.x = x;
    public setY = (y : number) : number => this.y = y;
    public setWidth = ( width : number) : number => this.width = width;
    public setHeight = ( height : number) : number => this.height = height;

};

export const SCENE_2D_GRID_2D = new Grid2D(
    { canvas : gui.sceneTab.sceneCanvas, width : 10, height : 10, x : 0, y : 0 },
    SCENE_2D_VIEWPORT_2D
);