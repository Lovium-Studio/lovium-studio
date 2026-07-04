
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

import { ICamera2DNode, IScene2dOption, ISpriteNode } from "../../../ts/types.js";
import { Camera2DNode } from "../camera-2d-node/camera-2d-node.js";
import { SCENE_2D_ORIGIN_2D } from "../origin-2d/origin-2d.js";
import { SCENE_2D_SAFE_AREA } from "../safe-area-2d/safe-area-2d.js";
import { SpriteNode } from "../sprite-node/sprite-node.js";
import { SCENE_2D_VIEWPORT_2D } from "../viewport-2d/viewport-2d.js";

// NODE PROCESSOR : 

type SceneType = IScene2dOption;

export const nodeProcessor = ( scene : SceneType ) : SceneType => {

    const nodeList = scene.nodeList;
    
    nodeList.forEach(node => {

        switch (node.type) {

            case "SPRITE_NODE": {

                const NODE_DATA = node as ISpriteNode;

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
            }
            case "CAMERA_2D_NODE": {

                const NODE_DATA = node as ICamera2DNode;

                const CAMERA_2D_NODE = new Camera2DNode({ 
                    type : NODE_DATA.type,
                    width : NODE_DATA.width,
                    height : NODE_DATA.height,
                    x : NODE_DATA.x, 
                    y : NODE_DATA.y,
                    origin2d : SCENE_2D_ORIGIN_2D,
                    viewport : SCENE_2D_VIEWPORT_2D,
                    safeArea : SCENE_2D_SAFE_AREA,
                    isMask : NODE_DATA.isMask
                });

                node.node = CAMERA_2D_NODE; 
                break;
            }
        };
    });
    
    return scene;
};