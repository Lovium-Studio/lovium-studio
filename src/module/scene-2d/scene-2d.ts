
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

import { IScene2dOption, SceneNode,SceneNodeListType } from "../../../ts/types.js";
import { Grid2D } from "../2d-grid/2d-grid.js";
import { console } from "../console/console.js";
import { CrossGuide } from "../cross-guide/cross-guide.js";
import { gui } from "../gui/gui.js";
import { INSPECTOR_OPACITY_CONTROL, INSPECTOR_ROTATE_CONTROL, INSPECTOR_SCALE_X_CONTROL, INSPECTOR_SCALE_Y_CONTROL, INSPECTOR_TRANSLATE_X_CONTROL, INSPECTOR_TRANSLATE_Y_CONTROL } from "../inspector-tab/inspector-tab.js";
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
    private GRID_2D : Grid2D;

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

        // 2D GRID : 

        this.GRID_2D = new Grid2D({
            canvas : gui.sceneTab.sceneCanvas,
            width : 10,
            height : 10,
            x : 0,
            y : 0
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

            INSPECTOR_SCALE_X_CONTROL.setValue(coord.width);
            INSPECTOR_SCALE_Y_CONTROL.setValue(coord.height);
            INSPECTOR_TRANSLATE_X_CONTROL.setValue(coord.x);
            INSPECTOR_TRANSLATE_Y_CONTROL.setValue(coord.y);

        });

        gui.sceneTab.scene2dAlignHorizontalButton.addEventListener("click",()=>{
            if(this.selectedNode){

                const x = ( this.SAFE_AREAD_2D.x + this.SAFE_AREAD_2D.width ) / 2 - this.selectedNode.width / 2;
                this.selectedNode.setX(x) 
                this.RESIZE_HANDLE.setNode(this.selectedNode) 
 
            }; 
        });

        INSPECTOR_OPACITY_CONTROL.onDrag(value => {
            if(this.selectedNode?.type === "SPRITE_NODE"){
                this.selectedNode.setOpacity(parseFloat(value))
                console(value) 
            };
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
            this.CROSS_GUIDE.setSide("ALL") 
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

        INSPECTOR_TRANSLATE_Y_CONTROL.onIncrementorStart(()=>{ 
            this.CROSS_GUIDE.show();
            this.CROSS_GUIDE.setSide("VERTICAL");   
            console("TESTE 1")

        }); 

        INSPECTOR_TRANSLATE_Y_CONTROL.onIncrementorEnd(()=>{
            this.CROSS_GUIDE.hide();   
            this.CROSS_GUIDE.setSide("VERTICAL");
            console("TESTE 2")

        });

        INSPECTOR_TRANSLATE_X_CONTROL.onIncrementorStart(()=>{ 
            this.CROSS_GUIDE.show();
            this.CROSS_GUIDE.setSide("HORIZONTAL");   
            console("TESTE 1")

        }); 

        INSPECTOR_TRANSLATE_X_CONTROL.onIncrementorEnd(()=>{  
            this.CROSS_GUIDE.hide();   
            this.CROSS_GUIDE.setSide("HORIZONTAL");
            console("TESTE 2")

        });

        INSPECTOR_ROTATE_CONTROL.onWrite(value => {
            if(this.selectedNode?.type === "SPRITE_NODE"){
                this.selectedNode.setRotation(parseInt(value));
            };
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

                    // GET OPACITY :    

                    if (this.selectedNode?.type === "SPRITE_NODE") {
                        INSPECTOR_OPACITY_CONTROL.setValue(this.selectedNode.opacity); 
                        INSPECTOR_ROTATE_CONTROL.setValue(this.selectedNode.rotation);  
                    };

                    // UPDATE INSPECTOR :  

                    INSPECTOR_SCALE_X_CONTROL.setValue(n.node.width);
                    INSPECTOR_SCALE_Y_CONTROL.setValue(n.node.height);
                    INSPECTOR_TRANSLATE_X_CONTROL.setValue(n.node.x);
                    INSPECTOR_TRANSLATE_Y_CONTROL.setValue(n.node.y); 

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



    private renderAbove = (context: CanvasRenderingContext2D) : void => {
        this.CROSS_GUIDE.render(context);
        this.SAFE_AREAD_2D.render(context);
    };

    private renderBelow = (context: CanvasRenderingContext2D) : void => {
        this.GRID_2D.render(context) 
    };

    public renderScene = (context: CanvasRenderingContext2D): void => {

        context.save();

        this.renderBelow(context); 

        if (this.isScene) { 

            this.nodeList.forEach(n =>{ 
                if(n.node) n.node.render(context);
            });
            
        };

        this.renderAbove(context);

        context.restore();

    };

}

export const scene2d : Scene2d = new Scene2d();

