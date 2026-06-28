
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

import { IViewport2D } from "../../../ts/types.js";

// VIEWPORT 2D : 

export class Viewport2D {
    
    public currentZoom : number;
    
    private width : number;
    private height : number;
    private offsetX : number;
    private offsetY : number; 
    private zoomMax : number;
    private zoomMin : number;

    private onZoomCallbackList : Function[] = [];
    private onOffsetCallbackList : Function[] = [];

    constructor( option : IViewport2D){
        this.width = option.width;
        this.height = option.height;
        this.offsetX = option.offsetX;
        this.offsetY = option.offsetY;
        this.zoomMax = 5;
        this.zoomMin = 0.2; 
        this.currentZoom = 1;
    };

    public zoomIn = (): void => {
        if (this.currentZoom >= this.zoomMax) return;

        this.currentZoom = Math.min(
            this.zoomMax,
            this.currentZoom * 1.1  
        );
 
        this.notifyOnZoomCallback();
    };

    public zoomOut = (): void => {
        if (this.currentZoom <= this.zoomMin) return;

        this.currentZoom = Math.max(
            this.zoomMin,
            this.currentZoom / 1.1
        );

        this.notifyOnZoomCallback();
    };

    private notifyOnZoomCallback = () : void => {
        if(this.onZoomCallbackList.length > 0){
            this.onZoomCallbackList.forEach(callback => callback(this.currentZoom));
        };
    };

    private notifyOnOffsetCallback = () : void => {
        if(this.onOffsetCallbackList.length > 0){
            this.onOffsetCallbackList.forEach(callback => callback({ x: this.offsetX, y: this.offsetY }));
        };
    };

    public setOffsetX = ( offsetX : number ) : void => {
        this.offsetX = offsetX;
        this.notifyOnOffsetCallback();
    };

    public setOffsetY = ( offsetY : number ) : void => {
        this.offsetY = offsetY;
        this.notifyOnOffsetCallback();
    };

    public onZoom = ( callback : Function ) : void => {
        this.onZoomCallbackList.push(callback);
    };

    public onOffset = ( callback : Function ) : void => {
        this.onOffsetCallbackList.push(callback);
    };

    public setWidth = ( width : number  ) : number => this.width = width;
    public setHeight = ( height : number  ) : number => this.height = height;
};   

export const SCENE_2D_VIEWPORT_2D = new Viewport2D({ width : 0 , height : 0, offsetX : 0 , offsetY : 0});