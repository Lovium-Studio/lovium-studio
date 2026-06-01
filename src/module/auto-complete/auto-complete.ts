
// AUTO COMPLETE : 

import { getUi } from "../get-ui/get-ui.js";

const autoCompleteRowDefaultIcon = "ri-braces-fill";

// const autoCompleteList = [
//     {
//         value: "console.log()",
//         Type: "function",
//         keyword: [
//             "console",
//             "log",
//             "print"
//         ]
//     },
//     {
//         value: "function() {}",
//         Type: "function",
//         keyword: [
//             "function",
//             "func",
//             "fn"
//         ]
//     },
//     {
//         value: "if() {}",
//         Type: "control",
//         keyword: [
//             "if",
//             "condition",
//             "statement"
//         ]
//     },
//     {
//         value: "for() {}",
//         Type: "loop",
//         keyword: [
//             "for",
//             "loop",
//             "iteration"
//         ]
//     },
//     {
//         value: "while() {}",
//         Type: "loop",
//         keyword: [
//             "while",
//             "loop",
//             "iteration"
//         ]
//     },
//     {
//         value: "const",
//         Type: "declaration",
//         keyword: [
//             "const",
//             "variable",
//             "declaration"
//         ]
//     },
//     {
//         value: "let",
//         Type: "declaration",
//         keyword: [
//             "let",
//             "variable",
//             "declaration"
//         ]
//     },
//     {
//         value: "var",
//         Type: "declaration",
//         keyword: [
//             "var",
//             "variable",
//             "declaration"
//         ]
//     },
//     {
//         value: "=> {}",
//         Type: "function",
//         keyword: [
//             "arrow function",
//             "arrow",
//             "lambda"
//         ]
//     },
//     {
//         value: "document.querySelector()",
//         Type: "dom",
//         keyword: [
//             "document",
//             "querySelector",
//             "dom"
//         ]
//     },
//     {
//         value: "document.getElementById()",
//         Type: "dom",
//         keyword: [
//             "document",
//             "getElementById",
//             "dom"
//         ]
//     },
//     {
//         value: "JSON.parse()",
//         Type: "function",
//         keyword: [
//             "JSON",
//             "parse",
//             "json parse"
//         ]
//     },
//     {
//         value: "JSON.stringify()",
//         Type: "function",
//         keyword: [
//             "JSON",
//             "stringify",
//             "json stringify"
//         ]
//     },
//     {
//         value: "setTimeout()",
//         Type: "function",
//         keyword: [
//             "timeout",
//             "setTimeout",
//             "delay"
//         ]
//     },
//     {
//         value: "setInterval()",
//         Type: "function",
//         keyword: [
//             "interval",
//             "setInterval",
//             "repeat"
//         ]
//     },
//     {
//         value: "try {} catch(e) {}",
//         Type: "control",
//         keyword: [
//             "try",
//             "catch",
//             "error handling"
//         ]
//     } 
// ];

const primaryColor = "--color-b";

const autoCompleteList = [
    {
        value: "print",
        Type: "function",
        keyword: [
            "print",
            "output",
            "log"
        ]
    },
    {
        value: "function",
        Type: "function",
        keyword: [
            "function",
            "fn",
            "lambda"
        ]
    },
    {
        value: "if",
        Type: "control",
        keyword: [
            "if",
            "condition",
            "statement"
        ] 
    },
    {
        value: "for",
        Type: "loop",
        keyword: [
            "for",
            "loop",
            "iteration"
        ]
    },
    {
        value: "while",
        Type: "loop",
        keyword: [
            "while",
            "loop",
            "iteration"
        ] 
    },
    {
        value: "local",
        Type: "declaration",
        keyword: [
            "local",
            "variable",
            "declaration"
        ]
    }
];


export const autoComplete = (input : string , x : number , y : number) : void => {

    const completeList = autoCompleteList;

    const autoCompleteContainer = getUi("auto-complete-container");
    const autoCompleteInput = getUi("auto-complete-input");
    const autoCompleteListContainer = getUi("auto-complete-list-container");

    autoCompleteInput.value = input;

    document.addEventListener("click",function(){autoCompleteContainer.style.display = "none"});

    const autoCompleteSetPosition = (cX : number, cY : number) : void => {

        const codeEditorContainer = getUi("code-editor");
        const codeEditorContainerRect = codeEditorContainer.getBoundingClientRect();
        const autoCompleteContainerRect = autoCompleteContainer.getBoundingClientRect();

        autoCompleteContainer.style.left = `${cX + 3}px`;
        autoCompleteContainer.style.top = `${cY + 15}px`;

        // if(cY > codeEditorContainerRect.height){
        //     autoCompleteContainer.style.top = `${codeEditorContainerRect.height - autoCompleteContainerRect.height}px`;
        // }
    };

    const filterAutoCompleteList = (value : string) : void => {

        autoCompleteListContainer.innerHTML = ""; 
        autoCompleteContainer.style.display = "none";

        if (value !== "") {

            const inputValue = value.toLowerCase();
            let firstMatch = true; 

            completeList.forEach(list => {
                const iconType = getIconType(list.Type);

                const matchFound = list.keyword.some(keyword => keyword.toLowerCase().includes(inputValue));

                if (matchFound) {
                    const autoCompleteRow = createAutoCompleteRow(list.value, iconType);
                    
                    if (firstMatch) {
                        autoCompleteRow.style.backgroundColor = primaryColor;
                        firstMatch = false; 
                    };

                    autoCompleteListContainer.appendChild(autoCompleteRow);
                    autoCompleteContainer.style.display = "flex";
                };
            });
        };
    };

    autoCompleteSetPosition(x, y);

    filterAutoCompleteList(input);

    autoCompleteInput.addEventListener("input", function() {
        filterAutoCompleteList(autoCompleteInput.value);
    });
};

const getIconType = (type : string) : string => {
    switch (type) {
        case "var": 
            return "ri-braces-fill";
        case "tag":
            return "ri-code-s-slash-fill";
        case "color":
            return "ri-brush-line";
        default:
        return autoCompleteRowDefaultIcon;
    };
};

const createAutoCompleteRow = (label : string, icon : string) : HTMLDivElement => {

    const autoCompleteRow = document.createElement("div");
    autoCompleteRow.classList.add("auto-complete-complete-row");

    const autoCompleteRowIcon = document.createElement("i");
    autoCompleteRowIcon.classList.add("auto-complete-complete-row-icon", icon);

    const autoCompleteRowLabel = document.createElement("span");
    autoCompleteRowLabel.classList.add("auto-complete-complete-row-label");
    autoCompleteRowLabel.textContent = label;

    autoCompleteRow.appendChild(autoCompleteRowLabel);
    autoCompleteRow.appendChild(autoCompleteRowIcon);

    return autoCompleteRow;
};

