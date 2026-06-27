
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

import { SceneNode } from "../../../ts/types.js";

// NODE MODIFY : 

export const nodeModify = ( node : SceneNode , property : any ) : void => {

    if(node.type === "SPRITE_NODE"){
        if(property.width) node.setWidth(property.width);
        if(property.height) node.setHeight(property.height);
        if(property.x) node.setX(property.x);
        if(property.y) node.setY(property.y);
    };

};