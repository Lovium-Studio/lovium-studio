
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

import { IScene2dOption, SceneNode, SceneNodeOption,SceneNodeListType } from "../../../ts/types.js";
import { console } from "../console/console.js";
import { CrossGuide } from "../cross-guide/cross-guide.js";
import { gui } from "../gui/gui.js";
import { INSPECTOR_SCALE_X_CONTROL, INSPECTOR_SCALE_Y_CONTROL, INSPECTOR_TRANSLATE_X_CONTROL, INSPECTOR_TRANSLATE_Y_CONTROL } from "../inspector-tab/inspector-tab.js";
import { ResizeHandle } from "../resize-handle/resize-handle.js";
import { SafeArea2d } from "../safe-area-2d/safe-area-2d.js";

// SCENE 2D : 

class Scene2d {

    private nodeList: SceneNodeListType[];
    private name: string;
    private id: string;
    private isScene: boolean;
    private lastSelectedNode: SceneNode | null;
    private selectedNode: SceneNode | null;
    private sceneContainerRect : DOMRect;
    
    private SAFE_AREAD_2D : SafeArea2d;
    private RESIZE_HANDLE : ResizeHandle;
    private CROSS_GUIDE : CrossGuide;

    constructor() {

        this.nodeList = [];
        this.name = "";
        this.id = "";
        this.isScene = false;
        this.lastSelectedNode = null;
        this.selectedNode = null;
        this.sceneContainerRect = gui.sceneTab.sceneCanvasContainer.getBoundingClientRect();
        
        // RESIZE HANDLE :

        this.RESIZE_HANDLE = new ResizeHandle(gui.sceneTab.sceneGUIContainer);

        this.RESIZE_HANDLE.config({
            lineType: "DASHED",
        }); 

        // SAFE AREA 2D :

        const safeAreaStartPadding : number = 20;

        this.SAFE_AREAD_2D = new SafeArea2d({
            x: safeAreaStartPadding,   
            y: safeAreaStartPadding,
            width: 700,
            height: 350 
        });

        this.insertNode({
            node: this.SAFE_AREAD_2D, 
            type : "SAFE_AREA_NODE", 
            width : 200,
            height : 100, 
            y : 200,
            x : 100, 
            location : "NATIVE"
        });

        // CORSS GUIDE : 

        this.CROSS_GUIDE = new CrossGuide({
            safeArea2d : this.SAFE_AREAD_2D,
            resizeHandle : this.RESIZE_HANDLE
        });

        // RESIZE HANDLE EVENT :

        this.RESIZE_HANDLE.onTransform(coord => {

            if (!this.lastSelectedNode) return;
            
            this.lastSelectedNode.setX(coord.x);
            this.lastSelectedNode.setY(coord.y);
            this.lastSelectedNode.setWidth(coord.width);
            this.lastSelectedNode.setHeight(coord.height);

            INSPECTOR_SCALE_X_CONTROL.setValue(coord.width.toString());
            INSPECTOR_SCALE_Y_CONTROL.setValue(coord.height.toString());
            INSPECTOR_TRANSLATE_X_CONTROL.setValue(coord.x.toString());
            INSPECTOR_TRANSLATE_Y_CONTROL.setValue(coord.y.toString());

        });

        // this.RESIZE_HANDLE.onHandleMouseUp((handle : any)=>{
        //     if(handle === "LEFT") this.CROSS_GUIDE.setSide(handle);  
        // }) 
  
        this.RESIZE_HANDLE.onResizeHandleMouseDown(()=> {
            crossHideVisibility(true);
        });
 
        this.RESIZE_HANDLE.onResizeHandleMouseUp(()=> {
            crossHideVisibility(false);
        }); 

        const crossHideVisibility = ( state : boolean ) : void => {
            state ? this.CROSS_GUIDE.show() : this.CROSS_GUIDE.hide();
            // this.CROSS_GUIDE.setSide("LEFT")
        };

        // INSPECTOR EVENT :

        INSPECTOR_SCALE_X_CONTROL.onWrite(value => {

            this.RESIZE_HANDLE.setWidth(parseInt(value));

        });

        INSPECTOR_SCALE_Y_CONTROL.onWrite(value => {

            this.RESIZE_HANDLE.setHeight(parseInt(value));

        });

        INSPECTOR_TRANSLATE_X_CONTROL.onWrite(value => { 

            this.RESIZE_HANDLE.setX(parseInt(value));

        });

        INSPECTOR_TRANSLATE_Y_CONTROL.onWrite(value => {

            this.RESIZE_HANDLE.setY(parseInt(value));

        });

        // SCENE CLICK EVENT : 

        gui.sceneTab.sceneCanvasContainer.addEventListener("click", (e: MouseEvent) => {

            const rect = gui.sceneTab.sceneCanvas.getBoundingClientRect(); 

            const mouseX = e.clientX - rect.left;
            const mouseY = e.clientY - rect.top;

            this.nodeList.find(n => {

                if(!n.node) return;

                if (mouseX >= n.node.x && mouseX <= n.node.x + n.node.width && mouseY >= n.node.y && mouseY <= n.node.y + n.node.height && n.node.isSelectable) {

                    // DESELECT OLD NODE :

                    if (this.lastSelectedNode && this.lastSelectedNode !== n.node) {

                        this.lastSelectedNode.setSelected(false);

                    };

                    // SELECT NEW NODE : 

                    this.lastSelectedNode = n.node; 
                    this.selectedNode = n.node; 

                    n.node.setSelected(true);
 
                    // UPDATE RESIZE HANDLE :

                    this.RESIZE_HANDLE.setHandle({
                        x: n.node.x,
                        y: n.node.y,
                        width: n.node.width,
                        height: n.node.height,
                        rotate: false,
                        type: "SINGLE_OBJECT",
                        object: "CANVAS"
                    }); 

                    this.RESIZE_HANDLE.show();

                    // UPDATE INSPECTOR :  

                    INSPECTOR_SCALE_X_CONTROL.setValue(n.node.width.toString());
                    INSPECTOR_SCALE_Y_CONTROL.setValue(n.node.height.toString());
                    INSPECTOR_TRANSLATE_X_CONTROL.setValue(n.node.x.toString());
                    INSPECTOR_TRANSLATE_Y_CONTROL.setValue(n.node.y.toString()); 

                    return true;
                };

                return false;
            });

        });

    };

