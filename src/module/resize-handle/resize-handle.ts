
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

// RESIZE HANDLE : 

import {IResizeHandle,IResizeHandleConfigOption,IResizeHandleCoordinate,SceneNode} from "../../../ts/types.js";
import { getCSSVar } from "../anchor-node/theme/theme.js";
import { gui } from "../gui/gui.js";

type ResizeHandleSideOption = | "MOVE"| "TOP"| "BOTTOM"| "LEFT"| "RIGHT"| "TOP_LEFT"| "TOP_RIGHT"| "BOTTOM_LEFT"| "BOTTOM_RIGHT";

export class ResizeHandle {

    private container: HTMLDivElement;

    private currentHandle: ResizeHandleSideOption | null;

    private startX: number;
    private startY: number;

    private startWidth: number;
    private startHeight: number;

    private startLeft: number;
    private startTop: number;

    private isResizing: boolean;
    private isMoving: boolean;

    private padding: number;
    private isVisible: boolean;
    private handleSize: number;

    private onHandleMouseUpCallbackList:Function[] = [];

    private changeListeners:((coordinate: IResizeHandleCoordinate) => void)[] = [];

    private onResizeHandleMouseUpCallbackList:Function[] = [];

    private onResizeHandleMouseDownCallbackList:Function[] = [];

    private isInsideContainer: boolean;

    public x: number;
    public y: number;

    public width: number;
    public height: number;

    public rotation: number;

    constructor(container: HTMLDivElement) {

        this.container = container;

        this.currentHandle = null;

        this.startX = 0;
        this.startY = 0;

        this.startWidth = 0;
        this.startHeight = 0;

        this.startLeft = 0;
        this.startTop = 0;

        this.isResizing = false;
        this.isMoving = false;

        this.padding = 0;

        this.isVisible = false;

        this.x = 0;
        this.y = 0;

        this.width = 0;
        this.height = 0;

        this.rotation = 0;

        this.isInsideContainer = false;

        this.handleSize = 8;

        this.setup();
    }

    private setup(): void {

        this.container.addEventListener("mousedown",this.onMouseDown);
        this.container.addEventListener("mousemove",this.onMouseMove);

        document.addEventListener("mouseup",this.onMouseUp);

        this.container.addEventListener("mouseenter",() => {this.isInsideContainer = true;});

        this.container.addEventListener("mouseleave",() => {

            this.isInsideContainer = false;

            if (!this.isMoving && !this.isResizing) {

                    this.container.style.cursor = "default";
                }
            }
        );

        document.addEventListener("keydown", (e: KeyboardEvent) => {

                if (
                    e.code === "ArrowRight" ||
                    e.code === "KeyD" &&
                    this.isInsideContainer
                ) {

                    this.moveRight();
                }

                if (
                    e.code === "ArrowLeft" ||
                    e.code === "KeyA" &&
                    this.isInsideContainer
                ) {

                    this.moveLeft();
                }

                if (
                    e.code === "ArrowUp" ||
                    e.code === "KeyW" &&
                    this.isInsideContainer
                ) {

                    this.moveTop();
                }

                if (
                    e.code === "ArrowDown" ||
                    e.code === "KeyS" &&
                    this.isInsideContainer
                ) {

                    this.moveBottom();
                }

            }
        );
    }

    public show = (): void => {

        this.isVisible = true;

        this.notifyListeners(); 
    };

    public hide = (): void => {

        this.isVisible = false;

        this.notifyListeners();
    };

    public setX = (x: number): void => {

        this.x = x;

        this.notifyListeners();
    };

    public setY = (y: number): void => {

        this.y = y;

        this.notifyListeners();
    };

    public setWidth = (
        width: number
    ): void => {

        this.width = width;

        this.notifyListeners();
    };

    public setHeight = (
        height: number
    ): void => {

        this.height = height;

        this.notifyListeners();
    };

    public getX = (): number =>
        this.x + this.padding;

    public getY = (): number =>
        this.y + this.padding;

    public getWidth = (): number =>
        this.width - (this.padding * 2);

    public getHeight = (): number =>
        this.height - (this.padding * 2);

    public getRotation = (): number =>
        this.rotation;

    public setRotation = (
        rotation: number
    ): void => {

        this.rotation = rotation;

        this.notifyListeners();
    };

    public setHandle = (
        option: IResizeHandle
    ): void => {

        this.x = option.x;
        this.y = option.y;

        this.width = option.width;
        this.height = option.height;

        if (
            option.rotate !== undefined
        ) {

            this.rotation =
                option.rotate;
        }

        this.notifyListeners();
    };

    public config = (
        option: IResizeHandleConfigOption
    ): void => {

        if (option.padding) {

            this.padding =
                option.padding;
        }
    };

    public onTransform = (
        callback: (
            coordinate:
            IResizeHandleCoordinate
        ) => void
    ): IResizeHandleCoordinate => {

        this.changeListeners.push(
            callback
        );

        return this.getCoordinate();
    };

