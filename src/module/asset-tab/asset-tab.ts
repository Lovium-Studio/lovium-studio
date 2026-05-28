








// ASSET TAB:

import { getUi } from "../get-ui/get-ui.js";

export function assetTab() {
    function simpleFileViewer() {
        const simplePreviewContainer = getUi("simple-preview-container");
        const simpleImagePreview = getUi("simple-image-preview");
        const simplePreviewContainerZoomArea = getUi("simple-preview-container-zoom-area");

        let zoomState = false;
        let zoomScale = 1; // Fator de zoom inicial

        function updateZoomAreaPosition(e) {
            const containerRect = simplePreviewContainer.getBoundingClientRect();
            const mouseX = e.clientX - containerRect.left;
            const mouseY = e.clientY - containerRect.top;
            const zoomAreaWidth = simplePreviewContainerZoomArea.offsetWidth;
            const zoomAreaHeight = simplePreviewContainerZoomArea.offsetHeight;

            simplePreviewContainerZoomArea.style.left = `${Math.max(0, Math.min(mouseX - (zoomAreaWidth / 2), containerRect.width - zoomAreaWidth))}px`;
            simplePreviewContainerZoomArea.style.top = `${Math.max(0, Math.min(mouseY - (zoomAreaHeight / 2), containerRect.height - zoomAreaHeight))}px`;
        }

        function zoomToPosition(e) {
            if (zoomState) {
                const mouseX = e.clientX;
                const mouseY = e.clientY;

                simpleImagePreview.style.left = `${-mouseX + simpleImagePreview.offsetWidth / 2}px`;
                simpleImagePreview.style.top = `${-mouseY + simpleImagePreview.offsetHeight / 2}px`;
            }
        }

        simplePreviewContainer.addEventListener("click", function(e) {
            zoomState = !zoomState;

            if (zoomState) {
                simpleImagePreview.style.height = "135%";
                simpleImagePreview.style.cursor = "zoom-out";
                zoomToPosition(e);  // A imagem segue o mouse ao clicar para fazer zoom
            } else {
                simpleImagePreview.style.height = "";
                simpleImagePreview.style.cursor = "";
                simpleImagePreview.style.left = "auto";
                simpleImagePreview.style.top = "auto";
            }
        });

        simplePreviewContainer.addEventListener("mousemove", function(e) {
            if (zoomState) {
                zoomToPosition(e);
            }
        });

        simplePreviewContainer.addEventListener("wheel", function(e) {
            if (zoomState) {
                const zoomSpeed = 0.1;
                const delta = Math.sign(e.deltaY);
                zoomScale = Math.max(0.5, Math.min(2, zoomScale - delta * zoomSpeed));

                const containerWidth = simplePreviewContainer.offsetWidth;
                const containerHeight = simplePreviewContainer.offsetHeight;

                const zoomAreaWidth = Math.min(containerWidth, containerWidth * zoomScale);
                const zoomAreaHeight = Math.min(containerHeight, containerHeight * zoomScale);

                // Limitar o tamanho da área de zoom ao tamanho do contêiner
                simplePreviewContainerZoomArea.style.width = `${Math.min(containerWidth, zoomAreaWidth)}px`;
                simplePreviewContainerZoomArea.style.height = `${Math.min(containerHeight, zoomAreaHeight)}px`;

                updateZoomAreaPosition(e);  // Atualiza a posição da área de zoom
            }
        });

        simplePreviewContainer.addEventListener("mouseleave", function() {
            if (zoomState) {
                simplePreviewContainerZoomArea.style.left = "";
                simplePreviewContainerZoomArea.style.top = "";
                simplePreviewContainerZoomArea.style.width = "";
                simplePreviewContainerZoomArea.style.height = "";
            }
        });
    }

    simpleFileViewer();
}








