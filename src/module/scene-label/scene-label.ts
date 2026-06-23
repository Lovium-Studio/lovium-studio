
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

import { ISceneLabel } from "../../../ts/types.js";

// SCENE LABEL : 

export class SceneLabel {

    private label : HTMLSpanElement;
    private container : HTMLDivElement;

    public x : number;
    public y : number;
    public content : string;
    public isVisible : boolean;
    public rotation : number;

    constructor( option : ISceneLabel ){

        this.label = document.createElement("span");
        this.label.classList.add("scene-label");
        this.container = option.container;
        this.x = 0;
        this.y = 0;
        this.content = "Hello World";
        this.isVisible = false;
        this.rotation = 0;

        this.container.appendChild(this.label);
        this.label.textContent = this.content;
    };

    public setContent = ( text : string ) : void => {
        this.label.textContent = text; 
        this.content = text;
    };

    private updateTransform = () : void => {
        this.label.style.transform = `translateX(${this.x}px) translateY(${this.y}px) rotate(${this.rotation}deg)`;
    };

    public setX = ( x : number ) : void => {
        this.x = x; 
        this.updateTransform();
    };

    public setY = ( y : number ) : void => {
        this.y = y; 
        this.updateTransform();
    };

    public setRotation = ( rotation : number ) : void => {
        if(rotation < 0 || rotation > 360) return;
        this.rotation = rotation;
        this.updateTransform();
    };

    public show = () : string => this.label.style.display = "flex";
    public hide = () : string => this.label.style.display = "none";

};



