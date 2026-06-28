
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

// TOGGLE : 

export class Toggle {

    private state : boolean;
    private toggleCallbackList : (( state : boolean )=> void)[] = []; 

    constructor( startState : boolean) {
        this.state = startState;
    };

    public press = () : void => {
        this.state = !this.state;  
        this.invokeCallback();
    }; 

    private invokeCallback = () : void => {
        if (this.toggleCallbackList.length > 0) {
            this.toggleCallbackList.forEach(callback => callback(this.state));
        };
    };

    public disarm = () : void => {
        if(this.state === false) return;
        this.state = false;
        this.invokeCallback();
    };

    public onToggle = ( callback : ( state : boolean )=> void) : void => {
        this.toggleCallbackList.push(callback); 
    }; 
};