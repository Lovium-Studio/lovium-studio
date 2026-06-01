// RESIZE HANDLE : 

import { IResizeHandle, IResizeHandleCoordinate } from "../../../typescript/types.js";
import { gui } from "../gui/gui.js";

class ResizeHandle {

    private container: HTMLDivElement;

    private handleRect: HTMLDivElement;
    private handleAnchorPoint: HTMLElement; 
    private handleRotateTop: HTMLDivElement;
    private handleRotateBottom: HTMLDivElement;
    private handleRotateLeft: HTMLDivElement;
    private handleRotateRight: HTMLDivElement;

    private handleTopCenter: HTMLDivElement;
    private handleBottomCenter: HTMLDivElement;
    private handleRightCenter: HTMLDivElement;
    private handleLeftCenter: HTMLDivElement;
    private handleTopRight: HTMLDivElement;
    private handleTopLeft: HTMLDivElement;
    private handleBottomRight: HTMLDivElement;
    private handleBottomLeft: HTMLDivElement;

    private currentHandle: HTMLDivElement | null;
    private startX: number;
    private startY: number;
    private startWidth: number;
    private startHeight: number;
    private startLeft: number;
    private startTop: number;
    private isResizing: boolean;
    private isMoving: boolean;

    private changeListeners: ((coordinate: IResizeHandleCoordinate) => void)[] = [];

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

        this.handleRect = document.createElement("div");
        this.handleRect.classList.add("resize-handle-rect");
    
        this.handleAnchorPoint = document.createElement("i");
        this.handleAnchorPoint.classList.add("anchor-point", "ri-focus-line");

        this.handleRotateTop = document.createElement("div");
        this.handleRotateTop.classList.add("rotation-handle-top", "rotation-handle");
        this.handleRotateTop.innerHTML = "<i class=\"ri-refresh-fill\"></i>";
        this.handleRotateBottom = document.createElement("div");
        this.handleRotateBottom.classList.add("rotation-handle-bottom", "rotation-handle");
        this.handleRotateBottom.innerHTML = "<i class=\"ri-refresh-fill\"></i>";
        this.handleRotateLeft = document.createElement("div");
        this.handleRotateLeft.classList.add("rotation-handle-left", "rotation-handle");
        this.handleRotateLeft.innerHTML = "<i class=\"ri-refresh-fill\"></i>";
        this.handleRotateRight = document.createElement("div");
        this.handleRotateRight.classList.add("rotation-handle-right", "rotation-handle");
        this.handleRotateRight.innerHTML = "<i class=\"ri-refresh-fill\"></i>";

        this.handleTopCenter = document.createElement("div");
        this.handleTopCenter.classList.add("handle-top-center", "resize-handle");
        this.handleBottomCenter = document.createElement("div");
        this.handleBottomCenter.classList.add("handle-bottom-center", "resize-handle");
        this.handleRightCenter = document.createElement("div");
        this.handleRightCenter.classList.add("handle-right-center", "resize-handle");
        this.handleLeftCenter = document.createElement("div");
        this.handleLeftCenter.classList.add("handle-left-center", "resize-handle");
        
        this.handleTopRight = document.createElement("div");
        this.handleTopRight.classList.add("handle-top-right", "resize-handle");
        this.handleTopLeft = document.createElement("div");
        this.handleTopLeft.classList.add("handle-top-left", "resize-handle");
        this.handleBottomRight = document.createElement("div");
        this.handleBottomRight.classList.add("handle-bottom-right", "resize-handle");
        this.handleBottomLeft = document.createElement("div");
        this.handleBottomLeft.classList.add("handle-bottom-left", "resize-handle");

        this.handleRect.appendChild(this.handleAnchorPoint);
        this.handleRect.appendChild(this.handleRotateTop);
        this.handleRect.appendChild(this.handleRotateBottom);
        this.handleRect.appendChild(this.handleRotateLeft);
        this.handleRect.appendChild(this.handleRotateRight);
        this.handleRect.appendChild(this.handleTopCenter);
        this.handleRect.appendChild(this.handleBottomCenter);
        this.handleRect.appendChild(this.handleRightCenter);
        this.handleRect.appendChild(this.handleLeftCenter);
        this.handleRect.appendChild(this.handleTopRight);
        this.handleRect.appendChild(this.handleTopLeft);
        this.handleRect.appendChild(this.handleBottomRight);
        this.handleRect.appendChild(this.handleBottomLeft);

        this.container.appendChild(this.handleRect);

