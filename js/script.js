 /*   econtainer.style.borderLeft = "0.3rem #2196f3 solid"; */
var plannerType = 0;
function fetch() {
  log.fetchEntries(plannerType,function(entries) {
      var List = document.getElementById("entries");
      var ed = document.getElementById("mainarea");
      List.innerHTML= "";
      for(var i=0;i<entries.length;i++) {
        var entry = entries[(entries.length - 1 - i)];
        var econtainer = document.createElement("div");
        econtainer.id = entry.timestamp;
        econtainer.setAttribute("data-value",entry.text);
        console.log(entry.txt);
        econtainer.className ="logentries";
        var title = document.createElement('span');
        var date = document.createElement('span');
        title.className = "econtainer_Title";
        title.innerHTML =  entry.text.split('\n')[0] +"<br>" ;
        date.classList = "econtainer_Date";
        date.innerHTML = "- " + entry.timestamp;
        econtainer.appendChild(title);
        econtainer.appendChild(date);
        List.appendChild(econtainer);  
        var e = List.children;
        if(e.length> 0) {
               for(m=0;m<e.length;m++) {
                  e[m].addEventListener("click", function(evt) {
                      //Save Function for existing text ?
                       ed.innerHTML = ""
                       ed.innerHTML = this.getAttribute("data-value");
                       this.style.borderLeft = "0.2rem solid #311b92";
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
        var text = editor.value;
        text.replace(/\r?\n/g, '<br />');
        if (text.replace(/ /g,'') != '') {
          // Create the todo item.
         log.createEntry(text,plannerType,function(entry) {
              console.log(entry);
              M.toast({html: 'Saved !', classes: "toastSave"})
              fetch()
          });
        }
    });
  
    save.addEventListener("click",function(){
      var text = editor.value;
      text.replace(/\r?\n/g, '<br />');
      if (text.replace(/ /g,'') != '') {
        // Create the todo item.
       log.createEntry(text,plannerType,function(entry) {
            console.log(entry);
            M.toast({html: 'Saved !', classes: "toastSave"})
            fetch()
        });
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
                    var date = new Date().toUTCString();
                    var s = this.selectionStart;
                    this.value = this.value.substring(0,this.selectionStart) + "\n \n" + date + this.value.substring(this.selectionEnd);
                    break;
        } 
    
     });
     changeMode(plannerType);
     var mode = document.getElementsByClassName("tabs_nav");
     for(var m=0;m<mode.length;m++) {
         mode[m].addEventListener("click",function(evt) {
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
         });
     }
    
     
}
 