









/*---------------------------------------------------------------------------------------------
 *  copyright (c) 2024 BioBit Interactive Co.
 *  all rights reserverds.
 *---------------------------------------------------------------------------------------------*/

// FUNCION FOR GET ELEMENTS OF DOM : 

/* function to minify form to get element of dom
 * @param {id} - html element id*/

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


