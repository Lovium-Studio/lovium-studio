
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

import { ControlGroupAddType, ControlType, IDropdown, IDropdownControl, INumberControl, ISliderControl, ITextControl } from "../../../ts/types.js";

// CONTROL : 

// TEXT CONTROL : 

export class TextControl {

    private label : string;
    private placeholder : string;

    private controlContainer : HTMLDivElement;
    private controlLabelContainer : HTMLDivElement;
    private controlLabel : HTMLSpanElement;
    private controlFieldContainer : HTMLDivElement;
    private controlTextInputContainer : HTMLDivElement;
    private controlTextInputIconContainer : HTMLDivElement;
    private controlTextInputIcon : HTMLElement;
    private controlTextInput : HTMLInputElement;
    private controlType : ControlType;

    private onWriteCallbackList : ((value: string) => void)[] = [];
    private onKeyBoardEnterCallbackList : ((value: string) => void)[] = [];
    private onMouseLeaveCallbackList : ((value: string) => void)[] = [];

    constructor( option : ITextControl ) {

        this.label = option.label || "NO_NAME";
        this.placeholder = option.placeholder || "ABC";
        this.controlType = "TEXT_CONTROL";

        this.controlContainer = document.createElement("div");
        this.controlContainer.classList.add("control-row-container-row");

        this.controlLabelContainer = document.createElement("div");
        this.controlLabelContainer.classList.add("control-row-container-label-container");
        this.controlLabel = document.createElement("span");
        this.controlLabel.textContent = this.label;
        this.controlLabel.classList.add("control-row-container-label");

        this.controlFieldContainer = document.createElement("div");
        this.controlFieldContainer.classList.add("inpector-container-control-container");

        this.controlTextInputContainer = document.createElement("div");
        this.controlTextInputContainer.classList.add("control-row-container-text-input-container");

        this.controlTextInputIconContainer = document.createElement("div");
        this.controlTextInputIconContainer.classList.add("text-input-icon");
        this.controlTextInputIcon = document.createElement("i");
        this.controlTextInputIcon.classList.add("ri-keyboard-line");

        this.controlTextInput = document.createElement("input");
        this.controlTextInput.type = "text";
        this.controlTextInput.placeholder = this.placeholder;

        // APPEND : 

        this.controlContainer.appendChild(this.controlLabelContainer);

        this.controlContainer.appendChild(this.controlFieldContainer); 

        this.controlLabelContainer.appendChild(this.controlLabel);

        this.controlFieldContainer.appendChild(this.controlTextInputContainer); 

        this.controlTextInputContainer.appendChild(this.controlTextInputIconContainer);
        this.controlTextInputIconContainer.appendChild(this.controlTextInputIcon);

        this.controlTextInputContainer.appendChild(this.controlTextInput);

        // EVENT :  

        this.controlTextInput.addEventListener("input", ()=> {
            this.onWriteCallbackList?.forEach( c => c(this.controlTextInput.value));
        });

        this.controlTextInput.addEventListener("blur", ()=> {
            this.onKeyBoardEnterCallbackList?.forEach( c => c(this.controlTextInput.value));
        });

        this.controlTextInput.addEventListener("keydown", (e : KeyboardEvent )=> {
            if(e.code === "Enter") this.onKeyBoardEnterCallbackList?.forEach( c => c(this.controlTextInput.value));
        });

    };

    public getControlContainer = () : HTMLDivElement => this.controlContainer;

    public getInputContainer = (): HTMLDivElement => {
        return this.controlTextInputContainer;
    };

    public getValue = () : string => this.controlTextInput.value;

    public onWrite = (callback: (value: string) => void) : void => {
        this.onWriteCallbackList.push(callback);
    };

    public onKeyboardEnter = (callback: (value: string) => void) : void => {
        this.onKeyBoardEnterCallbackList.push(callback);
    };

    public onMouseBlur = (callback: (value: string) => void) : void => {
        this.onMouseLeaveCallbackList.push(callback);
    };

    public setValue = (value : string ) : string => this.controlTextInput.value = value;

    public joinControl = (control: TextControl): void => {

        if (control.controlType === "TEXT_CONTROL") {

            control.removeLabel();

            this.controlFieldContainer.appendChild(
                control.getInputContainer()
            );
        }
    };

