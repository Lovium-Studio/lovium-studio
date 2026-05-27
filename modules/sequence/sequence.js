












// SEQUENCE : 

import { getUi } from "../get-ui/get-ui.js";
import { console } from "../console/console.js";
import { contextMenu } from "../context-menu/context-menu.js";

const TrackerColor = {
    red : "#A71919",
    purple : "#4a0472",
    yeallow : "#bf8e24",
    green : "#00ba32"
}

const sequenceDataTest = [
    {
        type : "Translation",       
        time : "",
        lock : false,
        visible : true,
        color : "#1E1E1E",
        id : "4544",
        trackerGroup : [
            {
                name : "Tracker Title",
                start : 0,
                end : 200,
                startValue : "43",
                endValue : "50",
                id : "44343"
            },
            {
                name : "Tracker Title",
                start : 410,
                end : 200,
                startValue : "43434",
                endValue : "4343",
                id : "44343" 
            }
        ]
    },
    {
        type : "Color", 
        time : "",
        lock : false,
        visible : true,
        color : TrackerColor.purple,
        id : "4544",
        trackerGroup : [
            {
                name : "Tracker Title",
                start : 0,
                end : 200,
                startValue : "43434",
                endValue : "4343",
                id : "44343"
            },
            {
                name : "Tracker Title",
                start : 210,
                end : 200,
                startValue : "43434",
                endValue : "4343",
                id : "44343"
            }
        ]
    },
    ,
    {
        type : "Color", 
        time : "",
        lock : false,
        visible : true,
        color : "#1E1E1E",
        id : "4544",
        trackerGroup : [
            {
                name : "Tracker Title",
                start : 0,
                end : 200,
                startValue : "43434",
                endValue : "4343",
                id : "44343"
            }
        ]
    },
    ,
    {
        type : "Color", 
        time : "",
        lock : false,
        visible : true,
        color : "#1E1E1E",
        id : "4544",
        trackerGroup : [
            {
                name : "Tracker Title",
                start : 0,
                end : 200,
                startValue : "43434",
                endValue : "4343",
                id : "44343"
            }
        ]
    },
    ,
    {
        type : "Color", 
        time : "",
        lock : false,
        visible : true,
        color : "#1E1E1E",
        id : "4544",
        trackerGroup : [
            {
                name : "Tracker Title",
                start : 0,
                end : 200,
                startValue : "43434",
                endValue : "4343",
                id : "44343"
            }
        ]
    },
    ,
    {
        type : "Color", 
        time : "",
        lock : false,
        visible : true,
        color : "#1E1E1E",
        id : "4544",
        trackerGroup : [
            {
                name : "Tracker Title",
                start : 10,
                end : 400,
                startValue : "43434",
                endValue : "4343",
                id : "44343"
            }
        ]
    },
    ,
    {
        type : "Color", 
        time : "",
        lock : false,
        visible : true,
        color : "#1E1E1E",
        id : "4544",
        trackerGroup : [
            {
                name : "Tracker 01",
                start : 0,
                end : 200,
                startValue : "43434",
                endValue : "4343",
                id : "44343"
            }
        ]
    },
    {
        type : "Color", 
        time : "",
        lock : false,
        visible : true,
        color : "#1E1E1E",
        id : "4544",
        trackerGroup : [
            {
                name : "Animation",
                start : 0,
                end : 200,
                startValue : "43434",
                endValue : "4343",
                id : "44343"
            }
        ]
    } 
];


