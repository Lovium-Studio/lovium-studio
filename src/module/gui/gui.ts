
// GUI : 

import { getUi } from "../get-ui/get-ui.js";

export const gui = {
    assetTab : {
        simpleImagePreview : getUi("simple-image-preview") as HTMLDivElement,
        simplePreviewContainer : getUi("simple-preview-container") as HTMLDivElement,
        simplePreviewContainerZoomArea : getUi("simple-preview-container-zoom-area") as HTMLDivElement
    },
    sequenceTab : {
        sequencePlayButton : getUi("play-animation") as HTMLButtonElement,
        sequenceNeedle : getUi("needle") as HTMLDivElement,
        sequencePreNeedle : getUi("pre-needle") as HTMLDivElement,
        sequenceForwardAnimationButton : getUi("forward-animation") as HTMLButtonElement,
        sequenceBackwardAnimationButton : getUi("backward-animation") as HTMLButtonElement,\
        sequenceRuler : getUi("area-time") as HTMLDivElement,
        sequenceStopButton : getUi("stop-animation") as HTMLButtonElement
    },
    custom : (el : any) => getUi(el)
};