    private removeLabel = () : string => this.controlLabelContainer.style.display = "none";
};

// NUMBER CONTROL : 

export class NumberControl {

    private label : string;
    private placeholder : string;
    private controlType : ControlType;
    private max : number | null;
    private min : number | null;
    private prefix : string;
    private sufix : string;
    private lastValue : number;
    private value : number

    private controlContainer : HTMLDivElement;
    private controlLabelContainer : HTMLDivElement;
    private controlLabel : HTMLSpanElement;
    private controlFieldContainer : HTMLDivElement;
    private controlNumberInputContainer : HTMLDivElement;
    private controlNumberInputIconContainer : HTMLDivElement;
    private controlNumberInputINCDEC : HTMLElement;
    private controlNumberInput : HTMLInputElement;

    private onWriteCallbackList : ((value: string) => void)[] = [];
    private onKeyBoardEnterCallbackList : ((value: string) => void)[] = [];
    private onMouseLeaveCallbackList : ((value: string) => void)[] = [];
    private onIncrementorStartCallbackList : Function[] = [];
    private onIncrementorEndCallbackList : Function[] = [];

    private isDragging = false;

    constructor( option : INumberControl ) {
 
        this.label = option.label || "NO_NAME";
        this.placeholder = option.placeholder || "0";
        this.controlType = "NUMBER_CONTROL"; 
        this.max = option.max ?? null;
        this.min = option.min ?? null;
        this.prefix = option.prefix || "";
        this.sufix = option.sufix || "";
        this.value = option.value; 
        this.lastValue = option.value;

        this.controlContainer = document.createElement("div");
        this.controlContainer.classList.add("control-row-container-row"); 

        this.controlLabelContainer = document.createElement("div");
        this.controlLabelContainer.classList.add("control-row-container-label-container");
        this.controlLabel = document.createElement("span");
        this.controlLabel.textContent = this.label;
        this.controlLabel.classList.add("control-row-container-label");  

        this.controlFieldContainer = document.createElement("div");
        this.controlFieldContainer.classList.add("inpector-container-control-container");

        this.controlNumberInputContainer = document.createElement("div");
        this.controlNumberInputContainer.classList.add("control-row-container-text-input-container");

        this.controlNumberInputIconContainer = document.createElement("div");
        this.controlNumberInputIconContainer.classList.add("input-incrementor");
        this.controlNumberInputINCDEC = document.createElement("i");
        this.controlNumberInputINCDEC.classList.add("ri-expand-left-right-fill"); 

        this.controlNumberInput = document.createElement("input");
        this.controlNumberInput.type = "text";
        this.controlNumberInput.placeholder = this.placeholder;
        this.setInputValue(this.value.toString());

        // APPEND : 

        this.controlContainer.appendChild(this.controlLabelContainer);

        this.controlContainer.appendChild(this.controlFieldContainer); 

        this.controlLabelContainer.appendChild(this.controlLabel);

        this.controlFieldContainer.appendChild(this.controlNumberInputContainer); 

        this.controlNumberInputContainer.appendChild(this.controlNumberInputIconContainer);
        this.controlNumberInputIconContainer.appendChild(this.controlNumberInputINCDEC);

        this.controlNumberInputContainer.appendChild(this.controlNumberInput);

        // EVENT :  

        this.controlNumberInput.addEventListener("beforeinput", (e: InputEvent) => {
            if (e.data && !/^[0-9.-]+$/.test(e.data)) {
                e.preventDefault();
            }
        });

        this.controlNumberInput.addEventListener("input", () => {
            let cleanText = this.controlNumberInput.value.replace(/[^-0-9.]/g, "");
            if (cleanText === "" || cleanText === "-") return;

            let inputValue = Number(cleanText);

            if (this.max !== null && inputValue > this.max) {
                inputValue = this.max;
                this.controlNumberInput.value = this.max.toString();
            }
            if (this.min !== null && inputValue < this.min) {
                inputValue = this.min;
                this.controlNumberInput.value = this.min.toString();
            }   

            this.value = inputValue;
            this.onWriteCallbackList?.forEach(c => c(inputValue.toString())); 
        });

        this.controlNumberInput.addEventListener("focus", () => {
            this.controlNumberInput.value = this.value.toString();
        });

        this.controlNumberInput.addEventListener("blur", () => {
            this.controlNumberInput.value = `${this.prefix || ""}${this.value}${this.sufix || ""}`;
            this.onKeyBoardEnterCallbackList?.forEach(c => c(this.value.toString()));
        });

        this.controlNumberInput.addEventListener("keydown", (e: KeyboardEvent) => {
            if (e.code === "Enter") this.controlNumberInput.blur();
        });

        this.controlNumberInput.addEventListener("blur", ()=> {
            this.onKeyBoardEnterCallbackList?.forEach( c => c(this.controlNumberInput.value));
        });

        this.controlNumberInput.addEventListener("keydown", (e : KeyboardEvent )=> {
            if(e.code === "Enter") this.onKeyBoardEnterCallbackList?.forEach( c => c(this.controlNumberInput.value));
        });

        this.controlNumberInputINCDEC.addEventListener("mousedown",this.onIncrementorDragStart);

    };

