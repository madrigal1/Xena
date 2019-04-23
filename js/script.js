

window.onload = function() {
    var editor = document.getElementById("mainarea");
    var save = document.getElementById("save");
     log.open()
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
         log.createEntry(text, function(entry) {
              console.log(entry);
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
 