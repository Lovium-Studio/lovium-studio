
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

import { SafeArea2dOption } from "../../../ts/types.js";
import { getCSSVar } from "../anchor-node/theme/theme.js";

// SAFE AREA 2D : 

export class SafeArea2d {

    public isStatic : boolean;

    public x : number;
    public y : number;
    public width : number;
    public height : number;
    public isSelected : boolean;

    constructor ( option : SafeArea2dOption ) {
        this.x = option.x;
        this.y = option.y;
        this.width = option.width; 
        this.height = option.height;  
        this.isStatic = true;
        this.isSelected = false;
    };

    public setSelected = (state : boolean ) : boolean => this.isSelected = state;

    public render = ( context : CanvasRenderingContext2D ) : void => {

        context.strokeStyle = getCSSVar("--color-a");
        context.lineWidth = 1;
        context.strokeRect(this.x, this.y, this.width, this.height);

    }; 

    public setCoordinate = (x : number , y : number) : void => {
        if(x) this.x = x;
        if(y) this.y = y;
    };

    public setSize = ( width : number , height : number) : void => {
        if(width) this.width = width;
        if(height) this.height = height;
    };

    public setX = (x : number) : number => this.x = x;
    public setY = (y : number) : number => this.y = y;
    public setWidth = ( width : number) : number => this.width = width;
    public setHeight = ( height : number) : number => this.height = height;
    
};