    public onIncrementorStart = ( callback : Function ) : void => {
        this.onIncrementorStartCallbackList.push(callback);
    };

    public onIncrementorEnd = ( callback : Function ) : void => {
        this.onIncrementorEndCallbackList.push(callback);
    };

    public getControlContainer = () : HTMLDivElement => this.controlContainer;

    public getInputContainer = (): HTMLDivElement => {
        return this.controlNumberInputContainer;
    };

    public getValue = () : string => this.controlNumberInput.value;

    public onWrite = (callback: (value: string) => void) : void => {
        this.onWriteCallbackList.push(callback);
    };

    private setInputValue = ( value : string ) : void => {
        this.controlNumberInput.value = this.prefix + value + this.sufix;
    };

    private onIncrementorDragStart = (e: MouseEvent): void => {  

        e.preventDefault();

        if(Array.isArray(this.onIncrementorStartCallbackList) && this.onIncrementorStartCallbackList.length > 0)
        this.onIncrementorStartCallbackList.forEach(callback => callback());

        this.controlNumberInputINCDEC.requestPointerLock(); 

        this.isDragging = true;   

        document.addEventListener("mousemove",this.onIncrementorDragMove);
        document.addEventListener("mouseup",this.onIncrementorDragEnd);
    };

    private onIncrementorDragEnd = (): void => {

        if(Array.isArray(this.onIncrementorEndCallbackList) && this.onIncrementorEndCallbackList.length > 0)   
        this.onIncrementorEndCallbackList.forEach(callback => callback());
 
        this.isDragging = false; 

        document.exitPointerLock(); 

        document.removeEventListener("mousemove",this.onIncrementorDragMove);
        document.removeEventListener("mouseup",this.onIncrementorDragEnd);
    };

    private onIncrementorDragMove = (e: MouseEvent): void => {
    if (!this.isDragging) return;
    
    const currentValue = parseFloat(this.controlNumberInput.value) || 0;
    const sensitivity = 1; 
    let newValue = currentValue + (e.movementX * sensitivity);

    if (this.max !== null && newValue > this.max) newValue = this.max;  
    if (this.min !== null && newValue < this.min) newValue = this.min;

    this.value = newValue;
    this.lastValue = newValue; 
    this.controlNumberInput.value = this.prefix + newValue.toString() + this.sufix;

    this.onWriteCallbackList.forEach(callback => callback(this.value.toString()));
};

    public onKeyboardEnter = (callback: (value: string) => void) : void => {
        this.onKeyBoardEnterCallbackList.push(callback);
    };

    public onMouseBlur = (callback: (value: string) => void) : void => {
        this.onMouseLeaveCallbackList.push(callback);
    };

    public setValue = (value : number ) : void => {
        this.value = value;
        this.setInputValue(this.value.toString());
    };

    public joinControl = (control: NumberControl ): void => {

        if (control.controlType === "NUMBER_CONTROL") {

            control.removeLabel();

            this.controlFieldContainer.appendChild(
                control.getInputContainer()
            );
        };
    };

    private removeLabel = () : string => this.controlLabelContainer.style.display = "none";
};


