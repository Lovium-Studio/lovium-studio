
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

import { NodeLocation, Scene2dNodeType, ISpriteNode } from "../../../ts/types.js";

// SPRITE NODE : 

export class SpriteNode { 

    public x : number;
    public y : number;
    public width : number; 
    public height : number;
    public image : HTMLImageElement;
    public isSelected : boolean;
public type : Scene2dNodeType;
    public location : NodeLocation;
    public isSelectable : boolean;
    public opacity : number;
    public rotation : number;
    public anchorPoint : [number,number];
    
    private src : string;
    private isLoaded : boolean;

    constructor(option : ISpriteNode){ 

        this.src = option.src;
        this.x = option.x;
        this.y = option.y; 
        this.isLoaded = false; 
        this.width = option.width;
        this.height = option.height;
        this.isSelected = false;
        this.type = "SPRITE_NODE";
        this.location = "FOREIGNER";
        this.isSelectable = true;
        this.opacity = option.opacity;
        this.rotation = option.rotation;
        this.anchorPoint = option.anchorPoint;

        this.image = new Image();
        this.image.src = this.src;
        this.image.onload = () : boolean => this.isLoaded = true;
        
    };

   public render( context : CanvasRenderingContext2D ): void {

    if (!this.isLoaded) return;

        context.save();

        const centerX = this.x + this.width / 2;
        const centerY = this.y + this.height / 2;
        context.translate(centerX, centerY); 
    
        context.rotate(this.rotation * (Math.PI / 180)); 
        context.globalAlpha = this.opacity; 
        
        context.drawImage(this.image, -this.width / 2, -this.height / 2, this.width, this.height);

        context.restore(); 

    };
    
    public setSrc(newPath: string): void {
        this.isLoaded = false; 
        this.image = new Image();
        this.image.src = newPath;
        this.image.onload = () : boolean => this.isLoaded = true;
    };

    public setX = (x : number) : number => this.x = x;
    public setY = (y : number) : number => this.y = y;
    public setWidth = ( width : number) : number => this.width = width;
    public setHeight = ( height : number) : number => this.height = height;
    public setSelected = (state : boolean ) : boolean => this.isSelected = state;
    public setOpacity = ( opacity : number ) : number => this.opacity = opacity;
    public setRotation = ( rotation : number ) : number => this.rotation = rotation;
 
};