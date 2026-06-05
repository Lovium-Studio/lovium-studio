
// ANIMATION : 

import { console } from "../console/console.js";
import { gui } from "../gui/gui.js";
import { contextMenu } from "../context-menu/context-menu.js";
import { IAnimationTrackOption } from "../../../typescript/types.js";

// SETUP :  

const ANIMATION_FPS : number = 10;
const NEEDLE_SNAP : number = 5;
const PRIMARY_COLOR : string = "--color-b";
const TRACK_UNACTIVE_ICON : string = "ri-add-fill";
const TRACK_ACTIVE_ICON : string = "ri-timer-line";

let ANIMATION_STATE : boolean = false; 
let NEEDLE_X : number = 0; 
let INTERVAL_ID : number | undefined = undefined;

export const timelineTab = () : void => {

    const playAnimationButtonIcon = gui.timelineTab.timelinePlayButton.getElementsByTagName("i")[0];
    const stopAnimationButtonIcon = gui.timelineTab.timelineStopButton.getElementsByTagName("i")[0];

    gui.timelineTab.timelineNeedle.addEventListener("mouseenter", function() {
        gui.timelineTab.timelinePreNeedle.style.display = "none";
    });   

    gui.timelineTab.timelineForwardAnimationButton.addEventListener("click", function() {
        NEEDLE_X += NEEDLE_SNAP;
        gui.timelineTab.timelineNeedle.style.left = `${NEEDLE_X}px`;
    });
    
    gui.timelineTab.timelineBackwardAnimationButton.addEventListener("click", function() {
        if (NEEDLE_X - NEEDLE_SNAP >= 0) {
            NEEDLE_X -= NEEDLE_SNAP;
            gui.timelineTab.timelineNeedle.style.left = `${NEEDLE_X}px`;
        }
    });

    gui.timelineTab.timelineRuler.addEventListener("mousemove", function(e) {
        
        let rect = gui.timelineTab.timelineRuler.getBoundingClientRect();
        let mouseX = e.clientX - rect.left;
        let newX = mouseX - (gui.timelineTab.timelinePreNeedle.offsetWidth / 2);
    
        if (newX < 0) {
            newX = 0;
        } else if (newX > (rect.width - gui.timelineTab.timelinePreNeedle.offsetWidth)) {
            newX = rect.width - gui.timelineTab.timelinePreNeedle.offsetWidth;
        };
    
        gui.timelineTab.timelinePreNeedle.style.left = `${newX}px`;
        gui.timelineTab.timelinePreNeedle.style.display = "flex";
    });

    gui.timelineTab.timelineRuler.addEventListener("click", function() {
        let newX = parseFloat(gui.timelineTab.timelinePreNeedle.style.left);
        gui.timelineTab.timelineNeedle.style.left = `${newX}px`;
        NEEDLE_X = newX;
    });
    
    gui.timelineTab.timelineRuler.addEventListener("mouseleave", function() {
        gui.timelineTab.timelinePreNeedle.style.display = "none";
    });

    const playAnimation = (state : boolean) : void =>  {

        if (state) {


            INTERVAL_ID = setInterval(() => { 
 
                NEEDLE_X++;
                gui.timelineTab.timelineNeedle.style.left = `${NEEDLE_X}px`;
                console(`Animation Frame ${NEEDLE_X}F`, "LOG");

                if (NEEDLE_X >= gui.timelineTab.timelineRuler.offsetWidth) {
                    NEEDLE_X = 0;
                    gui.timelineTab.timelineNeedle.style.left = "0px";
                };

            }, ANIMATION_FPS);

        } else {
            clearInterval(INTERVAL_ID);
        };
    };

    gui.timelineTab.timelineStopButton.addEventListener("click", function() {
        NEEDLE_X = 0;
        gui.timelineTab.timelineNeedle.style.left = "0px";
        clearInterval(INTERVAL_ID);
        ANIMATION_STATE = false;
        playAnimationButtonIcon.className = "ri-play-circle-fill";
    });

    gui.timelineTab.timelinePlayButton.addEventListener("click", function() {

        ANIMATION_STATE = !ANIMATION_STATE;

        playAnimation(ANIMATION_STATE);  
        if (ANIMATION_STATE) { 
            playAnimationButtonIcon.className = "ri-pause-circle-fill";
            console("animação pausada", "LOG");
        } else {
            playAnimationButtonIcon.className = "ri-play-circle-fill";
        };
    });

    const dragNeedle = (event : MouseEvent) : void => {

        event.preventDefault();

        let shiftX = event.clientX - gui.timelineTab.timelineNeedle.getBoundingClientRect().left;

        const moveAt = (pageX : number) : void => {

            let newLeft = pageX - shiftX - gui.timelineTab.timelineRuler.getBoundingClientRect().left;

            if (newLeft < 0) {
                newLeft = 0;
            } else if (newLeft > gui.timelineTab.timelineRuler.offsetWidth - gui.timelineTab.timelineNeedle.offsetWidth) {
                newLeft = gui.timelineTab.timelineRuler.offsetWidth - gui.timelineTab.timelineNeedle.offsetWidth;
            };

            gui.timelineTab.timelineNeedle.style.left = newLeft + 'px';
            NEEDLE_X = newLeft;  
        };

        const onMouseMove = (event : MouseEvent ) : void => {
            moveAt(event.pageX);
        };

        document.addEventListener('mousemove', onMouseMove);

        document.addEventListener('mouseup', function() {
            document.removeEventListener('mousemove', onMouseMove);
        }, { once: true });
    };

    gui.timelineTab.timelineNeedle.addEventListener('mousedown', dragNeedle);

    gui.timelineTab.timelineNeedle.ondragstart = function() {
        return false; 
    };
};

