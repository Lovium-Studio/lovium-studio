











// UI IMAGE LOAD : 

import { console } from "../console/console.js";

const uiImagePath = {
    simpleFileViewerAlphaBg : ".././assets/img/alpha-bg.svg"
}

function url(path){
    return `url("${path}")`;
}

export function uiImageLoad(){

    const simplePreviewContainer = document.querySelector(".simple-preview-container");
    simplePreviewContainer.style.backgroundImage = url(uiImagePath.simpleFileViewerAlphaBg);
}