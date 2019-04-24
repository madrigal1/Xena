

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

      globalShortcut.register('CommandOrControl+S', () => {
        mainWindow.webContents.on('did-finish-load', ()=>{
            let code = 'var editor = document.getElementById("mainarea");var text = editor.value;text.replace(/\r?\n/g, "<br />");if (text.replace(/ /g,"") != "") {log.createEntry(text,plannerType,function(entry) {console.log(entry);M.toast({html: "Saved !", classes: "toastSave"})fetch()}); };';
            mainWindow.webContents.executeJavaScript(code);
            console.log("test");
        });
      })

     /* const mainMenu = Menu.buildFromTemplate(templatemenu);
      Menu.setApplicationMenu(mainMenu);*/
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


