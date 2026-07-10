
/**************************************************************************/
/*                                                                        */
/*                         This file is part of :                         */
/*                             Lovium Studio                              */
/*              https://github.com/Lovium-Studio/lovium-studio            */
/*                                                                        */
/*                             MIT LICENSE                                */
/*                                                                        */
/*                (C) 2026 - YYYY Lovium Studio & Community               */
/*                (C) 2026 - YYYY Rhyan Eduardo Ferreira.                 */
/*                                                                        */
/*                   https://opensource.org/license/mit                   */
/*                                                                        */
/**************************************************************************/

import { IHtmlOrchesterAttribute, IHtmlOrchesterContent, IHtmlOrchesterTag, IHtmlOrchester } from "../../ts/types";

// HTML ORCHESTER : 

export class HtmlOrchester {

    private indentValue: number;
    private html: string;

    constructor(option: IHtmlOrchester) {
        this.indentValue = option.indent;
        this.html = "";
    };

    private static getIndent = (level: number, indentValue: number): string => {
        return " ".repeat(level * indentValue);
    };

    private static setAttribute = (attribute: string, value: string): string => attribute + "=\"" + value + "\"";

    private static readonly VOID_ELEMENTS = new Set([
        "area",
        "base",
        "br",
        "col",
        "embed",
        "hr",
        "img",
        "input",
        "link",
        "meta",
        "source",
        "track",
        "wbr"
    ]);

    private static getCloseTag = (tag: keyof HTMLElementTagNameMap, inside: string, content: IHtmlOrchesterContent): string => {

        if(HtmlOrchester.VOID_ELEMENTS.has(tag)) return ">";

        return ">" + content + inside + "</" + tag + ">";
    };

    private static getAttributeTag = (attribute: IHtmlOrchesterAttribute[]): string => {
        return attribute.map(att => HtmlOrchester.setAttribute(att.name, att.value)).join(" ");
    };

    private render = (htmlNode: IHtmlOrchesterTag[], level: number = 0): string => {

        let html = "";
        const indent = HtmlOrchester.getIndent(level, this.indentValue);

        htmlNode.forEach(tagNode => {

            const tag = tagNode.tag;
            const attribute = HtmlOrchester.getAttributeTag(tagNode.attribute);
            const content = tagNode.content ?? "";

            const children = tagNode.children? "\n" + this.render(tagNode.children, level + 1) + "\n" + indent: "";

            html += indent + "<" + tag + " " + attribute + HtmlOrchester.getCloseTag(tag, children, content) + "\n";

        });   

        return html;      
    }; 

    public innerHtml = (tag: HTMLElement): void => tag.insertAdjacentHTML("afterbegin", this.html);
 
    public clearHtml = (): string => this.html = "";     

    public static children = (htmlNode: { node: IHtmlOrchesterTag[] }): IHtmlOrchesterTag[] => htmlNode.node;

    public setHtml = (htmlNode: IHtmlOrchesterTag[]): { node: IHtmlOrchesterTag[], html: string } => {

        this.html = this.render(htmlNode);

        return {
            node: htmlNode,
            html: this.html
        };
    };
};