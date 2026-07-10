
import { contextBridge, ipcRenderer } from "electron";

contextBridge.exposeInMainWorld("loviumApi", {

    readDirectory(path: string) {
        return ipcRenderer.invoke("file:readDirectory", path);
    }

});