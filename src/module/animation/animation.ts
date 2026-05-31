
// ANIMATION : 

import { console } from "../console/console.js";
import { gui } from "../gui/gui.js";

// SETUP :  

const ANIMATION_FPS : number = 10;
const NEEDLE_SNAP : number = 5;
const PRIMARY_COLOR : string = "--pink-color";

let ANIMATION_STATE : boolean = false; 
let NEEDLE_X : number = 0; 
let INTERVAL_ID : number | undefined = undefined;

export const animation = () : void => {

    const playAnimationButtonIcon = gui.sequenceTab.sequencePlayButton.getElementsByTagName("i")[0];
    const stopAnimationButtonIcon = gui.sequenceTab.sequenceStopButton.getElementsByTagName("i")[0];

    gui.sequenceTab.sequenceNeedle.addEventListener("mouseenter", function() {
        gui.sequenceTab.sequencePreNeedle.style.display = "none";
    });

    gui.sequenceTab.sequenceForwardAnimationButton.addEventListener("click", function() {
        NEEDLE_X += NEEDLE_SNAP;
        gui.sequenceTab.sequenceNeedle.style.left = `${NEEDLE_X}px`;
    });
    
    gui.sequenceTab.sequenceBackwardAnimationButton.addEventListener("click", function() {
        if (NEEDLE_X - NEEDLE_SNAP >= 0) {
            NEEDLE_X -= NEEDLE_SNAP;
            gui.sequenceTab.sequenceNeedle.style.left = `${NEEDLE_X}px`;
        }
    });

    gui.sequenceTab.sequenceRuler.addEventListener("mousemove", function(e) {
        
        let rect = gui.sequenceTab.sequenceRuler.getBoundingClientRect();
        let mouseX = e.clientX - rect.left;
        let newX = mouseX - (gui.sequenceTab.sequencePreNeedle.offsetWidth / 2);
    
        if (newX < 0) {
            newX = 0;
        } else if (newX > (rect.width - gui.sequenceTab.sequencePreNeedle.offsetWidth)) {
            newX = rect.width - gui.sequenceTab.sequencePreNeedle.offsetWidth;
        };
    
        gui.sequenceTab.sequencePreNeedle.style.left = `${newX}px`;
        gui.sequenceTab.sequencePreNeedle.style.display = "flex";
    });

    gui.sequenceTab.sequenceRuler.addEventListener("click", function() {
        let newX = parseFloat(gui.sequenceTab.sequencePreNeedle.style.left);
        gui.sequenceTab.sequenceNeedle.style.left = `${newX}px`;
        NEEDLE_X = newX;
    });
    
    gui.sequenceTab.sequenceRuler.addEventListener("mouseleave", function() {
        gui.sequenceTab.sequencePreNeedle.style.display = "none";
    });

    const playAnimation = (state : boolean) : void =>  {

        if (state) {

            stopAnimationButtonIcon.style.color = "#A71919";

            INTERVAL_ID = setInterval(() => {

                NEEDLE_X++;
                gui.sequenceTab.sequenceNeedle.style.left = `${NEEDLE_X}px`;
                console(`Animation Frame ${NEEDLE_X}F`, "log");

                if (NEEDLE_X >= gui.sequenceTab.sequenceRuler.offsetWidth) {
                    NEEDLE_X = 0;
                    gui.sequenceTab.sequenceNeedle.style.left = "0px";
                };

            }, ANIMATION_FPS);

        } else {
            clearInterval(INTERVAL_ID);
            stopAnimationButtonIcon.style.color = "";
        };
    };

    gui.sequenceTab.sequenceStopButton.addEventListener("click", function() {
        NEEDLE_X = 0;
        gui.sequenceTab.sequenceNeedle.style.left = "0px";
        stopAnimationButtonIcon.style.color = "";
        clearInterval(INTERVAL_ID);
        ANIMATION_STATE = false;
        playAnimationButtonIcon.className = "ri-play-fill";
        playAnimationButtonIcon.style.color = "";
    });

    gui.sequenceTab.sequencePlayButton.addEventListener("click", function() {
        ANIMATION_STATE = !ANIMATION_STATE;
        playAnimation(ANIMATION_STATE);
        if (ANIMATION_STATE) {
            playAnimationButtonIcon.style.color = PRIMARY_COLOR;
            playAnimationButtonIcon.className = "ri-pause-mini-fill";
            console("animação pausada", "log");
        } else {
            playAnimationButtonIcon.style.color = "";
            playAnimationButtonIcon.className = "ri-play-fill";
        }
    });

    const dragNeedle = (event : MouseEvent) : void => {

        event.preventDefault();

        let shiftX = event.clientX - gui.sequenceTab.sequenceNeedle.getBoundingClientRect().left;

        const moveAt = (pageX : number) : void => {

            let newLeft = pageX - shiftX - gui.sequenceTab.sequenceRuler.getBoundingClientRect().left;

            if (newLeft < 0) {
                newLeft = 0;
            } else if (newLeft > gui.sequenceTab.sequenceRuler.offsetWidth - gui.sequenceTab.sequenceNeedle.offsetWidth) {
                newLeft = gui.sequenceTab.sequenceRuler.offsetWidth - gui.sequenceTab.sequenceNeedle.offsetWidth;
            }

            gui.sequenceTab.sequenceNeedle.style.left = newLeft + 'px';
            NEEDLE_X = newLeft;  
        };

        const onMouseMove = (event : MouseEvent ) : void => {
            moveAt(event.pageX);
        };

        document.addEventListener('mousemove', onMouseMove);

        document.addEventListener('mouseup', function() {
            document.removeEventListener('mousemove', onMouseMove);
        }, { once: true });
    }

    gui.sequenceTab.sequenceNeedle.addEventListener('mousedown', dragNeedle);

    gui.sequenceTab.sequenceNeedle.ondragstart = function() {
        return false; 
    };
};

