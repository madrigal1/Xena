const electron = require("electron");
const url = require("url");
const path  = require("path");

const {app,BrowserWindow,Menu} = electron;

let mainWindow ;

app.on("ready",function() {
      mainWindow = new BrowserWindow({});
      
      mainWindow.loadURL(url.format({
           pathname : path.join(__dirname,"index.html"),
           protocol:"file",
           slashes:true,
      }));

      const mainMenu = Menu.buildFromTemplate(templatemenu);
      Menu.setApplicationMenu(mainMenu);
});

const templatemenu = [
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
];