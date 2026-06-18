
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

import { IScene2dOption, SpriteNodeOption } from "../../../ts/types.js";
import { SpriteNode } from "../sprite-node/sprite-node.js";

// NODE PROCESSOR : 

type SceneType = IScene2dOption;

export const nodeProcessor = ( scene : SceneType ) : SceneType => {

    const nodeList = scene.nodeList;
    
    nodeList.forEach(node => {

        switch (node.type) {

            case "SPRITE_NODE":  

                const n = node as SpriteNodeOption;

                const SPRITE_NODE : SpriteNode = new SpriteNode({
                    type : n.type,
                    src : n.src, 
                    width : n.width,
                    height : n.height,
                    x : n.x, 
                    y : n.y
                });

                node.node = SPRITE_NODE;

            break;
        };
    });
    
    return scene;
};