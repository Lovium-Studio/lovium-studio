
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

// ORIGIN 2D : 

import { SafeArea2d, SCENE_2D_SAFE_AREA } from "../safe-area-2d/safe-area-2d.js";
import { SCENE_2D_VIEWPORT_2D, Viewport2D } from "../viewport-2d/viewport-2d.js";

// ORIGIN 2D : 

export class Origin2D {

    private safeArea2d : SafeArea2d;
    private viewport : Viewport2D;

    constructor ( safeArea2d : SafeArea2d, viewport : Viewport2D ) { 
        this.safeArea2d = safeArea2d;
        this.viewport = viewport;
    }; 

    public get x () : number {
        return this.safeArea2d.x + this.viewport.offsetX;
    };

    public get y () : number {
        return this.safeArea2d.y + this.viewport.offsetY;
    };
};

export const SCENE_2D_ORIGIN_2D = new Origin2D(SCENE_2D_SAFE_AREA, SCENE_2D_VIEWPORT_2D);