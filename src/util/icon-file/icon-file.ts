
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

// ICON FILE : 

const ICON_MAP : Record<string,string> = {
    png : "ri-file-image-fill",
    lua : "ri-moon-clear-fill",
    txt : "ri-file-text-fill",
    ogg : "ri-file-music-fill",
    lscn : "ri-clapperboard-fill",
    lanim : "ri-movie-2-fill",
    lcui : "ri-toggle-fill",
    lui : "ri-layout-fill"  
}; 

export const iconFile = ( path : string ) : string => {
    const FILE = path.split(".").pop()?.toLowerCase() ?? "";
    if(ICON_MAP[FILE]) return ICON_MAP[FILE]; 
    else return "ri-file-fill";
};  

 