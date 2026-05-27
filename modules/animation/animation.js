









import { console } from "../console/console.js";
import { getUi } from "../get-ui/get-ui.js";

let primaryColor = "#19A727";    

export function animation() {

    const playAnimationButton = getUi("play-animation");
    const needle = getUi("needle");
    const forwardAnimationButton = getUi("forward-animation");
    const backwardAnimationButton = getUi("backward-animation");
    const trackRuler = getUi("area-time");
    const stopAnimationButton = getUi("stop-animation");
    const playAnimationButtonIcon = document.querySelector(".play-animation-button-icon");
    const stopAnimationButtonIcon = document.querySelector(".stop-animation-button-icon");
    const preNeedle = getUi("pre-needle");

    let animationState = false; 
    let animationFPS = 10;
    let needleLeft = 0; 
    let intervalId = null;
    let needleSnap = 5;

    needle.addEventListener("mouseenter", function() {
        preNeedle.style.display = "none";
    });

    forwardAnimationButton.addEventListener("click", function() {
        const trackRulerWidth = trackRuler.offsetWidth;
        const needleWidth = needle.offsetWidth;
        
        if (needleLeft + needleWidth + needleSnap <= trackRulerWidth) {
            needleLeft += needleSnap;
            needle.style.left = `${needleLeft}px`;
        }
    });
    
    backwardAnimationButton.addEventListener("click", function() {
        if (needleLeft - needleSnap >= 0) {
            needleLeft -= needleSnap;
            needle.style.left = `${needleLeft}px`;
        }
    });

    trackRuler.addEventListener("mousemove", function(e) {
        let rect = trackRuler.getBoundingClientRect();
        let mouseX = e.clientX - rect.left;
        let newX = mouseX - (preNeedle.offsetWidth / 2);
    
        if (newX < 0) {
            newX = 0;
        } else if (newX > (rect.width - preNeedle.offsetWidth)) {
            newX = rect.width - preNeedle.offsetWidth;
        }
    
        preNeedle.style.left = `${newX}px`;
        preNeedle.style.display = "flex";
    });

    trackRuler.addEventListener("click", function() {
        let newX = parseFloat(preNeedle.style.left);
        needle.style.left = `${newX}px`;
        needleLeft = newX;
    });
    
    trackRuler.addEventListener("mouseleave", function() {
        preNeedle.style.display = "none";
    });

    function playAnimation(state) {
        if (state) {
            stopAnimationButtonIcon.style.color = "#A71919";
            intervalId = setInterval(() => {
                needleLeft++;
                needle.style.left = `${needleLeft}px`;
                console(`Animation Frame ${needleLeft}F`, "log");

                if (needleLeft >= trackRuler.offsetWidth) {
                    needleLeft = 0;
                    needle.style.left = "0px";
                }
            }, animationFPS);
        } else {
            clearInterval(intervalId);
            stopAnimationButtonIcon.style.color = "";
        }
    }

    stopAnimationButton.addEventListener("click", function() {
        needleLeft = 0;
        needle.style.left = "0px";
        stopAnimationButtonIcon.style.color = "";
        clearInterval(intervalId);
        animationState = false;
        playAnimationButtonIcon.className = "ri-play-fill";
        playAnimationButtonIcon.style.color = "";
    });

    playAnimationButton.addEventListener("click", function() {
        animationState = !animationState;
        playAnimation(animationState);
        if (animationState) {
            playAnimationButtonIcon.style.color = primaryColor;
            playAnimationButtonIcon.className = "ri-pause-mini-fill";
            console("animação pausada", "log");
        } else {
            playAnimationButtonIcon.style.color = "";
            playAnimationButtonIcon.className = "ri-play-fill";
        }
    });

    function dragNeedle(event) {
        event.preventDefault();
        let shiftX = event.clientX - needle.getBoundingClientRect().left;

        function moveAt(pageX) {
            let newLeft = pageX - shiftX - trackRuler.getBoundingClientRect().left;

            if (newLeft < 0) {
                newLeft = 0;
            } else if (newLeft > trackRuler.offsetWidth - needle.offsetWidth) {
                newLeft = trackRuler.offsetWidth - needle.offsetWidth;
            }

            needle.style.left = newLeft + 'px';
            needleLeft = newLeft;  
        }

        function onMouseMove(event) {
            moveAt(event.pageX);
        }

        document.addEventListener('mousemove', onMouseMove);

        document.addEventListener('mouseup', function() {
            document.removeEventListener('mousemove', onMouseMove);
        }, { once: true });
    }

    needle.addEventListener('mousedown', dragNeedle);
    needle.ondragstart = function() {
        return false; 
    };
}

