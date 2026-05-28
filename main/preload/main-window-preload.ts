import { contextBridge, ipcRenderer } from "electron";

contextBridge.exposeInMainWorld("snack", {
    send: (channel, data) => ipcRenderer.send(channel, data),
    on: (channel, func) => {
        ipcRenderer.removeAllListeners(channel); 
        ipcRenderer.on(channel, (event, ...args) => func(...args));
    },
});

