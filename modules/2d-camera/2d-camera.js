













// 2D CAMERA : 

import { getUi } from "../get-ui/get-ui.js";
import { resizeHandle } from "../resize-handle/resize-handle.js";
import { console } from "../console/console.js";

const cameraTemplate = [
    {
        name: "camera_test_1",
        width: 300,
        height: 100,
        x: 0,
        y: 0,
        color: "inc_pink",
        id: "camera1"
    },
    {
        name: "camera_test_2",
        width: 500,
        height: 100,
        x: 100,
        y: 100,
        color: "inc_pink",
        id: "camera2"
    },
    {
        name: "camera_test_3",
        width: 300,
        height: 100,
        x: 300, 
        y: 40,
        color: "inc_pink",
        id: "camera3"
    }
];

const cameraViewCameraIcon = "ri-video-on-fill";
const cameraviewSettingsIcon = "ri-settings-4-fill";

export function twoDCamera() {
    const viewportUI = getUi("viewport-ui");

    function createCamera(cameraArray) {
        cameraArray.forEach(camera => {
            
            const cameraviewContainer = document.createElement("div");
            cameraviewContainer.classList.add("camera-view-container");
            cameraviewContainer.id = camera.id;

            const cameraViewMenuContainer = document.createElement("div");
            cameraViewMenuContainer.classList.add("camera-view-menu-container");

            const cameraViewTitleContainer = document.createElement("div");
            cameraViewTitleContainer.classList.add("camera-view-title-container");

            const cameraViewIcon = document.createElement("i");
            cameraViewIcon.classList.add(cameraViewCameraIcon);

            const cameraViewName = document.createElement("span");
            cameraViewName.textContent = camera.name;

            const cameraViewSettingsContainer = document.createElement("div");
            cameraViewSettingsContainer.classList.add("camera-view-setting-container");

            const cameraViewSize = document.createElement("span");
            cameraViewSize.textContent = `${camera.width}x${camera.height}`;
 
            const cameraViewSettingsButton = document.createElement("i");
            cameraViewSettingsButton.classList.add(cameraviewSettingsIcon);

            const cameraView = document.createElement("div");
            cameraView.classList.add("camera-view");

            cameraViewSettingsContainer.appendChild(cameraViewSize);
            cameraViewSettingsContainer.appendChild(cameraViewSettingsButton);
            cameraViewTitleContainer.appendChild(cameraViewIcon);
            cameraViewTitleContainer.appendChild(cameraViewName);
            cameraViewMenuContainer.appendChild(cameraViewTitleContainer);
            cameraViewMenuContainer.appendChild(cameraViewSettingsContainer);
            cameraviewContainer.appendChild(cameraViewMenuContainer);
            cameraviewContainer.appendChild(cameraView);
            viewportUI.appendChild(cameraviewContainer);

            cameraviewContainer.style.width = `${camera.width}px`;
            cameraviewContainer.style.height = `${camera.height}px`;
            cameraviewContainer.style.top = `${camera.y}px`;
            cameraviewContainer.style.left = `${camera.x}px`;

            cameraViewMenuContainer.addEventListener("click", function () {
                const cameraHandle = {
                    format: "objectArray",
                    x: cameraviewContainer.offsetLeft,
                    y: cameraviewContainer.offsetTop + 23,
                    width: cameraviewContainer.offsetWidth - 2,
                    height: cameraviewContainer.offsetHeight - 25,
                    type: "camera",
                    rotate: false,
                    element: cameraviewContainer
                }; 

                resizeHandle(cameraHandle);
            });

        });
    }

    

    createCamera(cameraTemplate);
}