    private notifyListeners(): void {

        if (
            this.changeListeners.length === 0
        ) {

            return;
        }

        const currentCoords =
            this.getCoordinate();

        this.changeListeners.forEach(
            listener => listener(currentCoords)
        );
    }

    private moveRight = (): void => {

        this.x =
            this.getX() + 1;

        this.setX(this.x);
    };

    private moveLeft = (): void => {

        this.x =
            this.getX() - 1;

        this.setX(this.x);
    };

    private moveTop = (): void => {

        this.y =
            this.getY() - 1;

        this.setY(this.y);
    };

    private moveBottom = (): void => {

        this.y =
            this.getY() + 1;

        this.setY(this.y);
    };

    public getCoordinate():
        IResizeHandleCoordinate {

        return {

            x:
                this.x + this.padding,

            y:
                this.y + this.padding,

            width:
                this.width -
                (this.padding * 2),

            height:
                this.height -
                (this.padding * 2)

        };
    }

    public onResizeHandleMouseUp = (
        callback: Function
    ): void => {

        this.onResizeHandleMouseUpCallbackList
            .push(callback);
    };

    public onResizeHandleMouseDown = (
        callback: Function
    ): void => {

        this.onResizeHandleMouseDownCallbackList
            .push(callback);
    };

    public getElement = (): null => null;

    public getHandleArea = () => {

        return {

            x: this.x,
            y: this.y,

            width: this.width,
            height: this.height

        };
    };

    private getHandleAtPosition(
        mouseX: number,
        mouseY: number
    ): ResizeHandleSideOption | null {

        const rect =
            this.container.getBoundingClientRect();

        const canvasX =
            mouseX - rect.left;

        const canvasY =
            mouseY - rect.top;

        const hs =
            this.handleSize;

        const hh =
            hs / 2;

        const handles = [

            {
                id: "TOP_LEFT" as const,
                x: this.x - hh,
                y: this.y - hh
            },

            {
                id: "TOP" as const,
                x:
                    this.x +
                    (this.width / 2) - hh,

                y:
                    this.y - hh
            },

            {
                id: "TOP_RIGHT" as const,
                x:
                    this.x +
                    this.width - hh,

                y:
                    this.y - hh
            },

            {
                id: "LEFT" as const,
                x:
                    this.x - hh,

                y:
                    this.y +
                    (this.height / 2) - hh
            },

            {
                id: "RIGHT" as const,
                x:
                    this.x +
                    this.width - hh,

                y:
                    this.y +
                    (this.height / 2) - hh
            },

            {
                id: "BOTTOM_LEFT" as const,
                x:
                    this.x - hh,

                y:
                    this.y +
                    this.height - hh
            },

            {
                id: "BOTTOM" as const,
                x:
                    this.x +
                    (this.width / 2) - hh,

                y:
                    this.y +
                    this.height - hh
            },

            {
                id: "BOTTOM_RIGHT" as const,
                x:
                    this.x +
                    this.width - hh,

                y:
                    this.y +
                    this.height - hh
            }

        ];

        for (const handle of handles) {

            if (

                canvasX >= handle.x &&
                canvasX <= handle.x + hs &&

                canvasY >= handle.y &&
                canvasY <= handle.y + hs

            ) {

                return handle.id;
            }
        }

        if (

            canvasX >= this.x &&
            canvasX <= this.x + this.width &&

            canvasY >= this.y &&
            canvasY <= this.y + this.height

        ) {

            return "MOVE";
        }

        return null;
    }

    private getCursorStyle(handle:ResizeHandleSideOption): string {

        switch (handle) {

            case "MOVE":
                return "move";

            case "TOP":
            case "BOTTOM":
                return "ns-resize";

            case "LEFT":
            case "RIGHT":
                return "ew-resize";

            case "TOP_LEFT":
            case "BOTTOM_RIGHT":
                return "nwse-resize";

            case "TOP_RIGHT":
            case "BOTTOM_LEFT":
                return "nesw-resize";

            default:
                return "default";
        };
    };

    private onMouseDown = (event: MouseEvent): void => {

        if (!this.isVisible) return;
        
        const handle = this.getHandleAtPosition(event.clientX,event.clientY);

        if (!handle) return;
        
        this.startX = event.clientX;
        this.startY = event.clientY;
        this.startWidth = this.width;
        this.startHeight = this.height;
        this.startLeft = this.x;
        this.startTop = this.y;

        if (handle === "MOVE") {

            this.isMoving = true;
            this.currentHandle = null;
            this.container.style.cursor = "move";

        } else {

            this.currentHandle = handle;
            this.isResizing = true;
            this.container.style.cursor = this.getCursorStyle(handle);
        };

        this.onResizeHandleMouseDownCallbackList.forEach(callback => callback());
    };

