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

// SPRITE NODE ANIMATE : 

import { INPSECTOR_SPRITE_SLOT_CONTROL } from "../inspector-tab/inspector-tab.js";
import { SpriteNode } from "../sprite-node/sprite-node.js";

interface ISpriteNodeAnimation {
    node : SpriteNode,
    from : number,
    to : number,
    currentSlot : number,
    elapsed : number
};

export class SpriteNodeAnimate {

    private tweenSprite : ISpriteNodeAnimation[];
    private isStart : boolean;
    private frameDuration : number;
    private rafId : number | null;
    private lastTime : number | null;

    constructor () {
        this.tweenSprite = [];
        this.isStart = false;
        this.frameDuration = 1 / 12;
        this.rafId = null;
        this.lastTime = null;
    };

    public animateSpriteNode = ( spriteNode : SpriteNode ) : void => {

        const alreadyAnimating = this.tweenSprite.some(tween => tween.node === spriteNode);

        if (!alreadyAnimating) {
            this.tweenSprite.push({
                node : spriteNode,
                from : spriteNode.spriteSlotMin,
                to : spriteNode.spriteSlotMax,
                currentSlot : spriteNode.spriteSlotMin,
                elapsed : 0
            });
        };
  
    }; 

    public removeSpriteNode = ( spriteNode : SpriteNode ) : void => {
        this.tweenSprite = this.tweenSprite.filter(tween => tween.node !== spriteNode);
    };

    public start = () : void => {
        if (this.isStart) return;
        if (this.tweenSprite.length === 0) return;

        this.isStart = true;
        this.lastTime = null;

        this.rafId = requestAnimationFrame(this.update);
    };

    public stop = () : void => {
        this.isStart = false;

        if (this.rafId !== null) {
            cancelAnimationFrame(this.rafId);
            this.rafId = null;
        };

        this.lastTime = null;

        this.tweenSprite.forEach(tween => {
            tween.currentSlot = tween.from;
            tween.elapsed = 0;
            tween.node.setSpriteSlot(Number(INPSECTOR_SPRITE_SLOT_CONTROL.getValue()));     
        });
    };

    public pause = () : void => {
        this.isStart = false;

        if (this.rafId !== null) {
            cancelAnimationFrame(this.rafId);
            this.rafId = null;
        };

        this.lastTime = null;
    };

    private update = ( time : number ) : void => {

        if (!this.isStart) return;

        if (this.lastTime === null) this.lastTime = time;

        const delta = (time - this.lastTime) / 1000;
        this.lastTime = time;

        this.tweenSprite.forEach(tween => {

            tween.elapsed += delta;

            while (tween.elapsed >= this.frameDuration) {

                tween.elapsed -= this.frameDuration;
                tween.currentSlot++;

                if (tween.currentSlot > tween.to) {
                    tween.currentSlot = tween.from; 
                };
            };

            tween.node.setSpriteSlot(tween.currentSlot); 
        });

        this.rafId = requestAnimationFrame(this.update);
    };
};

export const SCENE_2D_SPRITE_NODE_ANIMATE = new SpriteNodeAnimate();