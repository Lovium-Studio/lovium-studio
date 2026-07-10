
import { ipcMain } from "electron";
import { FileApi } from "../file-api/file-service-ipc";



ipcMain.handle("file:readDirectory", (_, path) => {
    return FileApi.readDirectory(path);
});