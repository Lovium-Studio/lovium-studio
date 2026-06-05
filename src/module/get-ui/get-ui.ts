
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

// GET UI ( ELEMENT FROM DOM ) : 

export const getUi = (selector: string, node: Document | HTMLElement = document): any => {

    if (!selector) return null;

    if (selector.startsWith('...')) {
        const className = "." + selector.slice(3); 
        return node.querySelectorAll(className);
    };

    if (selector.startsWith('.')) return node.querySelector(selector);

    const id: string = selector.startsWith('#') ? selector.slice(1) : selector;

    return document.getElementById(id);
};