const loadAnimation = ( trackList : IAnimationTrackOption[] ) : void => {

    trackList.forEach(track => { 
        
        const timelineTrackerGroup = track.tweenList;

        const trackType = track.type;
        const trackLock = track.locked;
        const trackVisible = track.active;
        const trackId = track.id;
        const trackLabel = track.label;

        let trackVisibleState = true;

        // TRACK CONTROL : 

        const timelineTrackerRow = document.createElement("div");
        timelineTrackerRow.classList.add("timeline-track-row", "timeline-tracker-row");

        const timelineTrackRow = document.createElement("div");
        timelineTrackRow.classList.add("timeline-track-row");

        const timelineTrackControl = document.createElement("div");
        timelineTrackControl.classList.add("timeline-tracker-control");

        const timelineTrackControlName = document.createElement("span");
        timelineTrackControlName.classList.add("tracker-control-name");
        timelineTrackControlName.textContent = trackLabel;

        const timelineTrackLockButton = document.createElement("button");
        const timelineTrackDeleteButton = document.createElement("button");
        const timelineTrackVisibleButton = document.createElement("button");
        const timelineTrackAddButton = document.createElement("button");
        const timelineTrackSettingsButton = document.createElement("button")

        const timelineTrackLockButtonIcon = document.createElement("i");
        timelineTrackLockButtonIcon.classList.add("ri-lock-fill");

        const timelineTrackDeleteButtonIcon = document.createElement("i");
        timelineTrackDeleteButtonIcon.classList.add("ri-indeterminate-circle-fill");
 
        const timelineTrackVisibleButtonIcon = document.createElement("i");
        timelineTrackVisibleButtonIcon.classList.add("ri-eye-fill"); 
  
        const timelineTrackSettingsButtonIcon = document.createElement("i");
        timelineTrackSettingsButtonIcon.classList.add("ri-settings-4-fill");

        const timelineTrackAddButtonIcon = document.createElement("i");
        timelineTrackAddButtonIcon.classList.add("ri-add-circle-fill");

        timelineTrackSettingsButton.appendChild(timelineTrackSettingsButtonIcon);
        timelineTrackLockButton.appendChild(timelineTrackLockButtonIcon);
        timelineTrackDeleteButton.appendChild(timelineTrackDeleteButtonIcon);
        timelineTrackVisibleButton.appendChild(timelineTrackVisibleButtonIcon);
        timelineTrackAddButton.appendChild(timelineTrackAddButtonIcon);
        // timelineTrackControl.appendChild(timelineTrackSettingsButton);
        // timelineTrackControl.appendChild(timelineTrackLockButton);
        timelineTrackControl.appendChild(timelineTrackDeleteButton);
        timelineTrackControl.appendChild(timelineTrackVisibleButton); 
        timelineTrackControl.appendChild(timelineTrackAddButton);
        timelineTrackControl.appendChild(timelineTrackControlName);
        timelineTrackRow.appendChild(timelineTrackControl);

        gui.timelineTab.timelineTrackControlContainer.appendChild(timelineTrackRow)

        timelineTrackerGroup.forEach(trackerData => { 
            
            const trackerName = trackerData.label;
            const trackerStart = trackerData.start;
            const trackerEnd = trackerData.end;
            const trackerStartValue = trackerData.from;
            const trackerEndValue = trackerData.to;

            // TRACKER :  

            const tracker = document.createElement("div");
            tracker.classList.add("tracker");
            tracker.style.left = `${trackerStart}px`;
            tracker.style.width = `${trackerEnd}px`;

            const trackerHandleLeft = document.createElement("div");
            trackerHandleLeft.classList.add("left-tracker-handle", "tracker-handle");

            const trackerHandleRight = document.createElement("div");
            trackerHandleRight.classList.add("right-tracker-handle", "tracker-handle");

            const trackerHandleLeftIndicator = document.createElement("div");
            trackerHandleLeftIndicator.classList.add("tracker-handle-indicator");

            const trackerHandleRightIndicator = document.createElement("div");
            trackerHandleRightIndicator.classList.add("tracker-handle-indicator");

            const trackerBody = document.createElement("div"); // Alterado para 'div' caso 'tracker-body' não seja um elemento customizado
            trackerBody.classList.add("tracker-body");  

            const trackerInputContainer = document.createElement("div"); // Alterado para 'div' caso 'tracker-valuer-container' não seja um elemento customizado
            trackerInputContainer.classList.add("tracker-valuer-container");

            const trackerNameInput = document.createElement("input"); 
            trackerNameInput.classList.add("tracker-name");
            trackerNameInput.spellcheck = false;
            trackerNameInput.value = `${trackerName}`;

            const trackerStartPointContainer = document.createElement("div");
            trackerStartPointContainer.classList.add("tracker-start-point-container");

            const trackerStartPointIcon = document.createElement("i");
            trackerStartPointIcon.className = TRACK_UNACTIVE_ICON; 

            const trackerEndPointContainer = document.createElement("div");
            trackerEndPointContainer.classList.add("tracker-end-point-container");

            const trackerEndPointIcon = document.createElement("i");
            trackerEndPointIcon.className = TRACK_UNACTIVE_ICON; 
 
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
            timelineTrackerRow.appendChild(tracker);
            gui.timelineTab.timelineTrackContainer.appendChild(timelineTrackerRow)

            let startPointState = false;
            let endPointState = false;

            trackerStartPointContainer.addEventListener("click",function(){

                startPointState = !startPointState; 

                if(startPointState){
                    trackerStartPointIcon.className = `${TRACK_ACTIVE_ICON}`;
                    // trackerStartPointIcon.style.color = TrackerColor.green;
                    console(`Tracker '${trackerName}' Start point Added`,"LOG");
                }else{
                    trackerStartPointIcon.className = `${TRACK_UNACTIVE_ICON}`;
                    // trackerStartPointIcon.style.color = "";
                    console(`Tracker '${trackerName}' Start point Removed`,"LOG");
                }


            }); 

            trackerEndPointContainer.addEventListener("click",function(){

                endPointState = !endPointState; 

                if(endPointState){
                    trackerEndPointIcon.className = `${TRACK_ACTIVE_ICON}`;
                    // trackerEndPointIcon.style.color = TrackerColor.green;
                    console(`Tracker '${trackerName}' End point Added`,"LOG");
                }else{ 
                    trackerEndPointIcon.className = `${TRACK_UNACTIVE_ICON}`;
                    // trackerEndPointIcon.style.color = "";
                    console(`Tracker '${trackerName}' End point Removed`,"LOG");
                }

            }); 

            const trackerUpdateName = (newName : string ) : void => {
                trackerData.label = newName;
            };

            trackerNameInput.addEventListener("input",function(){
                trackerUpdateName(trackerNameInput.value);
                console(trackerNameInput.value);
            });
            

            

            function trackerHandleContextMenu(e : MouseEvent) {

                e.preventDefault(); 
                
                const contextTemplatee = [
                    {
                        label: "Delete",
                        id: "deleteTrackMenu",
                        icon: "ri-delete-bin-6-fill",
                        divisor : true
                    },
                    {
                        label: "Duplicate Left",
                        id: "trt",
                        icon: "ri-expand-left-fill",
                        divisor : false
                    },
                    {
                        label: "Duplicate Right",
                        id: "trt",
                        icon: "ri-expand-right-fill",
                        divisor : true
                    },
                    {
                        label: "Lock",
                        id: "trt",
                        icon: "ri-lock-fill",
                        divisor : false
                    }
                ];
            
                contextMenu(contextTemplatee,e);

                // const deleteTrackMenu = getUi("deleteTrackMenu");
                // deleteTrackMenu.addEventListener("click",deleteTracker)

                function deleteTracker(){
                    tracker.remove();
                    console(`Tracker '${trackerName}' is Deleted`,"LOG");
                }

            } 
            
            tracker.addEventListener("contextmenu", trackerHandleContextMenu);
            
        });
    });
};


