
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

import { SpriteNodeOption } from "../../../ts/types.js";

// SPRITE NODE : 

export class SpriteNode { 

    public x : number;
    public y : number;
    public width : number; 
    public height : number;
    public image : HTMLImageElement;
    public isSelected : boolean;
    
    private src : string;
    private isLoaded : boolean;

    constructor(option : SpriteNodeOption){ 

        this.src = option.src;
        this.x = 0;
        this.y = 0;
        this.isLoaded = false;
        this.width = option.width;
        this.height = option.height;
        this.isSelected = false;

        this.image = new Image();
        this.image.src = this.src;
        this.image.onload = () => {
            this.isLoaded = true;
        };
    };

    public render( context : CanvasRenderingContext2D ): void {

        if (!this.isLoaded) return;

        context.drawImage(this.image, this.x, this.y,this.width,this.height);
    };
    
    public setSrc(newPath: string): void {
        this.isLoaded = false; 
        this.image = new Image();
        this.image.src = newPath;
        this.image.onload = () => {
            this.isLoaded = true;
        };
    };

    public setX = (x : number) : number => this.x = x;
    public setY = (y : number) : number => this.y = y;
    public setWidth = ( width : number) : number => this.width = width;
    public setHeight = ( height : number) : number => this.height = height;
    public setSelected = (state : boolean ) : boolean => this.isSelected = state;

};