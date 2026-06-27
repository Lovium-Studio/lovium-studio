
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

// 2D GRID : 

export class Grid2D {

    private canvas : HTMLCanvasElement;
    private width : number;
    private height : number;
    private x : number;
    private y : number;

    constructor( option : IGrid2D ){
        
        this.canvas = option.canvas;
        this.width = option.width;
        this.height = option.height;
        this.x = option.x;
        this.y = option.y;

    }

    public render = ( context : CanvasRenderingContext2D ) : void => {
               
        context.beginPath();
        context.strokeStyle = getCSSVar("--color-c");
        context.lineWidth = 1;
        context.globalAlpha = 0.2;

        for (let x = this.x % this.width; x < this.canvas.width; x += this.width) {
            const alignedX = Math.floor(x) + 0.5;
            context.moveTo(alignedX, 0);
            context.lineTo(alignedX, this.canvas.height); 
        }

        for (let y = this.y % this.height; y < this.canvas.height; y += this.height) {
            const alignedY = Math.floor(y) + 0.5; 
            context.moveTo(0, alignedY);
            context.lineTo(this.canvas.width, alignedY);
        }
 
        context.stroke();
        context.globalAlpha = 1;

    };

    public setX = (x : number) : number => this.x = x;
    public setY = (y : number) : number => this.y = y;
    public setWidth = ( width : number) : number => this.width = width;
    public setHeight = ( height : number) : number => this.height = height;

};

export const SCENE_2D_GRID_2D = new Grid2D({ canvas : gui.sceneTab.sceneCanvas,width : 10,height : 10,x : 0,y : 0})