export function sequence(sequenceData = sequenceDataTest) {

    const sequenceControlContainer = getUi("sequence-control-container");
    const sequenceTrackerContainer = getUi("sequence-tracker-container");
    
    const sequenceStaticTrackerRow = getUi("sequence-static-tracker-row");
    const sequenceStaticTrackRow = getUi("sequence-static-track-row");

    const trackerPointUnselect = "ri-add-fill";
    const trackerPointSelected = "ri-timer-line";

    sequenceData.forEach(trackData => { 
        
        const sequenceTrackerGroup = trackData.trackerGroup;

        const trackColor = trackData.color;
        const trackType = trackData.type;
        const trackLock = trackData.lock;
        const trackVisible = trackData.visible;
        const trackId = trackData.id;
        const trackTime = trackData.time;

        let trackVisibleState = true;

        // TRACK CONTROL : 

        const sequenceTrackerRow = document.createElement("div");
        sequenceTrackerRow.classList.add("timeline-track-row", "timeline-tracker-row");

        const sequenceTrackRow = document.createElement("div");
        sequenceTrackRow.classList.add("timeline-track-row");

        const sequenceTrackControl = document.createElement("div");
        sequenceTrackControl.classList.add("timeline-tracker-control");

        const sequenceTrackControlName = document.createElement("span");
        sequenceTrackControlName.classList.add("tracker-control-name");
        sequenceTrackControlName.textContent = trackType;

        const sequenceTrackLockButton = document.createElement("button");
        const sequenceTrackDeleteButton = document.createElement("button");
        const sequenceTrackVisibleButton = document.createElement("button");
        const sequenceTrackAddButton = document.createElement("button");
        const sequenceTrackSettingsButton = document.createElement("button")

        const sequenceTrackLockButtonIcon = document.createElement("i");
        sequenceTrackLockButtonIcon.classList.add("ri-lock-fill");

        const sequenceTrackDeleteButtonIcon = document.createElement("i");
        sequenceTrackDeleteButtonIcon.classList.add("ri-delete-bin-fill");

        const sequenceTrackVisibleButtonIcon = document.createElement("i");
        sequenceTrackVisibleButtonIcon.classList.add("ri-eye-fill");

        const sequenceTrackSettingsButtonIcon = document.createElement("i");
        sequenceTrackSettingsButtonIcon.classList.add("ri-settings-4-fill");

        const sequenceTrackAddButtonIcon = document.createElement("i");
        sequenceTrackAddButtonIcon.classList.add("ri-add-large-fill");

        sequenceTrackSettingsButton.appendChild(sequenceTrackSettingsButtonIcon);
        sequenceTrackLockButton.appendChild(sequenceTrackLockButtonIcon);
        sequenceTrackDeleteButton.appendChild(sequenceTrackDeleteButtonIcon);
        sequenceTrackVisibleButton.appendChild(sequenceTrackVisibleButtonIcon);
        sequenceTrackAddButton.appendChild(sequenceTrackAddButtonIcon);
        sequenceTrackControl.appendChild(sequenceTrackSettingsButton);
        sequenceTrackControl.appendChild(sequenceTrackLockButton);
        sequenceTrackControl.appendChild(sequenceTrackDeleteButton);
        sequenceTrackControl.appendChild(sequenceTrackVisibleButton);
        sequenceTrackControl.appendChild(sequenceTrackAddButton);
        sequenceTrackControl.appendChild(sequenceTrackControlName);
        sequenceTrackRow.appendChild(sequenceTrackControl);
        sequenceControlContainer.insertBefore(sequenceTrackRow,sequenceStaticTrackRow);

        sequenceTrackLockButton.addEventListener("click",function(){

            trackVisibleState = !trackVisibleState;

            trackerHide(trackVisibleState)

            // const getAllTrackers = document.querySelectorAll(".tracker");

            // if (trackVisibleState){
            //     getAllTrackers.forEach(trackers =>{
            //         trackers.style.opacity = "50%";
            //     })
            // }
        });

        sequenceTrackerGroup.forEach(trackerData => { 
            
            const trackerName = trackerData.name;
            const trackerStart = trackerData.start;
            const trackerEnd = trackerData.end;
            const trackerStartValue = trackerData.startValue;
            const trackerEndValue = trackerData.endValue;

            // TRACKER :  

            const tracker = document.createElement("div");
            tracker.classList.add("tracker");
            tracker.style.left = `${trackerStart}px`;
            tracker.style.width = `${trackerEnd}px`;
            tracker.style.background = `${trackColor}`;

            const trackerHandleLeft = document.createElement("div");
            trackerHandleLeft.classList.add("left-tracker-handle", "tracker-handle");

            const trackerHandleRight = document.createElement("div");
            trackerHandleRight.classList.add("right-tracker-handle", "tracker-handle");

            const trackerHandleLeftIndicator = document.createElement("div");
            trackerHandleLeftIndicator.classList.add("tracker-handle-indicator");
            trackerHandleLeftIndicator.style.background = `${trackColor}`;

            const trackerHandleRightIndicator = document.createElement("div");
            trackerHandleRightIndicator.classList.add("tracker-handle-indicator");
            trackerHandleRightIndicator.style.background = `${trackColor}`;

            const trackerBody = document.createElement("div"); // Alterado para 'div' caso 'tracker-body' não seja um elemento customizado
            trackerBody.classList.add("tracker-body");  

            const trackerInputContainer = document.createElement("div"); // Alterado para 'div' caso 'tracker-valuer-container' não seja um elemento customizado
            trackerInputContainer.classList.add("tracker-valuer-container");
            trackerInputContainer.style.borderColor = `${trackColor}`;

            const trackerNameInput = document.createElement("input");
            trackerNameInput.classList.add("tracker-name");
            trackerNameInput.value = `${trackerName}`;

            const trackerStartPointContainer = document.createElement("div");
            trackerStartPointContainer.classList.add("tracker-start-point-container");

            const trackerStartPointIcon = document.createElement("i");
            trackerStartPointIcon.className = trackerPointUnselect;

            const trackerEndPointContainer = document.createElement("div");
            trackerEndPointContainer.classList.add("tracker-end-point-container");

            const trackerEndPointIcon = document.createElement("i");
            trackerEndPointIcon.className = trackerPointUnselect;
 
            trackerStartPointContainer.appendChild(trackerStartPointIcon);
            trackerEndPointContainer.appendChild(trackerEndPointIcon);
            trackerInputContainer.appendChild(trackerNameInput);
            trackerInputContainer.appendChild(trackerStartPointContainer);
            trackerInputContainer.appendChild(trackerEndPointContainer);
            trackerBody.appendChild(trackerInputContainer);
            trackerHandleLeft.appendChild(trackerHandleLeftIndicator);
            trackerHandleRight.appendChild(trackerHandleRightIndicator);
            tracker.appendChild(trackerHandleLeft);
            tracker.appendChild(trackerBody);
            tracker.appendChild(trackerHandleRight);
            sequenceTrackerRow.appendChild(tracker);
            sequenceTrackerContainer.insertBefore(sequenceTrackerRow,sequenceStaticTrackerRow);

            let startPointState = false;
            let endPointState = false;

            trackerStartPointContainer.addEventListener("click",function(){

                startPointState = !startPointState; 

                if(startPointState){
                    trackerStartPointIcon.className = `${trackerPointSelected}`;
                    // trackerStartPointIcon.style.color = TrackerColor.green;
                    console(`Tracker '${trackerName}' Start point Added`,"success");
                }else{
                    trackerStartPointIcon.className = `${trackerPointUnselect}`;
                    // trackerStartPointIcon.style.color = "";
                    console(`Tracker '${trackerName}' Start point Removed`,"success");
                }


            }); 

            trackerEndPointContainer.addEventListener("click",function(){

                endPointState = !endPointState; 

                if(endPointState){
                    trackerEndPointIcon.className = `${trackerPointSelected}`;
                    // trackerEndPointIcon.style.color = TrackerColor.green;
                    console(`Tracker '${trackerName}' End point Added`,"success");
                }else{ 
                    trackerEndPointIcon.className = `${trackerPointUnselect}`;
                    // trackerEndPointIcon.style.color = "";
                    console(`Tracker '${trackerName}' End point Removed`,"success");
                }

            }); 

            function trackerHide(state){
                if(state){
                    tracker.style.display = "none";
                }else{
                    tracker.style.display = "flex";
                }
            }

            function trackerUpdateName(newName){
                trackerData.name = newName;
            }

            trackerNameInput.addEventListener("input",function(){
                trackerUpdateName(trackerNameInput.value);
                console(trackerNameInput.value);
            });

            trackerHandleLeft.addEventListener("mousedown",function(){
                trackerHandleLeftIndicator.style.background = "#111111";
            })

            document.addEventListener("mouseup",function(){
                trackerHandleLeftIndicator.style.background = `${trackColor}`;
            })

            trackerHandleRight.addEventListener("mousedown",function(){
                trackerHandleRightIndicator.style.background = "#111111"
            })

            document.addEventListener("mouseup",function(){
                trackerHandleRightIndicator.style.background = `${trackColor}`;
            })

            function trackerHandleContextMenu(e) {
                e.preventDefault(); // Previne o menu de contexto padrão do navegador
                
                const contextTemplatee = [
                    {
                        name: "Delete",
                        id: "deleteTrackMenu",
                        icon: "ri-delete-bin-6-fill",
                        divisor : true
                    },
                    {
                        name: "Duplicate Left",
                        id: "trt",
                        icon: "ri-expand-left-fill",
                        divisor : false
                    },
                    {
                        name: "Duplicate Right",
                        id: "trt",
                        icon: "ri-expand-right-fill",
                        divisor : true
                    },
                    {
                        name: "Lock",
                        id: "trt",
                        icon: "ri-lock-fill",
                        divisor : false
                    }
                ];
            
                contextMenu(contextTemplatee,event);

                const deleteTrackMenu = getUi("deleteTrackMenu");
                deleteTrackMenu.addEventListener("click",deleteTracker)

                function deleteTracker(){
                    tracker.remove();
                    console(`Tracker '${trackerName}' is Deleted`,"success");
                }

            } 
            
            tracker.addEventListener("contextmenu", trackerHandleContextMenu);
            
        });
    });

    function doubleScroll(containerA, containerB) {
        containerB.addEventListener('scroll', () => {
            containerA.scrollTop = containerB.scrollTop;
        });
    
        containerA.addEventListener('scroll', () => {
            containerB.scrollTop = containerA.scrollTop;
        });
    }

    doubleScroll(sequenceControlContainer,sequenceTrackerContainer)
    
}
