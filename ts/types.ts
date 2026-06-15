
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

import { DropdownControl, NumberControl, SliderControl, TextControl } from "../src/module/control/control.js";
import { SafeArea2d } from "../src/module/safe-area-2d/safe-area-2d.js";
import { SpriteNode } from "../src/module/sprite-node/sprite-node.js";

// TAB LOCATION TYPE : 

export type TabLocationOption = "BOTTOM" | "TOP" | "LEFT" | "RIGHT";

// CONSOLE INFORMATION TYPE : 

export type ConsoleTypeOption = "ALERT" | "ERROR" | "LOG";

// RESIZE HANDLE OBJECT MANIPULATION TYPE : 

export type ResizeHandleTypeOption = "SINGLE_OBJECT" | "GROUP_OBJECT" | "ASPECT_RATIO_OBJECT" | "PATTERN_OBJECT";

// RESIZE HANDLE OBJECT TYPE :

export type ResizeHandleObjectType = "HTML" | "CANVAS";

// TIMELINE TRACK TYPE : 

export type AnimationTrackTypeOption = "TRANSLATE_X" | "TRANSLATE_Y" | "ROTATE" | "SCALE" | "OPACITY";

// STATUS BAR SIDE TYPE : 

export type StatusBadgeSideType = "RIGHT" | "LEFT";

// CONTROL TYPE : 

export type ControlType = "TEXT_CONTROL" | "PASSWORD_CONTROL" | "SLIDER_CONTROL" | "NUMBER_CONTROL" | "DROPDOWN_CONTROL";

// CONTROL GROUP CONTROL TYPE : 

export type ControlGroupAddType = TextControl | NumberControl | SliderControl | DropdownControl;

// INSPECTOR CONTROL GROUP TYOE : 

export type InspectorControlGroupType = "TRANSFORM" | "SPRITE" | "NODE" | "APPEARANCE" | "ANIMATION" | "GRID" | "COLLISION";

// SCENE 2D NODE TYPE : 

export type Scene2dNodeType = "SPRITE_NODE";

// CAMERA TYPE : 

export type CameraType = "CAMERA_2D" | "CAMERA_3D";

// TAB OPTION : 

export type SceneNode =  SafeArea2d | SpriteNode;
// export type SceneNode = NodeSpriteOption | SafeArea2d;

export interface ITab {
    name: string,
    content: HTMLDivElement,
    id: string,
    location: TabLocationOption
};

// CONTEXT MENU OPTION :

export interface IContextMenu {
    id : string,
    label : string,
    icon : string,
    divisor? : boolean
};

// DROPDOWN OPTION : 

export interface IDropdown {
    label : string, 
    id? : string, 
    icon : string
};

// WINDOW MENU OPTION : 

export interface IWindowMenu {
    label : string,
    id ? : string , 
    divisor ? : boolean
};

// RESIZE HANDLE OPTION : 

export interface IResizeHandle {
    type: ResizeHandleTypeOption,
    x: number ,
    y: number,
    width: number,
    height: number,
    rotate: boolean
    object  : ResizeHandleObjectType
};

// RESIZE HANDLE COORDINATE RETURN : 

export interface IResizeHandleCoordinate {
    x : number,
    y : number,
    width : number,
    height : number
};

// RESIZE HANDLE CONFIG OPTION : 

export interface IResizeHandleConfigOption {
    padding? : number 
    lineType? : "SOLID" | "DASHED",
    opacity? : number
};

// TIMELINE TRACK TWEEN OPTION : 

export interface IAnimationTweenOption {
    label : string,
    start : number,
    end : number,
    id : string,
    from : string | number,
    to : string | number
};

// TIME LINE TRACK OPTION : 

export interface IAnimationTrackOption {
    type : AnimationTrackTypeOption,
    label : string,
    locked : boolean,
    active : boolean,
    id : string,
    tweenList : IAnimationTweenOption[]
};

// MAIN SHIELD OPTION : 

export interface IMainShield {
    visible? : boolean,
    opaque? : boolean
};

// STATUS BAR BADGE OPTION : 

export interface IStatusBadge { 
    value : string | number,
    icon : string,
    isAction : boolean,
    id : string, 
    position : StatusBadgeSideType
};

// TEXT CONTROL OPTION : 

export interface ITextControl {
    label : string,
    placeholder ? : string
};

// NUMBER CONTROL OPTION : 

export interface INumberControl {
    label : string,
    placeholder ? : string
};

// SLIDER CONTROL OPTION : 

export interface ISliderControl {
    label : string
};

// DROPDOWN CONTROL OPTION : 

export interface IDropdownControl {
    label : string
};


// CONTROL GROUP OPTION : 

export interface IControlGroupOption {
    label : string,
    container : HTMLDivElement
};

// INSPECTOR CONTROL TREE OPTION : 

export interface IInspectorControlOption {
    control : ControlGroupAddType,
    groupType : InspectorControlGroupType
};

// SCENE NODE OPTION : 

export interface NodeSpriteOption {
    type : Scene2dNodeType,

};

// SCENE OPTION : 

export interface IScene2dOption {
    name : string,
    id : string, 
    nodeList : SceneNodeOption[],
};

// SCENE NODE OPTION : 

export interface SceneNodeOption {
    node : SceneNode
};

// CAMERA 2D OPTION : 

export interface Camera2dOption {
    x : number,
    y : number,
    width : number,
    height : number
};

// SAFE AREA 2D : 

export interface SafeArea2dOption {
    width : number,
    height : number,
    y : number,
    x : number
};

// SPRITE NODE OTPION : 

export interface SpriteNodeOption {
    src : string,
    width : number,
    height : number,
    y : number,
    x : number
};


// function drawGrid(cellWidth, cellHeight) {
//         ctx.clearRect(0, 0, canvas.width, canvas.height);
//         ctx.beginPath();
//         ctx.strokeStyle = '#ddd';
//         ctx.lineWidth = lineThickness;

//         for (let x = offsetX % cellWidth; x < canvas.width; x += cellWidth) {
//             ctx.moveTo(x, 0);
//             ctx.lineTo(x, canvas.height);
//         }

//         for (let y = offsetY % cellHeight; y < canvas.height; y += cellHeight) {
//             ctx.moveTo(0, y);
//             ctx.lineTo(canvas.width, y);
//         }

//         ctx.stroke();
//     }