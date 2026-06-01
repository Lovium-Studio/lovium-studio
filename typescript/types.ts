// TYPESCRIPT INTERFACE | TYPE : 

export type TabLocationOption = "BOTTOM" | "TOP" | "LEFT" | "RIGHT";

export type ConsoleTypeOption = "ALERT" | "ERROR" | "LOG";

export type ResizeHandleTypeOption = "SINGLE_OBJECT" | "GROUP_OBJECT" | "ASPECT_RATIO_OBJECT" | "PATTERN_OBJECT";

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
};

export interface IResizeHandleCoordinate {
    x : number,
    y : number,
    width : number,
    height : number
};