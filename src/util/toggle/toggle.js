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
    state;
    toggleCallbackList = [];
    constructor(startState) {
        this.state = startState;
    }
    ;
    press = () => {
        this.state = !this.state;
        this.invokeCallback();
    };
    invokeCallback = () => {
        if (this.toggleCallbackList.length > 0) {
            this.toggleCallbackList.forEach(callback => callback(this.state));
        }
        ;
    };
    disarm = () => {
        if (this.state === false)
            return;
        this.state = false;
        this.invokeCallback();
    };
    onToggle = (callback) => {
        this.toggleCallbackList.push(callback);
    };
}
;
