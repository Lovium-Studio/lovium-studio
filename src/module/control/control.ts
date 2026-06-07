
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

import { ControlGroupAddType, ControlType, IDropdown, IDropdownControl, ITextControl } from "../../../typescript/types.js";

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

    private controlContainer : HTMLDivElement;
    private controlLabelContainer : HTMLDivElement;
    private controlLabel : HTMLSpanElement;
    private controlFieldContainer : HTMLDivElement;
    private controlNumberInputContainer : HTMLDivElement;
    private controlNumberInputIconContainer : HTMLDivElement;
    private controlNumberInputINCDEC : HTMLElement;
    private controlNumberInput : HTMLInputElement;
    private controlType : ControlType;

    private onWriteCallbackList : ((value: string) => void)[] = [];
    private onKeyBoardEnterCallbackList : ((value: string) => void)[] = [];
    private onMouseLeaveCallbackList : ((value: string) => void)[] = [];

    private dragStartX = 0;
    private dragStartValue = 0;
    private isDragging = false;

    constructor( option : ITextControl ) {

        this.label = option.label || "NO_NAME";
        this.placeholder = option.placeholder || "0";
        this.controlType = "NUMBER_CONTROL"; 

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
        this.controlNumberInput.type = "number";
        this.controlNumberInput.placeholder = this.placeholder;

        // APPEND : 

        this.controlContainer.appendChild(this.controlLabelContainer);

        this.controlContainer.appendChild(this.controlFieldContainer); 

        this.controlLabelContainer.appendChild(this.controlLabel);

        this.controlFieldContainer.appendChild(this.controlNumberInputContainer); 

        this.controlNumberInputContainer.appendChild(this.controlNumberInputIconContainer);
        this.controlNumberInputIconContainer.appendChild(this.controlNumberInputINCDEC);

        this.controlNumberInputContainer.appendChild(this.controlNumberInput);

        // EVENT :  

        this.controlNumberInput.addEventListener("input", ()=> {
            this.onWriteCallbackList?.forEach( c => c(this.controlNumberInput.value));
        });

        this.controlNumberInput.addEventListener("blur", ()=> {
            this.onKeyBoardEnterCallbackList?.forEach( c => c(this.controlNumberInput.value));
        });

        this.controlNumberInput.addEventListener("keydown", (e : KeyboardEvent )=> {
            if(e.code === "Enter") this.onKeyBoardEnterCallbackList?.forEach( c => c(this.controlNumberInput.value));
        });

        this.controlNumberInputINCDEC.addEventListener("mousedown",this.onIncrementorDragStart);

    };

    public getControlContainer = () : HTMLDivElement => this.controlContainer;

    public getInputContainer = (): HTMLDivElement => {
        return this.controlNumberInputContainer;
    };

    public getValue = () : string => this.controlNumberInput.value;

    public onWrite = (callback: (value: string) => void) : void => {
        this.onWriteCallbackList.push(callback);
    };

    private onIncrementorDragStart = (e: MouseEvent): void => {

        e.preventDefault();

        this.isDragging = true;

        this.dragStartX = e.clientX;

        this.dragStartValue = parseFloat(this.controlNumberInput.value) || 0;

        document.addEventListener("mousemove",this.onIncrementorDragMove);
        document.addEventListener("mouseup",this.onIncrementorDragEnd);
    };

    private onIncrementorDragEnd = (): void => {

        this.isDragging = false;

        document.removeEventListener("mousemove",this.onIncrementorDragMove);
        document.removeEventListener("mouseup",this.onIncrementorDragEnd);
    };

    private onIncrementorDragMove = (e: MouseEvent): void => {

        if (!this.isDragging) {
            return;
        };

        const deltaX = e.clientX - this.dragStartX;

        const value =
            this.dragStartValue + deltaX;

        this.controlNumberInput.value = value.toString();

        this.onWriteCallbackList.forEach(callback => callback(this.controlNumberInput.value));
    };

    public onKeyboardEnter = (callback: (value: string) => void) : void => {
        this.onKeyBoardEnterCallbackList.push(callback);
    };

    public onMouseBlur = (callback: (value: string) => void) : void => {
        this.onMouseLeaveCallbackList.push(callback);
    };

    public setValue = (value : string ) : string => this.controlNumberInput.value = value;

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
    private placeholder : string;

    private controlContainer : HTMLDivElement;
    private controlLabelContainer : HTMLDivElement;
    private controlLabel : HTMLSpanElement;
    private controlFieldContainer : HTMLDivElement;
    private controlInputContainer : HTMLDivElement;
    private controlInput : HTMLInputElement;
    private controlType : ControlType;
    private controlSliderLabelValue : HTMLSpanElement;

    private onDragCallbackList : ((value: string) => void)[] = [];

    constructor( option : ITextControl ) {

        this.label = option.label || "NO_NAME";
        this.placeholder = option.placeholder || "ABC";
        this.controlType = "SLIDER_CONTROL";

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
        this.controlInput.placeholder = this.placeholder;

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

    public setValue = (value : string ) : string => this.controlInput.value = value;

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