    public loadScene = (scene: IScene2dOption ): void => {

        this.nodeList.push(...scene.nodeList);

        this.isScene = true;

    };

    public getScene = (): SceneNodeListType[] => {

        return this.nodeList;

    };

    public clearScene = (): void => {

        this.isScene = false;

        this.nodeList = [];

        this.lastSelectedNode = null;

        this.RESIZE_HANDLE.hide();

    };

    public insertNode = (node: SceneNodeListType): void => {

        this.nodeList.push(node);

        this.isScene = true;

    };

    public deleteNode = (node: SceneNode): void => {

        this.nodeList = this.nodeList.filter(n => n.node !== node); 

        if (this.lastSelectedNode === node) {

            this.lastSelectedNode = null;

            this.RESIZE_HANDLE.hide();

        };

    };

    public updateNode = (node: SceneNode): void => {

        if (this.lastSelectedNode === node) {

            this.RESIZE_HANDLE.setHandle({
                x: node.x,
                y: node.y,
                width: node.width,
                height: node.height,
                rotate: false,
                type: "SINGLE_OBJECT",
                object: "CANVAS"
            });

        };

    };

    private renderNative = (context: CanvasRenderingContext2D) : void => {
        this.CROSS_GUIDE.render(context)
    };

    public renderScene = (context: CanvasRenderingContext2D): void => {

        if (this.isScene) {

            this.nodeList.forEach(n =>{ 
                if(n.node) n.node.render(context)
                });
            
        };

        this.renderNative(context);

    };

}

export const scene2d : Scene2d = new Scene2d();

