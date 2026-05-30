
// GUI : 

import { getUi } from "../get-ui/get-ui.js";

export const gui = {
    assetTab : {
        simpleImagePreview : getUi("simple-image-preview") as HTMLDivElement,
        simplePreviewContainer : getUi("simple-preview-container") as HTMLDivElement,
        simplePreviewContainerZoomArea : getUi("simple-preview-container-zoom-area") as HTMLDivElement
    },
    custom : (el : any) => getUi(el)
} 