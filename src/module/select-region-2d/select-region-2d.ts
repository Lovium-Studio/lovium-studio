
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

// SELECT REGION 2D : 

export class SelectRegion2D { 

    public width : number;
    public height : number; 
    public x : number;
    public y : number;
    public isEnabled : boolean;
    public container : HTMLDivElement;
    public isResizing : boolean;

    constructor( container : HTMLDivElement) {

        this.width = 0;
        this.height = 0;
        this.y = 0;
        this.x = 0; 
        this.isEnabled = true;
        this.container = container;
        this.isResizing = false;

        this.container.addEventListener("mousedown",( e : MouseEvent )=>{
            if(this.isEnabled){

                const rect = this.container.getBoundingClientRect();
                const mouseX = e.clientX - rect.left;
                const mouseY = e.clientY - rect.top; 

                this.setX(mouseX);
                this.setY(mouseY); 
                this.setWidth(0); 
                this.setHeight(0);
                this.isResizing = true; 
            };
        });

        this.container.addEventListener("mousemove",( e : MouseEvent )=>{
            if(this.isEnabled && this.isResizing){

                const rect = this.container.getBoundingClientRect();
                const mouseX = e.clientX - rect.left;
                const mouseY = e.clientY - rect.top;

                this.setWidth(mouseX - this.x);
                this.setHeight(mouseY - this.y);
            }
        });

        this.container.addEventListener("mouseup", () => {  
            this.isResizing = false;
            this.setWidth(0); 
            this.setHeight(0);
        });

    };

    public render = ( context : CanvasRenderingContext2D ) : void => {

        if(this.width !== 0 && this.height !== 0){

            context.strokeStyle = getCSSVar("--color-c");
            context.lineWidth = 1;
            context.fillStyle = getCSSVar("--color-c");
            
            context.globalAlpha = 0.2;       

            context.fillRect(Math.floor(this.x) , Math.floor(this.y), Math.floor(this.width), Math.floor(this.height));

            context.globalAlpha = 1;   

            const strokeX = Math.floor(this.x) + 0.5;
            const strokeY = Math.floor(this.y) + 0.5;  
            const strokeW = Math.floor(this.width);
            const strokeH = Math.floor(this.height);

            context.strokeRect(strokeX, strokeY, strokeW, strokeH);
        };
    };

    public setX = (x : number) : number => this.x = x;
    public setY = (y : number) : number => this.y = y;
    public setWidth = ( width : number) : number => this.width = width;
    public setHeight = ( height : number) : number => this.height = height;
    public show = () : boolean => this.isEnabled = true;
    public hide = () : boolean => this.isEnabled = false;
    
};