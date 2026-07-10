
// ASSET TAB : 

import { IHtmlOrchesterTag } from "../../ts/types.js";
import { HtmlOrchester } from "../../module/html-orchester/html-orchester.js";

const HTML_NODE : IHtmlOrchesterTag[] = [
    {  
        tag: "div",
        attribute: [
            { name: "id", value: "asset-tab" },
            { name: "class", value: "non-renderable fullsize-tab-container" }
        ],
        children: [
            {
                tag: "div",
                attribute: [
                    { name: "id", value: "simple-file-viewer" }
                ],
                children: [
                    {
                        tag: "div",
                        attribute: [
                            { name: "id", value: "simple-preview-container" },
                            { name: "class", value: "simple-preview-container" }
                        ],
                        children: [
                            {
                                tag: "div",
                                attribute: [
                                    { name: "id", value: "simple-preview-container-zoom-area" }
                                ]
                            },
                            {
                                tag: "span",
                                attribute: [
                                    { name: "id", value: "asset-tab-asset-name" }
                                ],
                                content: "No Name"
                            },
                            {
                                tag: "img",
                                attribute: [
                                    { name: "src", value: "../asset/placeholder/sprite-placeholder.png" },
                                    { name: "id", value: "asset-tab-image-preview" },
                                    { name: "class", value: "simple-image-preview" }
                                ]
                            }
                        ]
                    },
                    {
                        tag: "div",
                        attribute: [
                            { name: "class", value: "simple-menu-container" }
                        ],
                        children: [
                            {
                                tag: "button",
                                attribute: [
                                    { name: "id", value: "asset-tab-image-prev" },
                                    { name: "class", value: "simple-menu-button" }
                                ],
                                children: [
                                    {
                                        tag: "i",
                                        attribute: [
                                            { name: "class", value: "ri-arrow-left-s-fill" }
                                        ]
                                    }
                                ]
                            },
                            {
                                tag: "span",
                                attribute: [
                                    { name: "id", value: "asset-tab-asset-slot-range" }
                                ],
                                content: "0/0"
                            },
                            {
                                tag: "button",
                                attribute: [
                                    { name: "id", value: "asset-tab-image-next" },
                                    { name: "class", value: "simple-menu-button" }
                                ],
                                children: [
                                    {
                                        tag: "i",
                                        attribute: [
                                            { name: "class", value: "ri-arrow-right-s-fill" }
                                        ]
                                    }
                                ]
                            }
                        ]
                    }
                ]
            },
            {
                tag: "div",
                attribute: [
                    { name: "id", value: "asset-tab-info-table" }
                ],
                children: [
                    {
                        tag: "div",
                        attribute: [
                            { name: "class", value: "info-table-row" }
                        ],
                        children: [
                            {
                                tag: "span",
                                attribute: [
                                    { name: "class", value: "info-key" }
                                ],
                                content: "Name"
                            },
                            {
                                tag: "span",
                                attribute: [
                                    { name: "class", value: "info-value" }
                                ],
                                content: "spr_01.png"
                            }
                        ]
                    },
                    {
                        tag: "div",
                        attribute: [
                            { name: "class", value: "info-table-row" }
                        ],
                        children: [
                            {
                                tag: "span",
                                attribute: [
                                    { name: "class", value: "info-key" }
                                ],
                                content: "Size"
                            },
                            {
                                tag: "span",
                                attribute: [
                                    { name: "class", value: "info-value" }
                                ],
                                content: "100x100"
                            }
                        ]
                    },
                    {
                        tag: "div",
                        attribute: [
                            { name: "class", value: "info-table-row" }
                        ],
                        children: [
                            {
                                tag: "span",
                                attribute: [
                                    { name: "class", value: "info-key" }
                                ],
                                content: "Slot"
                            },
                            {
                                tag: "span",
                                attribute: [
                                    { name: "class", value: "info-value" }
                                ],
                                content: "0/2"
                            }
                        ]
                    }
                ]
            },
            {
                tag: "button",
                attribute: [
                    { name: "class", value: "row-button-secondary" }
                ],
                children: [
                    {
                        tag: "i",
                        attribute: [
                            { name: "class", value: "ri-play-circle-fill" }
                        ]
                    }
                ],
                content: " Play"
            },
            {
                tag: "button",
                attribute: [
                    { name: "class", value: "row-button-secondary" }
                ],
                children: [
                    {
                        tag: "i",
                        attribute: [
                            { name: "class", value: "ri-pen-nib-fill" }
                        ]
                    }
                ],
                content: " Edit"
            },
            {
                tag: "button",
                attribute: [
                    { name: "class", value: "row-button-secondary" }
                ],
                children: [
                    {
                        tag: "i",
                        attribute: [
                            { name: "class", value: "ri-indeterminate-circle-fill" }
                        ]
                    }
                ],
                content: " Delete"
            }
        ]
    }
];

export const ASSET_TAB_HTML = () : void => {
    const assetTabHtml = new HtmlOrchester({ indent : 4}); 
    const h = assetTabHtml.setHtml(HTML_NODE);    
    assetTabHtml.innerHtml(document.body);      
};
