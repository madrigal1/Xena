var plannerType = 0;
var activeEntry=null;
var months =["January","Febuary","March","April","May","June","July","August","September","October","November","December"]
function removeActiveEntryIndicator() {
  let entries =  document.getElementById("entries").children;
  for(let m =0;m<entries.length;m++) {
    entries[m].style.borderLeft ="none";
  }
  activeEntry = null;
}

function fetch() {
  log.fetchEntries(plannerType,function(entries) {
      var List = document.getElementById("entries");
      var ed = document.getElementById("mainarea");
      List.innerHTML= "";
      for(var i=0;i<entries.length;i++) {
        var today = new Date().toDateString();
        var month = new Date().getMonth();
        var year = new Date().getDate();
        
        var entry = entries[(entries.length - 1 - i)];
        if(entries.type == plannerType) {
          break;
        }
        var econtainer = document.createElement("div");
        econtainer.id = entry.timestamp;
        switch(plannerType) {
          case 0:    if(today == entry.timestamp) {
                         ed.innerHTML = entry.text;
                         econtainer.style.borderLeft = "0.2rem solid #311b92";
                         activeEntry = entry;
                     };
                     break;
          case 1:    if(month == entry.timestamp) {
                        ed.innerHTML = entry.text;
                        econtainer.style.borderLeft = "0.2rem solid #311b92";
                        activeEntry = entry;
                     };
                     break;
          case 2:    if(year =entry.timestamp) {
                         ed.innerHTML = entry.text;
                         econtainer.style.borderLeft = "0.2rem solid #311b92";
                         activeEntry = entry;
                     }
                     break;
          default:  ed.innerHTML = " ";
                    if(i == entries.length-1) {
                      /* ed.innerHTML = entry.text;
                      econtainer.style.borderLeft = "0.2rem solid #311b92"; */
                      activeEntry = entry;
                    }
                    break;
        }
        econtainer.setAttribute("data-value",entry.text);
        /* console.log(entry.text); */
        econtainer.className ="logentries";
        var title = document.createElement('span');
        var date = document.createElement('span');
        title.className = "econtainer_Title";
        title.innerHTML =  entry.text.split('\n')[0] +"<br>" ;
        date.classList = "econtainer_Date";
        if(plannerType != 3) {
        //special case for month
        if(plannerType != 1) {
        date.innerHTML = "- " + entry.timestamp;
        } else {
          date.innerHTML = "- "+ months[entry.timestamp];
        }
      } else {
        date.innerHTML = today;
      }
        econtainer.appendChild(title);
        econtainer.appendChild(date);
        List.appendChild(econtainer);  
        var e = List.children;
        if(e.length> 0) {
               for(m=0;m<e.length;m++) {
                  e[m].addEventListener("click", function(evt) {
                       ed.value = "" ;
                       ed.value = this.getAttribute("data-value");
                       console.log("Error: " + this.getAttribute("data-value"));
                       this.style.borderLeft = "0.2rem solid #311b92";
                       activeEntry = entry;
                       for(k=0;k<e.length;k++) {
                          if(e[k] != evt.target) {
                            e[k].style.borderLeft ="none";
                          }
                       }
                  });
               }
        }    

      } 
 });
}

function changeMode(p) {
  var tabs = document.getElementsByClassName("tabs_nav_button");
  switch(p) {
    case 3: tabs[3].style.backgroundColor = "#1a237e";
             break;
    case 2: tabs[2].style.backgroundColor = "#1a237e";
            break;
    case 1: tabs[1].style.backgroundColor = "#1a237e";
            break;
    case 0: tabs[0].style.backgroundColor = "#1a237e";
            break;
    default:console.log("test");
  }
  
}

window.onload = function() {
    var editor = document.getElementById("mainarea");
    var save = document.getElementById("save");
    var del = document.getElementById("delete");
     log.open(fetch);
    /*  save.addEventListener("click",function() {
              var text = editor.value;
              if (text.replace(/ /g,'') != '') {
                // Create the todo item.
               log.createEntry(text, function(entry) {
                    console.log(entry);
                });
              }
     }); */
     Mousetrap.bind('ctrl+s', function(e) {
        e.preventDefault();
        if (editor.value.replace(/ /g,'') != '') { //check if editor is not blank
            var timestamp;
            switch(plannerType) {
              case 0: timestamp = new Date().toDateString();
                      break;
              case 1:timestamp = new Date().getMonth();
                     break;
              case 2:timestamp = new Date().getFullYear();
                    break;
              default: timestamp = new Date().toDateString();
            }
            if(plannerType !=3) {
            activeEntry = { 
               "text": editor.value,
               "type":plannerType,
               "timestamp":timestamp 
           }
          } else{
            activeEntry = { 
              "text": editor.value,
              "type":plannerType,
              "timestamp":editor.value.split('\n')[0]
          }
          }
          
          console.clear();
          console.log(activeEntry);
         log.createEntry(activeEntry,plannerType,function(entry) {
              console.log(entry);
              M.toast({html: 'Saved !', classes: "toastSave"})
              fetch()
          });
        } 
        editor.value ="";
        removeActiveEntryIndicator()
    });
  
    save.addEventListener("click",function(){
      if (editor.value.replace(/ /g,'') != '') { //check if editor is not blank
        activeEntry.text = editor.value;
        activeEntry.text.replace(/\r?\n/g, '<br />');
       log.createEntry(activeEntry,plannerType,function(entry) {
            console.log(entry);
            M.toast({html: 'Saved !', classes: "toastSave"})
            fetch()
        });
      } 
      editor.value ="";
      removeActiveEntryIndicator()
    });

    del.addEventListener("click",function(e) {
      if (editor.value.replace(/ /g,'') != '') { 
        if(plannerType != 3) {
        log.deleteEntry(activeEntry.timestamp);
        } else {
          log.deleteEntry(activeEntry.text.split('\n')[0]);
        }
      }
    });
     editor.addEventListener("keydown",function(e) {
        var event = e.which || e.keyCode;
        switch(event){
            case 9: e.preventDefault();
                    var s = this.selectionStart;
                    this.value = this.value.substring(0,this.selectionStart) + "\t" + this.value.substring(this.selectionEnd);
                    this.selectionEnd = s+1; 
                    break;
            case 192:e.preventDefault();
                    var date = new Date().toDateString() + " (" + new Date().toLocaleTimeString() +" )";
                    var s = this.selectionStart;
                    this.value = this.value.substring(0,this.selectionStart) + "\n \n" + date + this.value.substring(this.selectionEnd);
                    break;
            default: break;
        } 
    
     });
     changeMode(plannerType);
     var mode = document.getElementsByClassName("tabs_nav");
     var ed = document.getElementById("mainarea");
     for(var m=0;m<mode.length;m++) {
         mode[m].addEventListener("click",function(evt) {
          ed.value ="";
              for (let k = 0; k < mode.length; k++) {
                    mode[k].children[1].style.backgroundColor = "grey";  
              }
             for (let k = 0; k < mode.length; k++) {
                   if(mode[k] == evt.target)   {
                       plannerType = k;
                       break;
                   }
             }
            changeMode(plannerType);
            fetch();
         });
     }
    
     
}
 