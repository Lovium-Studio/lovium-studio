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
import { console } from "../console/console.js";
import { gui } from "../gui/gui.js";
import { Origin2D, SCENE_2D_ORIGIN_2D } from "../origin-2d/origin-2d.js";
import { SCENE_2D_VIEWPORT_2D, Viewport2D } from "../viewport-2d/viewport-2d.js";

type ResizeHandleSideOption = | "MOVE"| "TOP"| "BOTTOM"| "LEFT"| "RIGHT"| "TOP_LEFT"| "TOP_RIGHT"| "BOTTOM_LEFT"| "BOTTOM_RIGHT";

export class ResizeHandle {  

    private container: HTMLDivElement; 
    private viewport : Viewport2D; 
    private origin2d : Origin2D; 

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
    private isEnabled: boolean;
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

    constructor(container: HTMLDivElement, viewport : Viewport2D, origin2d : Origin2D) {

        this.container = container;
        this.viewport = viewport;
        this.origin2d = origin2d;

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

        this.isEnabled = false;

        this.x = 0;
        this.y = 0;

        this.width = 0;
        this.height = 0;

        this.rotation = 0;

        this.isInsideContainer = false;

        this.handleSize = 6; 

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

    public enabled = (): void => {
        this.isEnabled = true;
    };

    public desabled = (): void => {
        this.isEnabled = false;
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

    public setRotation = (rotation: number): void => {
        this.rotation = rotation;
        this.notifyListeners();
    };

    public setHandle = (option: IResizeHandle): void => {

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

        // this.notifyListeners();   
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

        const currentCoords = this.getCoordinate();

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

    public getCoordinate = () : IResizeHandleCoordinate => {
        const zoom = this.viewport.currentZoom; 
        console("Zoom atual : " + zoom)  
        return { 
            x: this.x + this.padding / zoom,
            y: this.y + this.padding / zoom,
            width: this.width - ((this.padding * 2) / zoom),
            height: this.height - ((this.padding * 2) / zoom)
        }; 
    }; 

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

    private screenToSafeArea(mouseX: number, mouseY: number): { x: number, y: number } {
        const rect = this.container.getBoundingClientRect();
        
        const canvasX = mouseX - rect.left;
        const canvasY = mouseY - rect.top;
        
        const zoom = this.viewport.currentZoom;
        const safeX = (canvasX / zoom) - this.origin2d.x;
        const safeY = (canvasY / zoom) - this.origin2d.y;
        
        return { x: safeX, y: safeY };
    }

    private getHandleAtPosition(mouseX: number, mouseY: number): ResizeHandleSideOption | null {

    const pos = this.screenToSafeArea(mouseX, mouseY);
    const zoom = this.viewport.currentZoom;

    const hs = this.handleSize / zoom;
    const hh = hs / 2;

    const handles = [
        { id: "TOP_LEFT" as const,     x: this.x - hh,                      y: this.y - hh },
        { id: "TOP" as const,          x: this.x + (this.width/2) - hh,     y: this.y - hh },
        { id: "TOP_RIGHT" as const,    x: this.x + this.width - hh,         y: this.y - hh },
        { id: "LEFT" as const,         x: this.x - hh,                      y: this.y + (this.height/2) - hh },
        { id: "RIGHT" as const,        x: this.x + this.width - hh,         y: this.y + (this.height/2) - hh },
        { id: "BOTTOM_LEFT" as const,  x: this.x - hh,                      y: this.y + this.height - hh },
        { id: "BOTTOM" as const,       x: this.x + (this.width/2) - hh,     y: this.y + this.height - hh },
        { id: "BOTTOM_RIGHT" as const, x: this.x + this.width - hh,         y: this.y + this.height - hh },
    ];

    for (const handle of handles) {
        if (pos.x >= handle.x && pos.x <= handle.x + hs &&
            pos.y >= handle.y && pos.y <= handle.y + hs) {
            return handle.id;
        };
    };

    if (pos.x >= this.x && pos.x <= this.x + this.width &&
        pos.y >= this.y && pos.y <= this.y + this.height) {
        return "MOVE";
    };

    return null;
};

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

        if (!this.isEnabled) return;
        
        const handle = this.getHandleAtPosition(event.clientX,event.clientY);

        if (!handle) return;
        
        const startPos = this.screenToSafeArea(event.clientX, event.clientY);
        this.startX = startPos.x;
        this.startY = startPos.y;
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

            this.notifyListeners();
 
    };

    private onMouseMove = (event: MouseEvent): void => {

        const currentPos = this.screenToSafeArea(event.clientX, event.clientY);

        if (this.isResizing && this.currentHandle) {

            this.container.style.cursor = this.getCursorStyle(this.currentHandle);

            const dx = currentPos.x - this.startX;
            const dy = currentPos.y - this.startY;    

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

            const dx = currentPos.x - this.startX;
            const dy = currentPos.y - this.startY;

            this.x = this.startLeft + dx;
            this.y = this.startTop + dy;

            this.notifyListeners();

            return;
        };

        const handle = this.getHandleAtPosition(event.clientX, event.clientY);

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

    public render = (context: CanvasRenderingContext2D): void => {

        if (!this.isEnabled) return;

        const zoom = this.viewport.currentZoom;

        context.save();
        context.setTransform(1, 0, 0, 1, 0, 0);
        context.scale(zoom, zoom);
        context.translate(this.origin2d.x, this.origin2d.y);

        if (this.rotation !== 0) {
            const centerX = this.x + this.width / 2;
            const centerY = this.y + this.height / 2;
            context.translate(centerX, centerY);
            context.rotate((this.rotation * Math.PI) / 180);
            context.translate(-centerX, -centerY);
        };

        context.strokeStyle = getCSSVar("--color-c");
        context.lineWidth = 1 / zoom;
        context.setLineDash([3 / zoom, 3 / zoom]);
        context.strokeRect(this.x, this.y, this.width, this.height);

        context.restore();

        const screenX = (this.origin2d.x + this.x) * zoom;
        const screenY = (this.origin2d.y + this.y) * zoom;
        const screenW = this.width * zoom;
        const screenH = this.height * zoom;

        context.save();
        context.setTransform(1, 0, 0, 1, 0, 0);

        if (this.rotation !== 0) {
            const cx = screenX + screenW / 2;
            const cy = screenY + screenH / 2;
            context.translate(cx, cy);
            context.rotate((this.rotation * Math.PI) / 180);
            context.translate(-cx, -cy);
        };

        const hs = this.handleSize;
        const hh = hs / 2;
        const px = 0.5;

        context.fillStyle = getCSSVar("--color-b");
        context.strokeStyle = getCSSVar("--color-c");
        context.lineWidth = 1;
        context.setLineDash([]);

        const handles = [
            { x: screenX - hh,             y: screenY - hh },
            { x: screenX + screenW/2 - hh, y: screenY - hh },
            { x: screenX + screenW - hh,   y: screenY - hh },
            { x: screenX - hh,             y: screenY + screenH/2 - hh },
            { x: screenX + screenW - hh,   y: screenY + screenH/2 - hh },
            { x: screenX - hh,             y: screenY + screenH - hh },
            { x: screenX + screenW/2 - hh, y: screenY + screenH - hh },
            { x: screenX + screenW - hh,   y: screenY + screenH - hh },
        ];

        handles.forEach(handle => {
            const x = Math.round(handle.x);
            const y = Math.round(handle.y);
            context.fillRect(x, y, hs, hs);
            context.strokeRect(x + px, y + px, hs, hs);
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

export const SCENE_2D_RESIZE_HANDLE = new ResizeHandle(gui.sceneTab.sceneGUIContainer, SCENE_2D_VIEWPORT_2D, SCENE_2D_ORIGIN_2D);