
// TYPESCRIPT INTERFACE | TYPE : 

export type TabLocationOption = "BOTTOM" | "TOP" | "LEFT" | "RIGHT";

export type ConsoleTypeOption = "ALERT" | "ERROR" | "LOG";

export type ResizeHandleTypeOption = "SINGLE_OBJECT" | "GROUP_OBJECT" | "ASPECT_RATIO_OBJECT" | "PATTERN_OBJECT";

export type ResizeHandleObjectType = "HTML" | "CANVAS";

export type AnimationTrackTypeOption = "TRANSLATE_X" | "TRANSLATE_Y" | "ROTATE" | "SCALE" | "OPACITY";

export interface ITab {
    name: string,
    content: HTMLDivElement,
    id: string,
    location: TabLocationOption
};

export interface IContextMenu {
    id : string,
    label : string,
    icon : string,
    divisor : boolean
};

export interface IDropdown {
    label : string, 
    id? : string, 
    icon : string
};

export interface IWindowMenu {
    label : string,
    id ? : string , 
    divisor ? : boolean
};

export interface IResizeHandle {
    type: ResizeHandleTypeOption,
    x: number ,
    y: number,
    width: number,
    height: number,
    rotate: boolean
    object  : ResizeHandleObjectType
};

export interface IResizeHandleCoordinate {
    x : number,
    y : number,
    width : number,
    height : number
};

export interface IResizeHandleConfigOption {
    padding? : number 
    lineType? : "SOLID" | "DASHED",
    opacity? : number
};

export interface IAnimationTweenOption {
    label : string,
    start : number,
    end : number,
    id : string,
    from : string | number,
    to : string | number
};

export interface IAnimationTrackOption {
    type : AnimationTrackTypeOption,
    label : string,
    locked : boolean,
    active : boolean,
    id : string,
    tweenList : IAnimationTweenOption[]
};