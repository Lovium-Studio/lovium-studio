










// SPLITTER : 

import { console } from "../console/console.js";
import { getUi } from "../get-ui/get-ui.js";

const uiView = getUi("ui-view");

// SPLITTERS :

const splitterA = getUi("splitter-a");
const splitterB = getUi("splitter-b");
const splitterC = getUi("splitter-c");

// UI CONTAINERS :

const uiLeftContainer = getUi("ui-left-container");
const uiTopContainer = getUi("ui-top-container");
const uiBottomContainer = getUi("ui-bottom-container");
const uiRightContainer = getUi("ui-right-container");
const uiCenterContainer = getUi("ui-center-container");

export function splitter(){

    document.addEventListener("DOMContentLoaded", function() {

        let isSplitting = false;
        let startX, startY, startWidthLeft, startWidthRight, startHeightTop, startHeightBottom, startWidthCenter;

        function setSplitter(settings) {
            const splitterOffsset = settings.offsset;
            const splitterElement = settings.element;
            const splitterContainer1 = settings.container1;
            const splitterContainer2 = settings.container2;
            const splitterMinWidth = settings.minWidth;
            const splitterMinHeight = settings.minHeight;

            console(splitterContainer1.offsetWidth)

            splitterElement.addEventListener("mousedown", function(e) {
                isSplitting = true;
                startX = e.clientX;
                startY = e.clientY;

                // Guarda os tamanhos iniciais dos containers
                if (splitterOffsset === "horizontal") {
                    startWidthLeft = splitterContainer1.offsetWidth;
                    startWidthCenter = splitterContainer2.offsetWidth;
                } else {
                    startHeightTop = splitterContainer1.offsetHeight;
                    startHeightBottom = splitterContainer2.offsetHeight;
                }

                document.addEventListener("mousemove", onMouseMove);
                document.addEventListener("mouseup", stopSplit);
            });

            function onMouseMove(e) {
                if (!isSplitting) return;

                if (splitterOffsset === "horizontal") {
                    const offsetX = e.clientX - startX;
                    const newWidthContainer1 = startWidthLeft + offsetX;
                    const newWidthContainer2 = startWidthCenter - offsetX;
                    if (newWidthContainer1 > splitterMinWidth && newWidthContainer2 > splitterMinWidth) {
                        splitterContainer1.style.width = `${newWidthContainer1}px`;
                        splitterContainer2.style.width = `${newWidthContainer2}px`;
                    }
                } else {
                    const offsetY = e.clientY - startY;
                    const newHeightContainer1 = startHeightTop + offsetY;
                    const newHeightContainer2 = startHeightBottom - offsetY;
                    if (newHeightContainer1 > splitterMinHeight && newHeightContainer2 > splitterMinHeight) {
                        splitterContainer1.style.height = `${newHeightContainer1}px`;
                        splitterContainer2.style.height = `${newHeightContainer2}px`;
                    }
                }
            }

            function stopSplit() {
                isSplitting = false;
                document.removeEventListener("mousemove", onMouseMove);
                document.removeEventListener("mouseup", stopSplit);
            }
        }

        // Configurações para o splitter A entre uiLeftContainer e uiCenterContainer
        setSplitter({
            offsset: "horizontal",
            element: splitterA,
            container1: uiLeftContainer,
            container2: uiCenterContainer,
            minWidth: 100
        });

        // Configurações para o splitter B entre uiTopContainer e uiBottomContainer
        setSplitter({
            offsset: "vertical",
            element: splitterB,
            container1: uiTopContainer,
            container2: uiBottomContainer,
            minHeight: 100
        });

        // Configurações para o splitter C entre uiRightContainer e uiCenterContainer
        setSplitter({
            offsset: "horizontal",
            element: splitterC,
            container1: uiCenterContainer,
            container2: uiRightContainer,
            minWidth: 100
        });
    });
}

















// export function splitter() {
//     let startX;
//     let startWidthLeft, startWidthCenter, startWidthRight;

//     splitterA.addEventListener('mousedown', (e) => {
//         startX = e.clientX;
//         startWidthLeft = uiLeftContainer.offsetWidth;
//         startWidthCenter = uiCenterContainer.offsetWidth;
//         startWidthRight = uiRightContainer.offsetWidth;
//         document.addEventListener('mousemove', onMouseMoveA);
//         document.addEventListener('mouseup', onMouseUp);
//     });

//     splitterB.addEventListener('mousedown', (e) => {
//         startX = e.clientX;
//         startWidthCenter = uiCenterContainer.offsetHeight;
//         startWidthRight = uiRightContainer.offsetHeight;
//         document.addEventListener('mousemove', onMouseMoveB);
//         document.addEventListener('mouseup', onMouseUp);
//     });

//     splitterC.addEventListener('mousedown', (e) => {
//         startX = e.clientX;
//         startWidthRight = uiRightContainer.offsetWidth;
//         document.addEventListener('mousemove', onMouseMoveC);
//         document.addEventListener('mouseup', onMouseUp);
//     });

//     function onMouseMoveA(e) {
//         const offsetX = e.clientX - startX;
//         const newWidthLeft = startWidthLeft + offsetX;
//         const newWidthCenter = startWidthCenter - offsetX;
//         if (newWidthLeft > 0 && newWidthCenter > 0) {
//             uiLeftContainer.style.width = `${newWidthLeft}px`;
//             uiCenterContainer.style.width = `${newWidthCenter}px`;
//         }
//     }

//     function onMouseMoveB(e) {
//         const offsetX = e.clientX - startX;
//         const newWidthCenter = startWidthCenter + offsetX;
//         const newWidthRight = startWidthRight - offsetX;
//         if (newWidthCenter > 0 && newWidthRight > 0) {
//             uiCenterContainer.style.width = `${newWidthCenter}px`;
//             uiRightContainer.style.width = `${newWidthRight}px`;
//         }
//     }

//     function onMouseMoveC(e) {
//         const offsetX = e.clientX - startX;
//         const newWidthRight = startWidthRight - offsetX;
//         if (newWidthRight > 0) {
//             uiRightContainer.style.width = `${newWidthRight}px`;
//         }
//     }

//     function onMouseUp() {
//         document.removeEventListener('mousemove', onMouseMoveA);
//         document.removeEventListener('mousemove', onMouseMoveB);
//         document.removeEventListener('mousemove', onMouseMoveC);
//         document.removeEventListener('mouseup', onMouseUp);
//     }
// }
