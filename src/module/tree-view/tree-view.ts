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

import { ITreeView, ITreeViewBranch, ITreeViewBranchControl, ITreeViewBranchChildren } from "../../ts/types.js";
import { iconFile } from "../../util/icon-file/icon-file.js";

// TREE VIEW : 

const createControl = ( control : ITreeViewBranchControl , container : HTMLDivElement) : void => {

    const button : HTMLButtonElement = document.createElement("button");
    button.classList.add("tree-view-branch-control-button");
    button.innerHTML = "<i class=\"" + control.icon + "\"></i>";

    container.appendChild(button); 

};

const createBranchChildren = ( branchChildren : ITreeViewBranchChildren ) : HTMLDivElement => {

    const children : HTMLDivElement = document.createElement("div");
    children.classList.add("tree-view-branch-children");

    const childrenIcon : HTMLElement = document.createElement("i");
    childrenIcon.classList.add("tree-view-branch-root-icon",branchChildren.icon);

    const childrenName : HTMLSpanElement = document.createElement("span");
    childrenName.classList.add("tree-view-branch-root-name");
    childrenName.textContent = branchChildren.name;

    const childrenControlContainer : HTMLDivElement = document.createElement("div");
    childrenControlContainer.classList.add("tree-view-branch-control-container");

    children.appendChild(childrenIcon);
    children.appendChild(childrenName);
    children.appendChild(childrenControlContainer);

    if(branchChildren.controlList) branchChildren.controlList.forEach(control=> createControl(control,childrenControlContainer));

    return children;
};

export class TreeView {

    private tree : ITreeView[];
    private container : HTMLDivElement;
    private branchList : TreeViewBranch[];

    constructor ( tree : ITreeView[], container : HTMLDivElement ) {

        this.tree = tree;
        this.container = container;
        this.branchList = [];

        this.createTree(this.tree);
    };

    private createTree = ( tree : ITreeView[] ) : void => {

        this.container.innerHTML = "";
        this.branchList = [];

        tree.forEach( node => {

            if (node.type === "FOLDER") {

                const branch = new TreeViewBranch({
                    icon : "ri-folder-fill",
                    name : node.name,
                    path : node.path,
                    isCollapsed : false,
                    controlList : [
                        { icon : "ri-add-fill" },
                        { icon : "ri-arrow-down-s-fill" }
                    ]
                }, node.children);

                this.branchList.push(branch);
                this.container.appendChild(branch.get());

            } else {

                const leaf = createBranchChildren({
                    icon : iconFile(node.path),
                    name : node.name, 
                    path : node.path,
                    controlList : [
                        { icon : "ri-instance-line" },
                        { icon : "ri-arrow-right-line" }
                    ]
                });

                this.container.appendChild(leaf);
            };

        });
    };

    public update = ( tree : ITreeView[] ) : void => {
        this.tree = tree;
        this.createTree(this.tree);
    };
};

class TreeViewBranch {

    private isCollapsed : boolean;
    private icon : string;
    private name : string;
    private controlList : ITreeViewBranchControl[];

    private treeViewBranchContainer : HTMLDivElement;
    private treeViewBranchHeader : HTMLDivElement;
    private treeViewBranchIcon : HTMLElement;
    private treeViewBranchName : HTMLSpanElement;
    private treeViewBranchControlContainer : HTMLDivElement;
    private treeViewBranchBody : HTMLDivElement;

    constructor ( option : ITreeViewBranch, children : ITreeView[] ) {

        this.isCollapsed = option.isCollapsed;
        this.icon = option.icon;
        this.name = option.name;
        this.controlList = option.controlList;

        this.treeViewBranchContainer = document.createElement("div");
        this.treeViewBranchContainer.classList.add("tree-view-branch-container");

        this.treeViewBranchHeader = document.createElement("div");
        this.treeViewBranchHeader.classList.add("tree-view-branch-header");

        this.treeViewBranchIcon = document.createElement("i");
        this.treeViewBranchIcon.classList.add("tree-view-branch-root-icon",this.icon);

        this.treeViewBranchName = document.createElement("span");
        this.treeViewBranchName.classList.add("tree-view-branch-root-name");
        this.treeViewBranchName.textContent = this.name;

        this.treeViewBranchControlContainer = document.createElement("div");
        this.treeViewBranchControlContainer.classList.add("tree-view-branch-control-container");

        this.treeViewBranchBody = document.createElement("div");
        this.treeViewBranchBody.classList.add("tree-view-branch-body");

        this.treeViewBranchHeader.appendChild(this.treeViewBranchIcon);
        this.treeViewBranchHeader.appendChild(this.treeViewBranchName);
        this.treeViewBranchHeader.appendChild(this.treeViewBranchControlContainer);

        this.treeViewBranchContainer.appendChild(this.treeViewBranchHeader);

        if(this.controlList) this.controlList.forEach(control=> createControl(control,this.treeViewBranchControlContainer));

        const hasChildren = children && children.length > 0;

        if (hasChildren) {

            this.treeViewBranchContainer.appendChild(this.treeViewBranchBody);

            children.forEach( child => {

                if (child.type === "FOLDER") {

                    const childBranch = new TreeViewBranch({
                        icon : "ri-folder-fill",
                        name : child.name,
                        path : child.path,
                        isCollapsed : false,
                        controlList : [
                            { icon : "ri-add-fill" },
                            { icon : "ri-arrow-down-s-fill" }
                        ]
                    }, child.children);

                    this.treeViewBranchBody.appendChild(childBranch.get());

                } else {

                    const leaf = createBranchChildren({
                        icon : iconFile(child.path), 
                        name : child.name,
                        path : child.path,
                        controlList : [
                            { icon : "ri-instance-line" },
                            { icon : "ri-arrow-right-line" } 
                        ]
                    }); 

                    this.treeViewBranchBody.appendChild(leaf);
                };
            });
        };

        this.treeViewBranchHeader.addEventListener("click", (e: MouseEvent) => {
            if ((e.target as HTMLElement).closest(".tree-view-branch-control-button")) return; 
            this.toggleCollapse();
        });

        if (this.isCollapsed) this.setCollapsed(true);

    }; 

    private toggleCollapse = () : void => {
        this.setCollapsed(!this.isCollapsed);  
    };

    private setCollapsed = ( state : boolean ) : void => {
        this.isCollapsed = state;
        this.treeViewBranchBody.style.height = state ? "0px" : "auto";     
    }; 

    public get = () : HTMLDivElement => this.treeViewBranchContainer; 

};