    private onMouseMove = (event: MouseEvent): void => {

        const mouseX = event.clientX;
        const mouseY = event.clientY;

        if (this.isResizing && this.currentHandle) {

            this.container.style.cursor = this.getCursorStyle(this.currentHandle);

            const dx = mouseX - this.startX;
            const dy = mouseY - this.startY;

            switch (this.currentHandle) { 

                case "TOP":
                    this.y = this.startTop + dy;
                    this.height = Math.max(this.startHeight - dy, 20);
                    break;

                case "BOTTOM":
                    this.height = Math.max(this.startHeight + dy, 20);
                    break;

                case "LEFT":
                    this.x = this.startLeft + dx;
                    this.width = Math.max(this.startWidth - dx, 20);
                    break;

                case "RIGHT":
                    this.width = Math.max(this.startWidth + dx, 20);
                    break;

                case "TOP_LEFT":
                    this.x = this.startLeft + dx;
                    this.y = this.startTop + dy;
                    this.width = Math.max(this.startWidth - dx, 20);
                    this.height = Math.max(this.startHeight - dy, 20);
                    break;

                case "TOP_RIGHT":
                    this.y = this.startTop + dy;
                    this.width = Math.max(this.startWidth + dx, 20);
                    this.height = Math.max(this.startHeight - dy, 20);
                    break;

                case "BOTTOM_LEFT":
                    this.x = this.startLeft + dx;
                    this.width = Math.max(this.startWidth - dx, 20);
                    this.height = Math.max(this.startHeight + dy, 20);
                    break;

                case "BOTTOM_RIGHT":
                    this.width = Math.max(this.startWidth + dx, 20);
                    this.height = Math.max(this.startHeight + dy, 20);
                break;
            };

            this.notifyListeners();

            return;
        };

        if (this.isMoving) {

            this.container.style.cursor = "move";

            const dx = mouseX - this.startX;
            const dy = mouseY - this.startY;

            this.x = this.startLeft + dx;
            this.y = this.startTop + dy;

            this.notifyListeners();

            return;
        };

        const handle = this.getHandleAtPosition(mouseX, mouseY);

        if (handle && handle !== "MOVE" ) {

            this.container.style.cursor = this.getCursorStyle(handle);

        } else {

            this.container.style.cursor = "default";
        };
    };

    private onMouseUp = (): void => {

        if (this.isResizing || this.isMoving) {
            this.onResizeHandleMouseUpCallbackList.forEach(callback => callback());
            this.onHandleMouseUpCallbackList.forEach(callback => callback(""));
        };

        this.isResizing = false;
        this.isMoving = false;
        this.currentHandle = null;
        this.container.style.cursor = "default";
        this.notifyListeners();
    };

    public setNode = (node: SceneNode): void => {
        this.setX(node.x);
        this.setY(node.y);
        this.setWidth(node.width);
        this.setHeight(node.height);
    };

    public render = ( context:CanvasRenderingContext2D ): void => {

        if (!this.isVisible) return;
    
        context.save();

        if (this.rotation !== 0) {

            const centerX = this.x + this.width / 2;
            const centerY = this.y + this.height / 2;

            context.translate(centerX,centerY);
            context.rotate((this.rotation * Math.PI) / 180);
            context.translate(-centerX,-centerY);
        };

        context.strokeStyle = getCSSVar("--color-b") || "#0066ff";
        context.lineWidth = 1;
        context.setLineDash([]);
        context.strokeRect(this.x,this.y,this.width,this.height);

        const hs = this.handleSize;

        const hh = hs / 2;

        context.fillStyle = getCSSVar("--color-b") || "#0066ff";

        context.strokeStyle = "#ffffff";

        context.lineWidth = 1;

        const handles = [
            { x: this.x - hh, y: this.y - hh },
            { x: this.x + (this.width / 2) - hh, y: this.y - hh },
            { x: this.x + this.width - hh, y: this.y - hh },
            { x: this.x - hh, y: this.y + (this.height / 2) - hh },
            { x: this.x + this.width - hh, y: this.y + (this.height / 2) - hh },
            { x: this.x - hh, y: this.y + this.height - hh },
            { x: this.x + (this.width / 2) - hh, y: this.y + this.height - hh },
            { x: this.x + this.width - hh, y: this.y + this.height - hh }
        ];

        handles.forEach(handle => {
            context.fillRect(handle.x,handle.y,hs,hs);
            context.strokeRect(handle.x,handle.y,hs,hs);
        });

        context.restore();
    };

    public destroy = (): void => {

        this.container.removeEventListener("mousedown",this.onMouseDown);
        this.container.removeEventListener("mousemove",this.onMouseMove);

        document.removeEventListener("mouseup",this.onMouseUp);

        this.changeListeners = [];

        this.onResizeHandleMouseUpCallbackList = [];
 
        this.onResizeHandleMouseDownCallbackList = [];

        this.onHandleMouseUpCallbackList = [];
    };
};

export const SCENE_2D_RESIZE_HANDLE = new ResizeHandle(gui.sceneTab.sceneGUIContainer);