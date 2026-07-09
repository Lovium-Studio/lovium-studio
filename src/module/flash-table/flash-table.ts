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

import { IFlashButton, IFlashRow } from "../../../ts/types.js";

// FLASH TABLE :   

export class FlashTable {

    private container : HTMLElement;
    private tabList : { name : string , tab : HTMLDivElement}[];
    private table : HTMLDivElement;

    constructor ( container : HTMLDivElement) {

        this.container = container;
        this.tabList = [];

        this.table = document.createElement("div");
        this.table.classList.add("flash-table");   

        this.container.appendChild(this.table); 

    }; 
    
    public append = ( flashElement : FlashRow | FlashButton , name : string ) : void => {
        const tab = this.tabList.find(tab=> tab.name === name)
        tab?.tab.appendChild(flashElement.get());
    };

    public register = ( name  : string ) : void => {
        const tab : HTMLDivElement = document.createElement("div");
        tab.classList.add("flash-table-tab");
        this.tabList.push({name,tab});
        this.table.appendChild(tab);
    };

    public switch = (name  : string ) : void => {
        this.tabList.forEach(tab=> tab.tab.style.display = tab.name === name ? "flex" : "none")
    };

};

// FLASH ROW : 

export class FlashRow {

    public name : string;
    public value : string | number;

    private row : HTMLDivElement;
    private rowName : HTMLSpanElement;
    private rowValue : HTMLSpanElement;

    constructor ( option : IFlashRow ) {

        this.name = option.name;
        this.value = option.value;

        this.row = document.createElement("div");
        this.row.classList.add("info-table-row"); 

        this.rowName = document.createElement("span");
        this.rowName.classList.add("info-key");
        this.rowName.textContent = this.name;

        this.rowValue = document.createElement("span");
        this.rowValue.classList.add("info-value"); 
        this.rowValue.textContent = this.value.toString();

        this.row.appendChild(this.rowName);
        this.row.appendChild(this.rowValue);

    };

    public get = () : HTMLDivElement => this.row;

};

// FLASH BUTTON : 

export class FlashButton {

    public name : string;

    private button : HTMLButtonElement;
    private icon : string;
    private onClick : Function | null;

    constructor ( option : IFlashButton ) {

        this.name = option.name;
        this.icon = option.icon;
        this.onClick = option.onClick || null;

        this.button = document.createElement("button");
        this.button.classList.add("row-button-secondary");
        this.button.innerHTML = this.name + "<i class=\"" + this.icon + "\"></i>";

        if(this.onClick){
            const callback = this.onClick;  
            this.button.onclick = () => callback();
        };

    };

    public get = () : HTMLButtonElement => this.button;

};