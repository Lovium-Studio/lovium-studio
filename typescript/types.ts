
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

// TAB OPTION : 

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

// WINDOW RESIZE DIRECTION TYPE : 

export type WindowResizeDirectionType = "HORIZONTAL" | "VERTICAL" | "ALL";

// WINDOW OPTION : 

export interface IWindowOption {
    width?: number;
    height?: number;
    name?: string;
    icon?: string;
    x?: number;
    y?: number;
    shild?: boolean;
    windowCloseVisible?: boolean;
    resize?: WindowResizeDirectionType;
    center?: boolean;
};