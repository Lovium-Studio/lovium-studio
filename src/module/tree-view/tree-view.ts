
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

import { ITreeView } from "../../ts/types.js";

// TREE VIEW : 

export class TreeView {

    private isCollapsed : boolean;
    private tree : ITreeView[];

    constructor ( tree : ITreeView[] ) {
        this.tree = tree;
    };

    public update = ( tree : ITreeView[] ) : void => {


    }
};

class TreeViewBranch {

    constructor ( branch :  ITreeView) {

    }
}