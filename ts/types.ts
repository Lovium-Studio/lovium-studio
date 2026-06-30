
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
import { ResizeHandle } from "../src/module/resize-handle/resize-handle.js";
import { SafeArea2d } from "../src/module/safe-area-2d/safe-area-2d.js";
import { SpriteNode } from "../src/module/sprite-node/sprite-node.js";
import { Viewport2D } from "../src/module/viewport-2d/viewport-2d.js";

// TAB LOCATION TYPE : 

export type TabLocationOption = "BOTTOM" | "TOP" | "LEFT" | "RIGHT";

// CONSOLE INFORMATION TYPE : 

export type ConsoleTypeOption = "ALERT" | "ERROR" | "LOG";

// RESIZE HANDLE OBJECT MANIPULATION TYPE : 

export type ResizeHandleTypeOption = "SINGLE_OBJECT" | "GROUP_OBJECT" | "ASPECT_RATIO_OBJECT" | "PATTERN_OBJECT";


// TIMELINE TRACK TYPE : 

export type AnimationTrackTypeOption = "TRANSLATE_X" | "TRANSLATE_Y" | "ROTATE" | "SCALE" | "OPACITY";

// STATUS BAR SIDE TYPE : 

export type StatusBadgeSideType = "RIGHT" | "LEFT";

// CONTROL TYPE : 

export type ControlType = "TEXT_CONTROL" | "PASSWORD_CONTROL" | "SLIDER_CONTROL" | "NUMBER_CONTROL" | "DROPDOWN_CONTROL";

// CONTROL GROUP CONTROL TYPE : 

export type ControlGroupAddType = TextControl | NumberControl | SliderControl | DropdownControl;

// INSPECTOR CONTROL GROUP TYOE : 

export type InspectorControlGroupType = "TRANSFORM" | "SPRITE" | "NODE" | "APPEARANCE" | "ANIMATION" | "GRID" | "COLLISION" | "SAFE_AREA";

// SCENE 2D NODE TYPE : 

export type Scene2dNodeType = "SPRITE_NODE" | "SAFE_AREA_NODE";

// CAMERA TYPE : 

export type CameraType = "CAMERA_2D" | "CAMERA_3D";

// NODE LOCATION TYPE : 

export type NodeLocation = "NATIVE" | "FOREIGNER";

// SCENE TYPE : 

export type SceneType = "2D_SCENE" | "25D_SCENE" | "3D_SCENE";

// NODE PROPERTY CONTROL TYPE : 

export type NodePropertyControlType = "TRANSLASTE_X"

// TAB OPTION : 

export type SceneNode = SpriteNode;

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
    rotate: number
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

export type GuideLineSideOption = "ALL" | "TOP" | "BOTTOM" | "RIGHT" | "LEFT" | "VERTICAL" | "HORIZONTAL";


// NUMBER CONTROL OPTION : 

export interface INumberControl {
    label : string,
    placeholder ? : string,
    max? : number | null,
    min? : number | null,
    prefix? : string,
    sufix? : string,
    value : number
};

// SLIDER CONTROL OPTION : 

export interface ISliderControl {
    label : string,
    min : number,
    max : number,
    step ? : number
    value : number
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

export type SceneNodeListType = ISpriteNode

// SCENE OPTION : 

export interface IScene2dOption {
    name : string,
    id : string, 
    type : SceneType,
    nodeList : SceneNodeListType[],
};

// SCENE SAFE AREA NOE OPTION : 

export interface SceneSafeAreaNodeOption {
    node ? : SafeArea2d | null,
    type : Scene2dNodeType,
    width : number,
    height : number,
    y : number,
    x : number,
    location : NodeLocation
}

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

export interface ISpriteNode {
    type : Scene2dNodeType
    src : string,
    width : number,
    height : number,
    y : number,
    x : number,
    location : NodeLocation,
    opacity : number,
    node ? : SceneNode,
    rotation : number
    anchorPoint : [number,number]
};

// CROSS GUIDE OPTION : 

export interface CrossGuideOption {
    safeArea2d : SafeArea2d,
    resizeHandle : ResizeHandle
}

// SCENE LABEL OPTION : 

export interface ISceneLabel {
    container : HTMLDivElement
}

// GRID 2D : 

export interface IGrid2D {
    canvas : HTMLCanvasElement,
    width : number,
    height : number,
    x : number,
    y : number
};

// VIEWPORT 2D : 

export interface IViewport2D {
    width : number,
    height : number,
    offsetX : number,
    offsetY : number
}

// SCENE 2D : 

export interface IScene2D {
    viewport : Viewport2D,
    safeArea : SafeArea2d
};  