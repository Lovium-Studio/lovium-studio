
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

import { Camera2dOption, CameraType } from "../../../typescript/types.js";

// CAMERA 2D : 

export class Camera2d {

    private type : CameraType;
    private x : number;
    private y : number;
    private width : number;
    private height : number;

    constructor ( option : Camera2dOption ) {
        this.type = "CAMERA_2D";
        this.x = option.x;
        this.y = option.y;
        this.width = option.width;
        this.height = option.height;
    };
};
