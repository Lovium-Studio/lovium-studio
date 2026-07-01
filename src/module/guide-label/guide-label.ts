
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

import { getCSSVar } from "../anchor-node/theme/theme.js";

// GUIDE LABEL : 

type RadiusSideOption = "ALL" |"LEFT" | "RIGHT";

export class GuideLabel {

    public x : number;
    public y : number; 
    public width : number;
    public height : number;
    public content : number | string;
    public rotation : number; 

    private isVisible : boolean;
    private padding : number;
    private radiusSide : RadiusSideOption;

    constructor(){
        this.x = 0;
        this.y = 0;
        this.width = 0;
        this.height = 19;
        this.content = "undefined"; 
        this.isVisible = true; 
        this.padding = 6;  
        this.rotation = 0;
        this.radiusSide  = "ALL";
    };

    private getRadiusBySide = ( side : RadiusSideOption ) : number[] | number => {

        if(side === "ALL") return [30,30,30,30];
        if(side === "LEFT") return [0,30,30,0];
        if(side === "RIGHT") return [30,0,0,30];     

        return 30; 

    };

    public render = ( context : CanvasRenderingContext2D ) : void => {

        if(!this.isVisible) return; 

        context.font = "9px Arial";

        const radiusSide = this.getRadiusBySide(this.radiusSide);

        const textString = String(this.content);
        const labelMetric = context.measureText(textString);
        
        this.width = labelMetric.width + (this.padding * 2);

        const snapX = Math.round(this.x) + 0.5;
        const snapY = Math.round(this.y) + 0.5;

        context.save();

        context.translate(snapX, snapY);
        context.rotate(this.rotation);

        context.fillStyle = getCSSVar("--color-b");
        context.beginPath(); 
        
        const renderWidth = Math.round(this.width);
        const renderHeight = Math.round(this.height);

        context.roundRect(Math.round(-renderWidth / 2), Math.round(-renderHeight / 2),  renderWidth, renderHeight, radiusSide);
        context.fill();

        context.fillStyle = "white"; 
        context.textAlign = "center";
        context.textBaseline = "middle";   

        context.fillText(textString, 0, 1.5); 

        context.restore();
    };

    public setX = (x : number) : number => this.x = x;
    public setY = (y : number) : number => this.y = y;
    public show = () : boolean => this.isVisible = true;
    public hide = () : boolean => this.isVisible = false;
    public setContent = ( content : string | number ) : string | number => this.content = content;
    public setRotation = ( rotation : number ) : number => this.rotation = rotation;
    public setRadiusSide = ( side : RadiusSideOption ) : string => this.radiusSide = side;

};