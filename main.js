

const electron = require("electron");
const url = require("url");
const path  = require("path");

const {app,BrowserWindow,Menu,globalShortcut} = electron;

let mainWindow ;


app.on("ready",function() {
     mainWindow = new BrowserWindow({width: 100000, height: 10000})
    // mainWindow.setMenuBarVisibility(false)
      
      mainWindow.loadURL(url.format({
           pathname : path.join(__dirname,"index.html"),
           protocol:"file",
           slashes:true,
      }));



     /* const mainMenu = Menu.buildFromTemplate(templatemenu);
      Menu.setApplicationMenu(mainMenu);*/
});
app.on("window-all-closed",function() {
    app.quit();
}); 

/*const templatemenu = [
    {
        label:"File",
        submenu: [
            {
                label: "Quit",
                accelerator: process.platform == "darwin" ? "Command+Q" : "Crt+Q",
                click() {
                   app.quit();
                }
            }
        ]
    }
];*/


