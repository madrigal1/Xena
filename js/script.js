var plannerType = 1;
function fetch() {
  log.fetchEntries(plannerType,function(entries) {
      var List = document.getElementById("entries");
      List.innerHTML= "";
      for(var i=0;i<entries.length;i++) {
        var entry = entries[(entries.length - 1 - i)];
        var econtainer = document.createElement("div");
        econtainer.id = 'entry-' + entry.timestamp;
        var span = document.createElement('span');
        span.innerHTML = entry.text;
        econtainer.appendChild(span);
        List.appendChild(econtainer);      

      } 
 });
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
        if (text.replace(/ /g,'') != '') {
          // Create the todo item.
         log.createEntry(text,plannerType,function(entry) {
              console.log(entry);
              M.toast({html: 'Saved !', classes: "toastSave"})
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
        } 
    
     });
     
     
}
 