// const value = this.dragStartValue + (deltaX * 0.1);

// SLIDER CONTROL : 

export class SliderControl {

    private label : string;
    private controlContainer : HTMLDivElement;
    private controlLabelContainer : HTMLDivElement;
    private controlLabel : HTMLSpanElement;
    private controlFieldContainer : HTMLDivElement;
    private controlInputContainer : HTMLDivElement;
    private controlInput : HTMLInputElement;
    private controlType : ControlType;
    private controlSliderLabelValue : HTMLSpanElement;
    private min : number;
    private max : number;
    private step : number;
    private value : number;

    private onDragCallbackList : ((value: string) => void)[] = [];

    constructor( option : ISliderControl ) {

        this.label = option.label || "NO_NAME";
        this.controlType = "SLIDER_CONTROL";
        this.max = option.max;
        this.min = option.min;
        this.step = option.step || 0;
        this.value = option.value;

        this.controlContainer = document.createElement("div");
        this.controlContainer.classList.add("control-row-container-row");

        this.controlLabelContainer = document.createElement("div");
        this.controlLabelContainer.classList.add("control-row-container-label-container");
        this.controlLabel = document.createElement("span");
        this.controlLabel.textContent = this.label;
        this.controlLabel.classList.add("control-row-container-label");

        this.controlFieldContainer = document.createElement("div");
        this.controlFieldContainer.classList.add("inpector-container-control-container");
 
        this.controlInputContainer = document.createElement("div");
        this.controlInputContainer.classList.add("control-row-container-range-container");

        this.controlSliderLabelValue = document.createElement("span"); 
        this.controlSliderLabelValue.classList.add("control-row-range-value-label")
        this.controlSliderLabelValue.textContent = "0.0";

        this.controlInput = document.createElement("input");
        this.controlInput.type = "range";
        this.controlInput.classList.add("control-row-range");

        this.controlInput.max = this.max.toString();
        this.controlInput.min = this.min.toString();
        this.controlInput.value = this.value.toString();

        if(this.step > 0) this.controlInput.step = this.step.toString();



        // APPEND : 

        this.controlContainer.appendChild(this.controlLabelContainer);

        this.controlContainer.appendChild(this.controlFieldContainer); 

        this.controlLabelContainer.appendChild(this.controlLabel);
 
        this.controlFieldContainer.appendChild(this.controlInputContainer); 

        this.controlInputContainer.appendChild(this.controlSliderLabelValue);
        this.controlInputContainer.appendChild(this.controlInput);

        // EVENT :  

        this.controlInput.addEventListener("input", ()=> {
            this.onDragCallbackList?.forEach( c => c(this.controlInput.value));
            this.updateValue(this.controlInput.value)
        });

    };

    private updateValue = ( value : string | number ) : void => {
        this.controlSliderLabelValue.textContent = value.toString();
    };

    public getControlContainer = () : HTMLDivElement => this.controlContainer;

    public getInputContainer = (): HTMLDivElement => {
        return this.controlInputContainer;
    }; 

    public getValue = () : string => this.controlInput.value;

    public onDrag = (callback: (value: string) => void) : void => {
        this.onDragCallbackList.push(callback);
    };

    public setValue = (value : number ) : void => {
        this.controlInput.value = value.toString();
        this.controlSliderLabelValue.textContent = value.toString();
    }; 

    public joinControl = (control: SliderControl): void => {

        if (control.controlType === "SLIDER_CONTROL") {

            control.removeLabel();

            this.controlFieldContainer.appendChild(
                control.getInputContainer()
            );
        }
    };

    private removeLabel = () : string => this.controlLabelContainer.style.display = "none";
};

// DROPDOWN CONTROL : 

export class DropdownControl {

    private label : string;

    private controlContainer : HTMLDivElement;
    private controlLabelContainer : HTMLDivElement;
    private controlLabel : HTMLSpanElement;
    private controlFieldContainer : HTMLDivElement;
    private controlDropdownInputContainer : HTMLDivElement;
    private controlDropdownInputIconContainer : HTMLDivElement;
    private controlDropdownInputIcon : HTMLElement;
    private controlDropdownSelectedLabel : HTMLSpanElement;
    private controlType : ControlType;
    private controlDropdownContainer : HTMLDivElement;

