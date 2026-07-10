
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

// DIR LOADER : 

import { readdirSync, Dirent } from "fs";

export class DirLoader {

    private dirList: Dirent[];

    constructor(dir: string) {

        this.dirList = readdirSync(dir,{
            withFileTypes: true
        });

    }

    public get = (): Dirent[] => this.dirList;

};


// list.forEach((item : any) => {

//     if(item.isDirectory()) {
//         console.log("📁", item.name);
//     }

//     if(item.isFile()) {
//         console.log("📄", item.name);
//     }

// });