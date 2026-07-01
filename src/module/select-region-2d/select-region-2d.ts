
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

import { getCSSVar } from "../anchor-node/theme/theme.js";
import { gui } from "../gui/gui.js";
import { Origin2D, SCENE_2D_ORIGIN_2D } from "../origin-2d/origin-2d.js";
import { SCENE_2D_VIEWPORT_2D, Viewport2D } from "../viewport-2d/viewport-2d.js";

// SELECT REGION 2D : 

export class SelectRegion2D { 
 
    public width : number;
    public height : number; 
    public x : number;
    public y : number;
    public isEnabled : boolean;
    public container : HTMLDivElement;
    public isResizing : boolean;

    private viewport : Viewport2D;
    private origin2d : Origin2D;

    private startX : number;
    private startY : number;

    constructor( container : HTMLDivElement, viewport : Viewport2D, origin2d : Origin2D) {

        this.width = 0;
        this.height = 0;
        this.y = 0;
        this.x = 0; 
        this.isEnabled = false;
        this.container = container;
        this.isResizing = false;

        this.viewport = viewport;
        this.origin2d = origin2d;

        this.startX = 0;
        this.startY = 0;

        this.container.addEventListener("mousedown",( e : MouseEvent )=>{
            if(this.isEnabled){

                const local = this.screenToLocal(e.clientX, e.clientY);

                this.setX(local.x);
                this.setY(local.y); 
                this.setWidth(0); 
                this.setHeight(0);

                this.startX = local.x;
                this.startY = local.y;

                this.isResizing = true; 
            };
        });

        this.container.addEventListener("mousemove",( e : MouseEvent )=>{
            if(this.isEnabled && this.isResizing){

                const local = this.screenToLocal(e.clientX, e.clientY);

                this.setWidth(local.x - this.startX);
                this.setHeight(local.y - this.startY);
            }
        });

        this.container.addEventListener("mouseup", () => {  
            this.isResizing = false;
            this.setWidth(0); 
            this.setHeight(0);
        });

    };

    // converte coordenada de tela (mouse) pro mesmo espaço local usado pelos nodes/resize handle
    private screenToLocal = ( clientX : number, clientY : number ) : { x : number, y : number } => {

        const rect = this.container.getBoundingClientRect();
        const zoom = this.viewport.currentZoom;

        const x = (clientX - rect.left) / zoom - this.origin2d.x;
        const y = (clientY - rect.top) / zoom - this.origin2d.y;

        return { x, y };
    };

    public render = ( context : CanvasRenderingContext2D ) : void => {

        if(this.width !== 0 && this.height !== 0 && this.isEnabled){

            const zoom = this.viewport.currentZoom;

            context.strokeStyle = getCSSVar("--color-c");
            context.lineWidth = 1 / zoom;
            context.fillStyle = getCSSVar("--color-c");
            
            context.globalAlpha = 0.2;       

            context.fillRect(this.x, this.y, this.width, this.height);

            context.globalAlpha = 1;   

            context.strokeRect(this.x, this.y, this.width, this.height);
        };
    };

    public setX = (x : number) : number => this.x = x;
    public setY = (y : number) : number => this.y = y;
    public setWidth = ( width : number) : number => this.width = width;
    public setHeight = ( height : number) : number => this.height = height;
    public enabled = () : boolean => this.isEnabled = true;
    public desabled = () : boolean => this.isEnabled = false;
    
};

export const SCENE_2D_SELECT_REGION_2D = new SelectRegion2D(
    gui.sceneTab.sceneCanvasContainer,
    SCENE_2D_VIEWPORT_2D,
    SCENE_2D_ORIGIN_2D
);