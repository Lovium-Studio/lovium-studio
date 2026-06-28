
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

import { IScene2D, IScene2dOption, SceneNode,SceneNodeListType } from "../../../ts/types.js";
import { SCENE_2D_VIEWPORT_2D, Viewport2D } from "../viewport-2d/viewport-2d.js";

// SCENE 2D : 

class Scene2d {

    private nodeList: SceneNodeListType[];
    private name: string;
    private id: string;
    private isScene: boolean;
    private sceneRenderAboveList : any[];
    private sceneRenderBelowList : any[];
    private sceneRenderOverlayAboveList : any[];
    private sceneRenderOverlayBelowList : any[];
    
    public zoom : number;

    constructor( option : IScene2D ) {

        this.nodeList = [];
        this.name = "";
        this.id = "";
        this.isScene = false;
        this.sceneRenderAboveList = [];
        this.sceneRenderBelowList = [];
        this.sceneRenderOverlayAboveList = [];
        this.sceneRenderOverlayBelowList = [];
        this.zoom = option.viewport.currentZoom;

        option.viewport.onZoom((zoom : number) => this.zoom = zoom);
        
    }; 

    public loadScene = (scene: IScene2dOption ): void => {
        this.nodeList.push(...scene.nodeList);
        this.isScene = true;
    };

    public getNodeList = (): SceneNodeListType[] => this.nodeList;
    
    public clearScene = (): void => {
        this.isScene = false;
        this.nodeList = [];
    };

    public insertNode = (node: SceneNodeListType): void => {
        this.nodeList.push(node);
        this.isScene = true;
    };

    public deleteNode = (node: SceneNode): void => {
        this.nodeList = this.nodeList.filter(n => n.node !== node); 
    };

    public updateNode = (node: SceneNode , property : any): void => {
        if(node.type === "SPRITE_NODE"){
            if(property.width) node.setWidth(property.width);
            if(property.height) node.setHeight(property.height);
            if(property.x) node.setX(property.x);
            if(property.y) node.setY(property.y);
        };
    };

    public insertSceneAbove = ( element : any ) : any => this.sceneRenderAboveList.push(element);
    public insertSceneBelow = ( element : any ) : any => this.sceneRenderBelowList.push(element);
    public insertSceneOverlayAbove = ( element : any ) : any => this.sceneRenderOverlayAboveList.push(element);
    public insertSceneOverlayBelow = ( element : any ) : any => this.sceneRenderOverlayBelowList.push(element);

    private renderAbove = (context: CanvasRenderingContext2D) : void => {
        if(Array.isArray(this.sceneRenderAboveList) && this.sceneRenderAboveList.length > 0){
            this.sceneRenderAboveList.forEach( element => element.render(context));
        };
    };

    private renderBelow = (context: CanvasRenderingContext2D) : void => {
        if(Array.isArray(this.sceneRenderBelowList) && this.sceneRenderBelowList.length > 0){
            this.sceneRenderBelowList.forEach( element => element.render(context));
        };
    };

    private renderOverlayAbove = (context: CanvasRenderingContext2D) : void => {
        if(Array.isArray(this.sceneRenderOverlayAboveList) && this.sceneRenderOverlayAboveList.length > 0){
            this.sceneRenderOverlayAboveList.forEach( element => element.render(context));
        };
    };

    private renderOverlayBelow = (context: CanvasRenderingContext2D) : void => {
        if(Array.isArray(this.sceneRenderOverlayBelowList) && this.sceneRenderOverlayBelowList.length > 0){
            this.sceneRenderOverlayBelowList.forEach( element => element.render(context));
        };
    };

    public renderScene = (context: CanvasRenderingContext2D): void => {
        context.save();
        this.renderOverlayBelow(context);
        context.scale(this.zoom,this.zoom); 
        this.renderBelow(context); 
        if (this.isScene) this.nodeList.forEach(n => n.node?.render(context));
        this.renderAbove(context);
        context.restore();
        this.renderOverlayAbove(context);
    };
};

export const SCENE_2D = new Scene2d({ viewport : SCENE_2D_VIEWPORT_2D});