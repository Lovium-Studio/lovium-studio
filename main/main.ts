
/*---------------------------------------------------------------------------------------------*
*  copyright (c) 2026 Auto Software CREACTED IN 27/05/2026 DD/MM/YYYYY           *                                                                   *
*----------------------------------------------------------------------------------------------*/
 
// MAIN ( ELECTRON ) : 

import { app, BrowserWindow, globalShortcut, ipcMain, dialog, protocol } from 'electron';
import { exec } from 'child_process';

import * as os from 'os';
import * as path from 'path';
import * as fs from 'fs';

if (!app.isPackaged) {
    try {
        require("electron-reloader")(module, {
            ignore: ["node_modules","dist","out"]
        });
    } catch {}
};


// SETUP : 

let SPLASH_WINDOW : any = null; 
let MAIN_WINDOW : any = null; 

app.setName("Lovium Studio");
app.setAppUserModelId("com.loviumstudio.autosoftware");

// APP WINDOW :

function createMainWindow(): void {

    MAIN_WINDOW = new BrowserWindow({
        width: 1366,
        height: 768,
        resizable: true,
        frame: false,
        icon: path.join(__dirname, '..', '..' , 'src', 'asset' , 'icon' , 'icon.png'),
        show: false,
        title: "Lovium Studio",
        minWidth: 940,
        minHeight: 570,
        backgroundColor: "#fff",
        center: true,
        webPreferences: {
            nodeIntegration: false,
            contextIsolation: true,
            preload : path.join(__dirname, './preload/main-window-preload.js'),
            disableBlinkFeatures: 'Autofill',
        }
    });

    MAIN_WINDOW.webContents.session.setPermissionRequestHandler((webContents: any, permission: any, callback: Function) => {
        callback(true); 
    });

    MAIN_WINDOW.removeMenu();

    MAIN_WINDOW.loadFile(path.join(__dirname, '..', '..' , 'src', 'app', 'app.html'));

    ipcMain.on("app-minimize",()=>{
      MAIN_WINDOW.minimize();
    })

    ipcMain.on("app-maximize",()=>{
        MAIN_WINDOW.isMaximized() ? MAIN_WINDOW.unmaximize() : MAIN_WINDOW.maximize();
    })

    MAIN_WINDOW.on('maximize', () => {
      MAIN_WINDOW.webContents.send("ismaximized");
    });
    
    MAIN_WINDOW.on('unmaximize', () => {
      MAIN_WINDOW.webContents.send("isunmaximized");
    });

    globalShortcut.register("F11", () => {
        const isFullScreen = MAIN_WINDOW.isFullScreen();
        MAIN_WINDOW.setFullScreen(!isFullScreen);
    });
}

// CREATE SPLASH WINDOW : 

function createSplashWindow(): void{

    SPLASH_WINDOW = new BrowserWindow({
        width: 700,
        height: 400,
        transparent: true,
        frame: false,
        alwaysOnTop: false,
        resizable: false,
        icon: path.join(__dirname, '..', '..' , 'src', 'asset' , 'icon' , 'icon.png'),
        title: "Lovium Studio",
        webPreferences: {
            nodeIntegration: false,
            contextIsolation: true,
            preload : path.join(__dirname, './preload/splash-window-preload.ts'),
            disableBlinkFeatures: 'Autofill' 
        }
    });

    SPLASH_WINDOW.loadFile(path.join(__dirname, '..', '..' ,'src', 'app', 'splash.html'));
    SPLASH_WINDOW.center();

};

// WHEN APP START : 

app.whenReady().then(() => {

    createSplashWindow();
    createMainWindow();

}); 
 
setTimeout(() => {
    SPLASH_WINDOW.hide();
    MAIN_WINDOW.show();  
    SPLASH_WINDOW.webContents.openDevTools(); 
    MAIN_WINDOW.webContents.openDevTools();  
}, 10000);
