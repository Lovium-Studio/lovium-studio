
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

import { IScene2dOption, SceneNode, SceneNodeOption } from "../../../ts/types.js";
import { console } from "../console/console.js";
import { gui } from "../gui/gui.js";
import { INSPECTOR_SCALE_X_CONTROL, INSPECTOR_SCALE_Y_CONTROL, INSPECTOR_TRANSLATE_X_CONTROL, INSPECTOR_TRANSLATE_Y_CONTROL } from "../inspector-tab/inspector-tab.js";
import { ResizeHandle } from "../resize-handle/resize-handle.js";
import { SafeArea2d } from "../safe-area-2d/safe-area-2d.js";

// SCENE 2D : 

class Scene2d {

    private nodeList : SceneNodeOption[];
    private name : string ;
    private id : string;
    private isScene : boolean;
    private safeArea2d : SafeArea2d;
    private scene2dResizeHandle : ResizeHandle;
    private lastSelectedNode : SceneNode | null;

    constructor(){

        this.nodeList = [];
        this.name = "";
        this.id = "";
        this.isScene = false;  
        this.lastSelectedNode = null; 

        // RESIZE HANDLE : 

        this.scene2dResizeHandle = new ResizeHandle(gui.boardTab.boardContainer);

        this.scene2dResizeHandle.config({
            lineType : "DASHED"
        })  

        // SAFE AREA 2D : 

        this.safeArea2d = new SafeArea2d({
            x: 200,
            y: 100,
            width: 500,
            height: 400
        }); 

        this.insertNode({ 
            node : this.safeArea2d
        });  

        // EVENT : 
        
        gui.sceneTab.sceneCanvasContainer.addEventListener("click",(e: MouseEvent)=>{

            const rect = gui.sceneTab.sceneCanvas.getBoundingClientRect();

            const mouseX = e.clientX - rect.left;
            const mouseY = e.clientY - rect.top;

            this.nodeList.find(n => { 

                if(mouseX >= n.node.x && mouseX <= n.node.x + n.node.width && mouseY >= n.node.y && mouseY <= n.node.y + n.node.height && !n.node.isSelected){

                    if(this.lastSelectedNode && this.lastSelectedNode != n.node) {
                        n.node.setSelected(false);  
                        this.lastSelectedNode = n.node;  
                    }; 

                    this.scene2dResizeHandle.setHandle({
                        x : n.node.x,
                        y : n.node.y,
                        width : n.node.width,
                        height : n.node.height,
                        rotate : false,   
                        type : "SINGLE_OBJECT",
                        object : "CANVAS"
                    }); 

                    this.scene2dResizeHandle.onTransform((coord => {
                        n.node.setX(coord.x); 
                        n.node.setY(coord.y);
                        n.node.setWidth(coord.width);
                        n.node.setHeight(coord.height);
                        INSPECTOR_SCALE_X_CONTROL.setValue(coord.width.toString());
                        INSPECTOR_SCALE_Y_CONTROL.setValue(coord.height.toString());
                        INSPECTOR_TRANSLATE_X_CONTROL.setValue(coord.x.toString());
                        INSPECTOR_TRANSLATE_Y_CONTROL.setValue(coord.y.toString());
                    }));  

                    INSPECTOR_SCALE_X_CONTROL.onWrite(value=> this.scene2dResizeHandle.setWidth(parseInt(value)));
                    INSPECTOR_SCALE_Y_CONTROL.onWrite(value=> this.scene2dResizeHandle.setHeight(parseInt(value)));
                    INSPECTOR_TRANSLATE_X_CONTROL.onWrite(value=> this.scene2dResizeHandle.setX(parseInt(value)));
                    INSPECTOR_TRANSLATE_Y_CONTROL.onWrite(value=> this.scene2dResizeHandle.setY(parseInt(value))); 

                    this.scene2dResizeHandle.show();

                    n.node.setSelected(true);  

                    return true; 
                };

                return false;
            });  
 
        });
    }; 

    public loadScene = ( scene : IScene2dOption ) : void => {
        this.nodeList.push(...scene.nodeList) ;
        this.isScene = true;
    };    

    public getScene = () : void => {
        
    };

    public clearScene = () : void => {
        this.isScene = false;
        this.nodeList = [];
    };

    public insertNode = ( node : SceneNodeOption ) : void => {
        this.nodeList.push(node);
        this.isScene = true;
    };
 
    public deleteNode = ( node : SceneNode ) : void => {

    };

    public updateNode = ( node : SceneNode ) : void => {

    }; 

    public renderScene = ( context : CanvasRenderingContext2D ) : void => {
        if(this.isScene) this.nodeList.forEach(n => n.node.render(context));
    };
};

export const scene2d : Scene2d = new Scene2d();

