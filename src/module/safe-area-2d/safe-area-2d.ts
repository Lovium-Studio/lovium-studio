
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

import { NodeLocation, SafeArea2dOption, Scene2dNodeType } from "../../../ts/types.js";
import { getCSSVar } from "../anchor-node/theme/theme.js";
import { INSPECTOR_SAFE_AREA_SCALE_X_CONTROL, INSPECTOR_SAFE_AREA_SCALE_Y_CONTROL, INSPECTOR_SAFE_AREA_TRANSLATE_X_CONTROL, INSPECTOR_SAFE_AREA_TRANSLATE_Y_CONTROL } from "../inspector-tab/inspector-tab.js";

// SAFE AREA 2D : 

export class SafeArea2d {

    public isStatic : boolean;

    public x : number;
    public y : number;
    public width : number;
    public height : number;
    public isSelected : boolean;
    public type : Scene2dNodeType;
    public location : NodeLocation;
    public isSelectable : boolean;
    public padding : number;

    constructor ( option : SafeArea2dOption ) {

        this.x = option.x;
        this.y = option.y;
        this.width = option.width; 
        this.height = option.height;  
        this.isStatic = true;
        this.isSelected = false;
        this.type = "SAFE_AREA_NODE";
        this.location = "NATIVE";
        this.isSelectable = false;
        this.padding = 10;

        INSPECTOR_SAFE_AREA_SCALE_X_CONTROL.onWrite(value => {
            this.setWidth(Number(value));
        });

        INSPECTOR_SAFE_AREA_SCALE_X_CONTROL.setValue(this.width.toString());

        INSPECTOR_SAFE_AREA_SCALE_Y_CONTROL.onWrite(value => {
            this.setHeight(Number(value));
        });

        INSPECTOR_SAFE_AREA_SCALE_Y_CONTROL.setValue(this.height.toString());

        INSPECTOR_SAFE_AREA_TRANSLATE_X_CONTROL.onWrite(value => {
            this.setX(Number(value));
        });

        INSPECTOR_SAFE_AREA_TRANSLATE_X_CONTROL.setValue(this.x.toString());

        INSPECTOR_SAFE_AREA_TRANSLATE_Y_CONTROL.onWrite(value => {
            this.setY(Number(value));
        });
 
        INSPECTOR_SAFE_AREA_TRANSLATE_Y_CONTROL.setValue(this.y.toString()); 

    };

    public setSelected = (state : boolean ) : boolean => this.isSelected = state;

    public render = (context: CanvasRenderingContext2D): void => {

        const x: number = Math.floor(this.x) + 0.5;
        const y: number = Math.floor(this.y) + 0.5;
        
        const width: number = Math.floor(this.width);
        const height: number = Math.floor(this.height);
        const padding: number = Math.floor(this.padding);

        context.strokeStyle = getCSSVar("--color-b");
        context.lineWidth = 1; 

        context.strokeRect(x, y, width, height);
        context.strokeRect(x - padding, y - padding, width + padding * 2, height + padding * 2);

        context.beginPath();
        context.moveTo(x, Math.floor(y + height / 2) + 0.5); 
        context.lineTo(x - padding, Math.floor(y + height / 2) + 0.5);
        context.stroke();

        context.beginPath();
        context.moveTo(x + width, Math.floor(y + height / 2) + 0.5); 
        context.lineTo(x + width + padding, Math.floor(y + height / 2) + 0.5);
        context.stroke();

        context.beginPath();
        context.moveTo(Math.floor(x + width / 2) + 0.5, y - padding); 
        context.lineTo(Math.floor(x + width / 2) + 0.5, y);
        context.stroke();

        context.beginPath();
        context.moveTo(Math.floor(x + width / 2) + 0.5, y + height); 
        context.lineTo(Math.floor(x + width / 2) + 0.5, y + height + padding); 
        context.stroke();

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