        this.setup();
    }

    private get resizeHandles() {
        return [
            this.handleTopCenter, this.handleLeftCenter, this.handleBottomCenter, this.handleRightCenter,
            this.handleTopLeft, this.handleTopRight, this.handleBottomLeft, this.handleBottomRight
        ];
    }

    private setup(): void {
        this.handleRect.style.display = "flex";

        this.handleRect.addEventListener('mousedown', (event) => this.onMouseDown(event, this.handleRect));

        this.resizeHandles.forEach(handle => {
            handle.addEventListener('mousedown', (event) => this.onMouseDown(event, handle));
        });
    }

    public setHandle = (option: IResizeHandle): void => {

        this.handleRect.style.left = `${option.x}px`;
        this.handleRect.style.top = `${option.y}px`;
        this.handleRect.style.width = `${option.width}px`;
        this.handleRect.style.height = `${option.height}px`;

        const displayRotateValue = option.rotate ? "flex" : "none";

        this.handleRotateRight.style.display = displayRotateValue;
        this.handleRotateLeft.style.display = displayRotateValue;
        this.handleRotateTop.style.display = displayRotateValue;
        this.handleRotateBottom.style.display = displayRotateValue;

        if (option.type === "SINGLE_OBJECT") {
            this.resizeHandles.forEach(handle => {
                handle.style.display = "flex";
                handle.style.width = "";
                handle.style.height = "";
            });
        } else if (option.type === "PATTERN_OBJECT") {

            this.handleTopLeft.style.display = "none";
            this.handleTopRight.style.display = "none";
            this.handleBottomLeft.style.display = "none";
            this.handleBottomRight.style.display = "none";

            this.handleTopCenter.style.display = "flex";
            this.handleBottomCenter.style.display = "flex";
            this.handleLeftCenter.style.display = "flex";
            this.handleRightCenter.style.display = "flex";

            this.handleTopCenter.style.width = "30px";
            this.handleBottomCenter.style.width = "30px";
            this.handleLeftCenter.style.height = "30px";
            this.handleRightCenter.style.height = "30px";
        }

        this.notifyListeners();
    };

    public onChange = (callback: (coordinate: IResizeHandleCoordinate) => void): IResizeHandleCoordinate => {
        this.changeListeners.push(callback);
        return this.getCoordinate();
    };

    private notifyListeners(): void {
        if (this.changeListeners.length === 0) return;
        const currentCoords = this.getCoordinate();
        this.changeListeners.forEach(listener => listener(currentCoords));
    }

    public getCoordinate(): IResizeHandleCoordinate {
        return {
            x: this.handleRect.offsetLeft,
            y: this.handleRect.offsetTop,
            width: this.handleRect.offsetWidth,
            height: this.handleRect.offsetHeight
        };
    }

    private onMouseMove = (event: MouseEvent): void => {
        if (this.isResizing) {
            const dx = event.clientX - this.startX;
            const dy = event.clientY - this.startY;

            switch (this.currentHandle) {
                case this.handleTopCenter:
                    this.handleRect.style.height = `${Math.max(this.startHeight - dy, 20)}px`;
                    this.handleRect.style.top = `${this.startTop + dy}px`;
                    break;
                case this.handleTopLeft:
                    this.handleRect.style.width = `${Math.max(this.startWidth - dx, 20)}px`;
                    this.handleRect.style.height = `${Math.max(this.startHeight - dy, 20)}px`;
                    this.handleRect.style.top = `${this.startTop + dy}px`;
                    this.handleRect.style.left = `${this.startLeft + dx}px`;
                    break;
                case this.handleTopRight:
                    this.handleRect.style.width = `${Math.max(this.startWidth + dx, 20)}px`;
                    this.handleRect.style.height = `${Math.max(this.startHeight - dy, 20)}px`;
                    this.handleRect.style.top = `${this.startTop + dy}px`;
                    break;
                case this.handleLeftCenter:
                    this.handleRect.style.width = `${Math.max(this.startWidth - dx, 20)}px`;
                    this.handleRect.style.left = `${this.startLeft + dx}px`;
                    break;
                case this.handleBottomLeft:
                    this.handleRect.style.width = `${Math.max(this.startWidth - dx, 20)}px`;
                    this.handleRect.style.height = `${Math.max(this.startHeight + dy, 20)}px`;
                    this.handleRect.style.left = `${this.startLeft + dx}px`;
                    break;
                case this.handleBottomCenter:
                    this.handleRect.style.height = `${Math.max(this.startHeight + dy, 20)}px`;
                    break;
                case this.handleBottomRight:
                    this.handleRect.style.width = `${Math.max(this.startWidth + dx, 20)}px`;
                    this.handleRect.style.height = `${Math.max(this.startHeight + dy, 20)}px`;
                    break;
                case this.handleRightCenter:
                    this.handleRect.style.width = `${Math.max(this.startWidth + dx, 20)}px`;
                    break;
            }
        } else if (this.isMoving) {
            const dx = event.clientX - this.startX;
            const dy = event.clientY - this.startY;
            this.handleRect.style.left = `${this.startLeft + dx}px`;
            this.handleRect.style.top = `${this.startTop + dy}px`;
            this.handleRect.style.cursor = "move";
        }

        this.notifyListeners();
    };

    private onMouseUp = (): void => {
        this.container.removeEventListener('mousemove', this.onMouseMove);
        document.removeEventListener('mouseup', this.onMouseUp);
        this.isResizing = false;
        this.isMoving = false;
        this.currentHandle = null;
        this.handleRect.style.cursor = "";
        
        this.notifyListeners();
    };

    private onMouseDown = (event: MouseEvent, handle: HTMLDivElement): void => {
        this.startX = event.clientX;
        this.startY = event.clientY;
        this.startWidth = parseInt(getComputedStyle(this.handleRect).width, 10);
        this.startHeight = parseInt(getComputedStyle(this.handleRect).height, 10);
        this.startLeft = parseInt(getComputedStyle(this.handleRect).left, 10);
        this.startTop = parseInt(getComputedStyle(this.handleRect).top, 10);

        if (handle === this.handleRect) {
            this.isMoving = true;
        } else {
            this.currentHandle = handle;
            this.isResizing = true; 
        }

        this.container.addEventListener('mousemove', this.onMouseMove);
        document.addEventListener('mouseup', this.onMouseUp);
    };
}

export const resizeHandle: ResizeHandle = new ResizeHandle(gui.boardTab.boardContainer);