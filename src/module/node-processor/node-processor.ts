
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

import { IScene2dOption, ISpriteNode } from "../../../ts/types.js";
import { SpriteNode } from "../sprite-node/sprite-node.js";

// NODE PROCESSOR : 

type SceneType = IScene2dOption;

export const nodeProcessor = ( scene : SceneType ) : SceneType => {

    const nodeList = scene.nodeList;
    
    nodeList.forEach(node => {

        switch (node.type) {

            case "SPRITE_NODE":  

                const NODE_DATA : ISpriteNode = node;

                const SPRITE_NODE = new SpriteNode({
                    type : NODE_DATA.type,
                    src : NODE_DATA.src, 
                    width : NODE_DATA.width,
                    height : NODE_DATA.height,
                    x : NODE_DATA.x, 
                    y : NODE_DATA.y,
                    opacity : NODE_DATA.opacity,
                    location : "FOREIGNER",
                    rotation : NODE_DATA.rotation,
                    anchorPoint : NODE_DATA.anchorPoint
                });

                node.node = SPRITE_NODE; 

            break;
        };
    });
    
    return scene;
};