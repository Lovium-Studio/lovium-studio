









// CONTEXT MENU : 

import { getUi } from "../get-ui/get-ui.js";

const contextMenuContainer = getUi("context-menu-container");

export function contextMenu(context, event) {
    console.log("Context array:", context); 

    contextMenuContainer.innerHTML = "";

    context.forEach(function(contexts) {
        const contextMenuButton = document.createElement("div");
        contextMenuButton.classList.add("context-menu-button");
        contextMenuButton.id = contexts.id; 

        const contextMenuLabel = document.createElement("span");
        contextMenuLabel.textContent = contexts.name;

        const contextMenuButtonIcon = document.createElement("i");
        contextMenuButtonIcon.classList.add(`${contexts.icon}`);

        const contextMenuButtonDivisor = document.createElement("div");
        contextMenuButtonDivisor.classList.add("context-menu-button-divisor")

        if (contexts.divisor == true){
            contextMenuButton.appendChild(contextMenuButtonDivisor)
        }
        
        contextMenuButton.appendChild(contextMenuButtonIcon);
        contextMenuButton.appendChild(contextMenuLabel);
        contextMenuContainer.appendChild(contextMenuButton);
    });

    const mouseX = event.clientX;
    const mouseY = event.clientY;

    function setPosition() {
        contextMenuContainer.style.left = `${mouseX}px`;
        contextMenuContainer.style.top = `${mouseY}px`;

        // Agora o menu já foi posicionado, podemos calcular o tamanho real
        const contextMenuContainerRect = contextMenuContainer.getBoundingClientRect();

        // Verifica se ultrapassou a borda inferior da janela
        if (contextMenuContainerRect.bottom > window.innerHeight) {
            contextMenuContainer.style.top = `${window.innerHeight - contextMenuContainerRect.height - 10}px`;
        }

        // Verifica se ultrapassou a borda direita da janela
        if (contextMenuContainerRect.right > window.innerWidth) {
            contextMenuContainer.style.left = `${window.innerWidth - contextMenuContainerRect.width - 10}px`;
        }
    } 

    contextMenuContainer.addEventListener("click", function() {
        contextMenuContainer.style.display = "none";
    });

    contextMenuContainer.style.display = "flex"; 

    document.addEventListener("click", function handleClickOutside(e) {
        if (!contextMenuContainer.contains(e.target)) {
            contextMenuContainer.style.display = "none";
            document.removeEventListener("click", handleClickOutside);
        }
    }); 

    setPosition();
}
   