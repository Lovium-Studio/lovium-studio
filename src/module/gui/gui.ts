
// GUI : 

import { getUi } from "../get-ui/get-ui.js";

export const gui = {
    mainContainer : getUi("main-container") as HTMLDivElement,
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
        sequenceBackwardAnimationButton : getUi("backward-animation") as HTMLButtonElement,
        sequenceRuler : getUi("area-time") as HTMLDivElement,
        sequenceStopButton : getUi("stop-animation") as HTMLButtonElement
    },
    tabManager : {
        tabLeftHeader : getUi("ui-left-container-tab-row") as HTMLDivElement,
        tabTopHeader : getUi("ui-top-container-tab-row") as HTMLDivElement,
        tabBottomHeader : getUi("ui-bottom-container-tab-row") as HTMLDivElement,
        tabRightHeader : getUi("ui-right-container-tab-row") as HTMLDivElement,
        tabLeftContainer : getUi("tab-left") as HTMLDivElement,
        tabTopContainer : getUi("tab-top") as HTMLDivElement,
        tabBottomContainer : getUi("tab-bottom") as HTMLDivElement,
        tabRightContainer : getUi("tab-right") as HTMLDivElement,
        addTabButton : getUi("add-tab-button") as HTMLButtonElement
    },
    nativeTab : {
        consoleTab : getUi("console-tab") as HTMLDivElement,
        timelineTab : getUi("timeline-tab") as HTMLDivElement,
        terminalTab : getUi("terminal-tab") as HTMLDivElement,
        boardTab : getUi("viewport-tab") as HTMLDivElement,
        inspectorTab : getUi("inspector-tab") as HTMLDivElement,
        explorerTab : getUi("explorer-tab") as HTMLDivElement,
        codeTab : getUi("code-editor-tab") as HTMLDivElement,
        assetTab : getUi("asset-tab") as HTMLDivElement
    },
    tooltip : {
        tooltipContainer : getUi("tooltip") as HTMLDivElement,
        tooltipLabel : getUi("tooltip-info") as HTMLSpanElement
    },
    consoleTab : {
        consoleTabButton : getUi("console-tab-button") as HTMLButtonElement,
        consoleTab : getUi("console-tab") as HTMLDivElement
    },
    contextMenu : {
        contextMenuContainer : getUi("context-menu-container") as HTMLDivElement
    },
    dropdown : {
        dropdownContainer : getUi("ui-dropdown") as HTMLDivElement
    },
    inspectorTab : {
        inspectorFontWheightDropdown : getUi("inspector-dropdown-font-wheight") as HTMLDivElement
    },
    windowMenu : {
        windowMenuContainer : getUi("window-menu-container") as HTMLDivElement,
        windowMenuBar : getUi("menu-bar") as HTMLDivElement
    },
    boardTab : {
        boardContainer : getUi("viewport-ui") as HTMLDivElement
    },
    custom : (el : any) => getUi(el)
};