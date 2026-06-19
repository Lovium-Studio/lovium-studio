
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

// INSPECTOR 

import { getUi } from "../get-ui/get-ui.js"
import { dropdown } from "../dropdown/dropdown.js";
import { console } from "../console/console.js";
import { gui } from "../gui/gui.js";
import { DropdownControl, NumberControl, SliderControl, TextControl } from "../control/control.js";
import { ControlGroup } from "../control-group/control-group.js";
import { IInspectorControlOption } from "../../../ts/types.js";

export const inspectorTab = () : void => {

    // const handleFontDropdown = () : void => {

    //     const buttonList = [
    //         {
    //             label : "Bold",
    //             id : "bold-id",
    //             icon : "ri-home-3-line"
    //         },
    //         {
    //             label : "Regular",
    //             id : "ggt",
    //             icon : "ri-home-3-line"
    //         },
    //         {
    //             label : "Black",
    //             id : "ggt", 
    //             icon : "ri-home-3-line"
    //         }
            
    //     ]

    //     dropdown(gui.inspectorTab.inspectorFontWheightDropdown,buttonList);

    //     const fontBold = getUi("bold-id").addEventListener("click",function(){
    //         console("Font Bold Setado!","LOG");
    //     });

    // };

    // gui.inspectorTab.inspectorFontWheightDropdown.addEventListener("click",handleFontDropdown)

};

// TRANSFORM GROUP : 

export const INESPECTOR_TRANSFORM_CONTROL_GROUP : ControlGroup = new ControlGroup({
    label: "Transform",
    container: gui.nativeTab.inspectorTab
});

export const INSPECTOR_SCALE_X_CONTROL: NumberControl = new NumberControl({
    label: "Scale"
});
 
export const INSPECTOR_SCALE_Y_CONTROL: NumberControl = new NumberControl({
    label: "Scale"
});

INSPECTOR_SCALE_X_CONTROL.joinControl(INSPECTOR_SCALE_Y_CONTROL);
  
export const INSPECTOR_TRANSLATE_X_CONTROL : NumberControl = new NumberControl({
    label: "Translate"
});

export const INSPECTOR_TRANSLATE_Y_CONTROL : NumberControl = new NumberControl({
    label: "Translate"
});

INSPECTOR_TRANSLATE_X_CONTROL.joinControl(INSPECTOR_TRANSLATE_Y_CONTROL);

export const INSPECTOR_ROTATE_CONTROL = new NumberControl({
    label: "Rotation"
});

export const INSPECTOR_ANCHOR_POINT_X_CONTROL: NumberControl = new NumberControl({
    label: "Anchor Point"
});
 
export const INSPECTOR_ANCHOR_POINT_Y_CONTROL: NumberControl = new NumberControl({
    label: "Scale"
});

INSPECTOR_ANCHOR_POINT_X_CONTROL.joinControl(INSPECTOR_ANCHOR_POINT_Y_CONTROL);

// SPRITE GROUP : 

export const INSPECTOR_SPRITE_CONTROL_GROUP : ControlGroup = new ControlGroup({
    label: "Sprite",
    container: gui.nativeTab.inspectorTab
});

export const INPSECTOR_SPRITE_START_CONTROL = new NumberControl({
    label: "Sprite Start"
});

export const INSPECTOR_SPRITE_DEPTH_CONTROL = new NumberControl({
    label: "Sprite Depth"
});

export const INSPECTOR_SPRITE_VISIBILITY_CONTROL = new DropdownControl({
    label : "Visibilty"
});

// NODE GROUP : 

export const INSPECTOR_NODE_CONTROL_GROUP : ControlGroup = new ControlGroup({
    label: "Node",
    container: gui.nativeTab.inspectorTab
});

export const INSPECTOR_NODE_NAME_CONTROL = new TextControl({
    label: "Name"
}); 

export const INSPECTOR_NODE_ID_CONTROL = new TextControl({
    label: "ID"
}); 

// APPEARANCE GROUP : 

export const INSPECTOR_APPEARANCE_CONTROL_GROUP : ControlGroup = new ControlGroup({
    label: "Appearance",
    container: gui.nativeTab.inspectorTab
});

export const INSPECTOR_OPACITY_CONTROL : SliderControl = new SliderControl({
    label : "Opacity"
})

// ANIMATION GRUP :  

export const INSPECTOR_ANIMATION_CONTROL_GROUP : ControlGroup = new ControlGroup({
    label: "Animation",
    container: gui.nativeTab.inspectorTab
});

export const INSPECTOR_SPRITE_ANIMATION_CONTROL : DropdownControl = new DropdownControl({
    label : "Animation"
});

export const INSPECTOR_ANIMATION_FPS_CONTROL : NumberControl = new NumberControl({
    label : "FPS"
});

export const INSPECTOR_ANIMATION_SPEED_CONTROL : NumberControl = new NumberControl({
    label : "Speed"
});

export const INSPECTOR_ANIMATION_CURRENT_FRAME_CONTROL : NumberControl = new NumberControl({
    label : "Frame"
});

// GRID GROUP : 

export const INSPECTOR_GRID_CONTROL_GROUP : ControlGroup = new ControlGroup({
    label : "Grid",
    container : gui.nativeTab.inspectorTab
});

export const INSPECTOR_SPRITE_GRID_CONTROL : DropdownControl = new DropdownControl({
    label : "Grid"
});

// COLLISION GROUP : 

export const INSPECTOR_COLLISION_CONTROL_GROUP : ControlGroup = new ControlGroup({
    label : "Collision",
    container : gui.nativeTab.inspectorTab
});

export const INSPECTOR_COLLISION_CONTROL : DropdownControl = new DropdownControl({
    label : "Collision"
});

export const INSPECTOR_COLLISION_VISIBILITY_CONTROL : DropdownControl = new DropdownControl({
    label : "Visibility"
});

// SAFE AREA CONTROL GROUP : 

export const INSPECTOR_SAFE_AREA_CONTROL_GROUP : ControlGroup = new ControlGroup({
    label : "Safe Area",
    container : gui.nativeTab.inspectorTab
});

export const INSPECTOR_SAFE_AREA_SCALE_X_CONTROL : NumberControl = new NumberControl({
    label: "Scale"
});

export const INSPECTOR_SAFE_AREA_SCALE_Y_CONTROL : NumberControl = new NumberControl({
    label: "Scale"
});

INSPECTOR_SAFE_AREA_SCALE_X_CONTROL.joinControl(INSPECTOR_SAFE_AREA_SCALE_Y_CONTROL);

export const INSPECTOR_SAFE_AREA_TRANSLATE_X_CONTROL : NumberControl = new NumberControl({
    label: "Translate"
});

export const INSPECTOR_SAFE_AREA_TRANSLATE_Y_CONTROL : NumberControl = new NumberControl({
    label: "Translate"
});

INSPECTOR_SAFE_AREA_TRANSLATE_X_CONTROL.joinControl(INSPECTOR_SAFE_AREA_TRANSLATE_Y_CONTROL);

