
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

// GUI : 

import { getUi } from "../get-ui/get-ui.js";

export const gui = {
    mainContainer : getUi("main-container") as HTMLDivElement,
    mainShield : getUi("ui-shild") as HTMLDivElement,
    assetTab : {
        simpleImagePreview : getUi("simple-image-preview") as HTMLDivElement,
        simplePreviewContainer : getUi("simple-preview-container") as HTMLDivElement,
        simplePreviewContainerZoomArea : getUi("simple-preview-container-zoom-area") as HTMLDivElement
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
    sceneTab : {
        sceneGUIContainer : getUi("scene-gui-container") as HTMLDivElement,
        sceneCanvas : getUi("scene-canvas") as HTMLCanvasElement,
        sceneCanvasContainer : getUi("scene-canvas-container") as HTMLDivElement,
        scene2dAlignHorizontalButton : getUi("scene-2d-align-horizontal-button") as HTMLButtonElement,
        scene2dZoomInButton : getUi("scene-2d-zoom-in-button") as HTMLButtonElement,
        scene2dZoomOutButton : getUi("scene-2d-zoom-out-button") as HTMLButtonElement,
        scene2dSelectRegionButton : getUi("scene-2d-select-region-button") as HTMLButtonElement
},
    timelineTab : {
        timelinePlayButton : getUi("timeline-play-animation-button") as HTMLButtonElement,
        timelineNeedle : getUi("needle") as HTMLDivElement,
        timelinePreNeedle : getUi("pre-needle") as HTMLDivElement, 
        timelineForwardAnimationButton : getUi("forward-animation") as HTMLButtonElement,
        timelineBackwardAnimationButton : getUi("backward-animation") as HTMLButtonElement,
        timelineRuler : getUi("track-ruler") as HTMLDivElement,
        timelineStopButton : getUi("stop-animation") as HTMLButtonElement,
        timelineTrackControlContainer : getUi("sequence-control-container") as HTMLDivElement,
        timelineTrackContainer : getUi("sequence-tracker-container") as HTMLDivElement,
    },
    tab : {
        tabLeftContainer : getUi("") as HTMLDivElement,
        tabRightContainer : getUi("ui-right-container") as HTMLDivElement,
        tabBottomContainer : getUi("ui-bottom-container") as HTMLDivElement,
        tabTopContainer : getUi("ui-top-container") as HTMLDivElement,
        tabCenterContainer : getUi("ui-center-container") as HTMLDivElement,
    },
    splitter : {
        splitterLeft : getUi("splitter-a") as HTMLDivElement,
        splitterBottom : getUi("splitter-b") as HTMLDivElement,
        splitterRight : getUi("splitter-c") as HTMLDivElement,
    },
    statusBar : {
        statusBarLeftContainer : getUi("status-bar-left-container") as  HTMLDivElement,
        statusBarRightContainer : getUi("status-bar-right-container") as  HTMLDivElement
    },
    terminalTab : {
        terminalTab : getUi("terminal-tab") as HTMLDivElement,
        terminalInput : getUi("terminal-input") as HTMLInputElement
    },
    custom : (el : any) => getUi(el)  
}; 