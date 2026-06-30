
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

export class Origin2D {

    private safeArea2d : SafeArea2d;

    constructor ( safeArea2d : SafeArea2d ) { 
        this.safeArea2d = safeArea2d;
    }; 

    public get x () : number {
        return this.safeArea2d.x;
    };

    public get y () : number {
        return this.safeArea2d.y;
    };
};

export const SCENE_2D_ORIGIN_2D = new Origin2D(SCENE_2D_SAFE_AREA);