    private onWriteCallbackList : ((value: string) => void)[] = [];
    private onKeyBoardEnterCallbackList : ((value: string) => void)[] = [];
    private onMouseLeaveCallbackList : ((value: string) => void)[] = [];

    constructor( option : IDropdownControl ) {

        this.label = option.label || "NO_NAME";
        this.controlType = "DROPDOWN_CONTROL";

        this.controlContainer = document.createElement("div");
        this.controlContainer.classList.add("control-row-container-row");

        this.controlLabelContainer = document.createElement("div");
        this.controlLabelContainer.classList.add("control-row-container-label-container");
        this.controlLabel = document.createElement("span");
        this.controlLabel.textContent = this.label;
        this.controlLabel.classList.add("control-row-container-label");

        this.controlFieldContainer = document.createElement("div");
        this.controlFieldContainer.classList.add("inpector-container-control-container");

        this.controlDropdownInputContainer = document.createElement("div");
        this.controlDropdownInputContainer.classList.add("control-row-container-dropdown-container"); 

        this.controlDropdownInputIconContainer = document.createElement("div"); 
        this.controlDropdownInputIconContainer.classList.add("dropdown-arrow");
        this.controlDropdownInputIcon = document.createElement("i");
        this.controlDropdownInputIcon.classList.add("ri-arrow-down-s-fill");

        this.controlDropdownContainer = document.createElement("div");
        this.controlDropdownContainer.classList.add("control-row-dropdown");

        this.controlDropdownSelectedLabel = document.createElement("span"); 
        this.controlDropdownSelectedLabel.textContent = "Select";
        this.controlDropdownSelectedLabel.classList.add("control-row-dropdown-selected-label");

        // APPEND : 

        this.controlContainer.appendChild(this.controlLabelContainer);
 
        this.controlContainer.appendChild(this.controlFieldContainer); 

        this.controlLabelContainer.appendChild(this.controlLabel);

        this.controlFieldContainer.appendChild(this.controlDropdownInputContainer); 

        this.controlDropdownInputContainer.appendChild(this.controlDropdownInputIconContainer);
        this.controlDropdownInputIconContainer.appendChild(this.controlDropdownInputIcon);

        this.controlDropdownContainer.appendChild(this.controlDropdownSelectedLabel);
        this.controlDropdownInputContainer.appendChild(this.controlDropdownContainer);

        // EVENT :  

        // this.controlDropdownSelectedLabel.addEventListener("input", ()=> {
        //     this.onWriteCallbackList?.forEach( c => c(this.controlDropdownSelectedLabel.value));
        // });

        // this.controlDropdownSelectedLabel.addEventListener("blur", ()=> {
        //     this.onKeyBoardEnterCallbackList?.forEach( c => c(this.controlDropdownSelectedLabel.value));
        // });

        // this.controlDropdownSelectedLabel.addEventListener("keydown", (e : KeyboardEvent )=> {
        //     if(e.code === "Enter") this.onKeyBoardEnterCallbackList?.forEach( c => c(this.controlDropdownSelectedLabel.value));
        // });

    };

    public getControlContainer = () : HTMLDivElement => this.controlContainer;

    public getInputContainer = (): HTMLDivElement => {
        return this.controlDropdownInputContainer;
    };

    // public getValue = () : string => this.controlDropdownSelectedLabel.value;

    public onWrite = (callback: (value: string) => void) : void => {
        this.onWriteCallbackList.push(callback);
    };

    public onKeyboardEnter = (callback: (value: string) => void) : void => {
        this.onKeyBoardEnterCallbackList.push(callback);
    };

    public onMouseBlur = (callback: (value: string) => void) : void => {
        this.onMouseLeaveCallbackList.push(callback);
    };

    // public setValue = (value : string ) : string => this.controlDropdownSelectedLabel.value = value;

    public joinControl = (control: DropdownControl ): void => {

        if (control.controlType === "DROPDOWN_CONTROL") {

            control.removeLabel();

            this.controlFieldContainer.appendChild(
                control.getInputContainer()
            );
        }
    };

    private removeLabel = () : string => this.controlLabelContainer.style.display = "none";
};