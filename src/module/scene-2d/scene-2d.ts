
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

import { IScene2dOption, SceneNode } from "../../../typescript/types.js";
import { console } from "../console/console.js";
import { gui } from "../gui/gui.js";
import { INSPECTOR_SCALE_X_CONTROL, INSPECTOR_SCALE_Y_CONTROL, INSPECTOR_TRANSLATE_X_CONTROL, INSPECTOR_TRANSLATE_Y_CONTROL } from "../inspector-tab/inspector-tab.js";
import { ResizeHandle } from "../resize-handle/resize-handle.js";
import { SafeArea2d } from "../safe-area-2d/safe-area-2d.js";

// SCENE 2D : 

class Scene2d {

    private nodeList : SceneNode[];
    private name : string ;
    private id : string;
    private isScene : boolean;
    private safeArea2d : SafeArea2d;
    private scene2dResizeHandle : ResizeHandle;

    constructor(){

        this.nodeList = [];
        this.name = "";
        this.id = "";
        this.isScene = false;   

        // RESIZE HANDLE : 

        this.scene2dResizeHandle = new ResizeHandle(gui.boardTab.boardContainer);

        // SAFE AREA 2D : 

        this.safeArea2d = new SafeArea2d({
            x: 200,
            y: 100,
            width: 500,
            height: 400
        }); 

        this.insertNode(this.safeArea2d);  

        // EVENT : 
        
        gui.sceneTab.sceneCanvasContainer.addEventListener("click",(e: MouseEvent)=>{

            const rect = gui.sceneTab.sceneCanvas.getBoundingClientRect();

            const mouseX = e.clientX - rect.left;
            const mouseY = e.clientY - rect.top;

            this.nodeList.find(node => {

                if(mouseX >= node.x && mouseX <= node.x + node.width && mouseY >= node.y && mouseY <= node.y + node.height && !node.isSelected){

                    this.scene2dResizeHandle.setHandle({
                        x : node.x,
                        y : node.y,
                        width : node.width,
                        height : node.height,
                        rotate : false,   
                        type : "SINGLE_OBJECT",
                        object : "CANVAS"
                    }); 

                    this.scene2dResizeHandle.onTransform((coord => {
                        node.setX(coord.x); 
                        node.setY(coord.y);
                        node.setWidth(coord.width);
                        node.setHeight(coord.height);
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

                    node.setSelected(true);  

                    return true; 
                };

                return false;
            }); 

        });
    };

    public loadScene = ( scene : IScene2dOption ) : void => {
        this.nodeList = scene.nodeList;
        this.isScene = true;
    };   

    public clearScene = () : void => {
        this.isScene = false;
        this.nodeList = [];
    };

    public insertNode = ( node : SceneNode ) : void => {
        this.nodeList.push(node);
        this.isScene = true;
    };
 
    public deleteNode = ( node : SceneNode ) : void => {

    };

    public updateNode = ( node : SceneNode ) : void => {

    }; 

    public renderScene = ( context : CanvasRenderingContext2D ) : void => {
        if(this.isScene) this.nodeList.forEach(node => node.render(context));
    };
};

export const scene2d : Scene2d = new Scene2d();