const simpleAnimation : IAnimationTrackOption[] = [
    {
        type : "TRANSLATE_X",
        label : "Translate X",
        locked : false,
        active : true,
        id : "track_001",
        tweenList : [
            {
                label : "Move Right",
                start : 50,
                end : 200,
                id : "tween_001",
                from : 0,
                to : 500
            },
            {
                label : "Move Left",
                start : 300,
                end : 150,
                id : "tween_002",
                from : 500,
                to : 100
            }
        ]
    },

    {
        type : "TRANSLATE_Y",
        label : "Translate Y",
        locked : false,
        active : true,
        id : "track_002",
        tweenList : [
            {
                label : "Fall",
                start : 120,
                end : 250,
                id : "tween_003",
                from : 0,
                to : 300
            },
            {
                label : "Jump",
                start : 450,
                end : 100,
                id : "tween_004",
                from : 300,
                to : 50
            }
        ]
    },

    {
        type : "ROTATE",
        label : "Rotation",
        locked : false,
        active : true,
        id : "track_003",
        tweenList : [
            {
                label : "Rotate Clockwise",
                start : 80,
                end : 180,
                id : "tween_005",
                from : 0,
                to : 180
            },
            {
                label : "Rotate Back",
                start : 350,
                end : 180,
                id : "tween_006",
                from : 180,
                to : 0
            }
        ]
    },

    {
        type : "SCALE",
        label : "Scale",
        locked : false,
        active : true,
        id : "track_004",
        tweenList : [
            {
                label : "Grow",
                start : 200,
                end : 220,
                id : "tween_007",
                from : 1,
                to : 2
            },
            {
                label : "Shrink",
                start : 500,
                end : 180,
                id : "tween_008",
                from : 2,
                to : 1
            }
        ]
    },

    {
        type : "OPACITY",
        label : "Opacity",
        locked : false,
        active : true,
        id : "track_005",
        tweenList : [
            {
                label : "Fade In",
                start : 20,
                end : 150,
                id : "tween_009",
                from : 0, 
                to : 1
            },
            {
                label : "Fade Out",
                start : 650,
                end : 200,
                id : "tween_010",
                from : 1,
                to : 0
            }
        ]
    }
];

loadAnimation(simpleAnimation);


function doubleScroll(containerA : HTMLDivElement , containerB : HTMLDivElement) {
    containerB.addEventListener('scroll', () => {
        containerA.scrollTop = containerB.scrollTop;
    });

    containerA.addEventListener('scroll', () => {
        containerB.scrollTop = containerA.scrollTop; 
    });
};

doubleScroll(gui.timelineTab.timelineTrackControlContainer,gui.timelineTab.timelineTrackContainer)
      