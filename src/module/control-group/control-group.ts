
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

import { ControlGroupAddType, IControlGroupOption } from "../../../typescript/types.js";

// CONTROL GROUP : 

export class ControlGroup {

    private label : string;
    private container : HTMLDivElement;

    private controlGroupContainer : HTMLDivElement;
    private controlGroupLabel : HTMLSpanElement;
    private controlGroupControlContainer : HTMLDivElement;

    constructor( option : IControlGroupOption ){

        this.container = option.container;
        this.label = option.label;

        this.controlGroupContainer = document.createElement("div");
        this.controlGroupContainer.classList.add("control-group-container");

        this.controlGroupLabel = document.createElement("span");
        this.controlGroupLabel.classList.add("control-group-label");
        this.controlGroupLabel.textContent = this.label;

        this.controlGroupControlContainer = document.createElement("div");
        this.controlGroupControlContainer.classList.add("control-group-control-container");

        // APPEND : 

        this.controlGroupContainer.appendChild(this.controlGroupLabel);
        this.controlGroupContainer.appendChild(this.controlGroupControlContainer);

        this.container.appendChild(this.controlGroupContainer);

    };

    public addControl = ( control : ControlGroupAddType ) : void => {

        const c = control.getControlContainer();

        this.controlGroupControlContainer.appendChild(c);

    };

    public clearAllControl = () : string => this.controlGroupControlContainer.innerHTML = "";


};