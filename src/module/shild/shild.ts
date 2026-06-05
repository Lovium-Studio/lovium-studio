
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

// UI SHILD : 

import { IMainShield } from "../../../typescript/types.js";
import { gui } from "../gui/gui.js";

const uiShild = gui.mainShield;

export const shild = (option : IMainShield ) : void => {

    const opaqueColor = "rgba(0, 0, 0, 0.30)";

    const visible = option.visible;
    const opaque = option.opaque;
 
    visible ? uiShild.style.display = "flex" : uiShild.style.display = "none";
    
    opaque  ? uiShild.style.background = opaqueColor : uiShild.style.background = "none";
};