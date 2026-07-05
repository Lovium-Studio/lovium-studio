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
import { getCSSVar } from "../anchor-node/theme/theme.js";

// SPRITE NODE : 

export class SpriteNode { 

    public x : number;
    public y : number;
    public width : number; 
    public height : number;
    public image : HTMLImageElement;
    public isSelected : boolean;
    public type : "SPRITE_NODE";
    public location : NodeLocation;
    public isSelectable : boolean;
    public opacity : number;
    public rotation : number;
    public anchorPoint : [number,number];
    public spriteSlot : number;
    public spriteSlotMin : number;
    public spriteSlotMax : number; 
    
    private src : string[];  
    private isLoaded : boolean;
    private imageCache : Map<string, HTMLImageElement>;

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
        this.spriteSlot = 0;
        this.spriteSlotMin = 0;
        this.spriteSlotMax = option.src.length;

        this.imageCache = new Map();
        this.image = new Image();

        this.preloadAll(this.src, () => {
            this.setActiveImage(this.src[this.spriteSlot]);
        });
        
    };

    private preloadAll = ( srcList : string[], onAllLoaded : () => void ) : void => {

        let pending = srcList.length;

        if (pending === 0) return;

        srcList.forEach(path => {

            if (this.imageCache.has(path)) {
                pending--;
                if (pending === 0) onAllLoaded();
                return;
            };

            const img = new Image();
            img.src = path;

            img.onload = () : void => {
                this.imageCache.set(path, img);
                pending--;
                if (pending === 0) onAllLoaded();
            };
        });
    };

    private setActiveImage = ( path : string ) : void => {

        const cached = this.imageCache.get(path);

        if (cached) {
            this.image = cached;
            this.isLoaded = true;
        };
    };

   public render( context : CanvasRenderingContext2D ): void {

    if (!this.isLoaded) return;

        context.save();

        context.imageSmoothingEnabled = false;   

        const centerX = this.x + this.width / 2;
        const centerY = this.y + this.height / 2;
        context.translate(centerX, centerY); 
    
        context.rotate(this.rotation * (Math.PI / 180)); 
        context.globalAlpha = this.opacity;
 
        // context.strokeStyle = getCSSVar("--color-c");  
        // context.lineWidth = 1;
        // context.strokeRect(-this.width / 2, -this.height / 2, this.width, this.height);
        
        context.drawImage(this.image, -this.width / 2, -this.height / 2, this.width, this.height);

        context.restore(); 

    };

    public setX = (x : number) : number => this.x = x;
    public setY = (y : number) : number => this.y = y;
    public setWidth = ( width : number) : number => this.width = width;
    public setHeight = ( height : number) : number => this.height = height;
    public setSelected = (state : boolean ) : boolean => this.isSelected = state;
    public setOpacity = ( opacity : number ) : number => this.opacity = opacity;
    public setRotation = ( rotation : number ) : number => this.rotation = rotation;

    public getSpriteList = () : string[] => this.src;

    public setSpriteSlot = ( slot : number ) : void => {
        if(slot < this.spriteSlotMin || slot >= this.spriteSlotMax) return;

        this.spriteSlot = slot;
        this.setActiveImage(this.src[slot]);
    }; 

    public setSrcList = ( newSrcList : string[] ) : void => {
        this.src = newSrcList;
        this.spriteSlotMax = newSrcList.length;
        this.imageCache.clear();

        this.preloadAll(this.src, () => {
            this.setSpriteSlot(0);
        });
    };
 
};