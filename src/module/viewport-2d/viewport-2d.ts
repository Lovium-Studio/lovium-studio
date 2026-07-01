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
    public offsetX : number;
    public offsetY : number;
    public zoomOffsetX : number;
    public zoomOffsetY : number;

    
    private width : number;
    private height : number;
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
        this.zoomOffsetX = 0;
        this.zoomOffsetY = 0;
    };

    // aplica o ponto de ancoragem (zoomOffsetX/Y) pra manter o mesmo local sob o cursor durante o zoom
    private applyZoomAnchor = ( oldZoom : number, newZoom : number ) : void => {

        const factor = (1 / newZoom) - (1 / oldZoom);

        this.offsetX += this.zoomOffsetX * factor;
        this.offsetY += this.zoomOffsetY * factor;

        this.notifyOnOffsetCallback();
    };

    public zoomIn = (): void => {
        if (this.currentZoom >= this.zoomMax) return;

        const oldZoom = this.currentZoom;
        const newZoom = Math.min(this.zoomMax, this.currentZoom * 1.1);

        this.applyZoomAnchor(oldZoom, newZoom);

        this.currentZoom = newZoom;
        this.notifyOnZoomCallback();  
    };

    public zoomOut = (): void => {
        if (this.currentZoom <= this.zoomMin) return;

        const oldZoom = this.currentZoom;
        const newZoom = Math.max(this.zoomMin, this.currentZoom / 1.1);

        this.applyZoomAnchor(oldZoom, newZoom);

        this.currentZoom = newZoom;
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

    public setZoomOffsetX = ( offsetX : number ) : void => {
        this.zoomOffsetX = offsetX;
    };

    public setZoomOffsetY = ( offsetY : number ) : void => {
        this.zoomOffsetY = offsetY;
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