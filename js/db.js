var log = (function() {
    var DB = {};
    var datastore = null;
  
  /**
 * Open a connection to the datastore.
 */
DB.open = function(callback) {
    // Database version.
    var version = 1;
  
    // Open a connection to the datastore.
    var request = indexedDB.open('log', version);
  
    // Handle datastore upgrades.
    request.onupgradeneeded = function(e) {
      var db = e.target.result;
  
      e.target.transaction.onerror = DB.onerror;
  
      // Delete the old datastore.
      if (db.objectStoreNames.contains('log')) {
        db.deleteObjectStore('log');
      }
  
      // Create a new datastore.
      var store = db.createObjectStore('log', {
        keyPath: 'timestamp'
      });
    };
  
    // Handle successful datastore access.
    request.onsuccess = function(e) {
      // Get a reference to the DB.
      datastore = e.target.result;
      console.log("success database");
      callback();
    };
  
    // Handle errors when opening the datastore.
    request.onerror = DB.onerror;
  };

  DB.fetchEntries = function(type,callback) {
    var db = datastore;
    var transaction = db.transaction(['log'], 'readwrite');
    var objStore = transaction.objectStore('log');
  
    var keyRange = IDBKeyRange.lowerBound(0);
    var cursorRequest = objStore.openCursor(keyRange);
  
    var entries = [];
  
    transaction.oncomplete = function(e) {
      // Execute the callback function.
      callback(entries);
    };
  
    cursorRequest.onsuccess = function(e) {
      var result = e.target.result;
  
      if (!!result == false) {
        return;
      }
      
      if(type == result.value.type) {
        entries.push(result.value);
      }
  
      result.continue();
    };
  
    cursorRequest.onerror = DB.onerror;
  };

  /**
 * Create a new todo item.
 */
/**
 * Create a new todo item.
 */
DB.createEntry = function(activeEntry,type,callback) {
  // Get a reference to the db.
  var db = datastore;

  // Initiate a new transaction.
  var transaction = db.transaction(['log'], 'readwrite');

  // Get the datastore.
  var objStore = transaction.objectStore('log');

  // Create a timestamp for the todo item.
  var timestamp;
  switch(type) {
    case 0:  timestamp = new Date().toDateString();
              break;
    case 1:  timestamp = new Date().getMonth();
              break;
    case 2:  timestamp = new Date().getFullYear();
              break;
    default: timestamp = new Date().toDateString();
              break;
  }

  // Create an object for the todo item.
  var entry ;
  var request ;
  if (activeEntry == null) {
  entry= {
    'text': text,
    'type':type,
    'timestamp': timestamp
  };
} else {
  if(type != 3) {
  entry= activeEntry;
  } else {
    entry = {
      'text': activeEntry.text,
      'type':activeEntry.type,
      'timestamp': activeEntry.text.split('\n')[0]
    }
  }
}

  // Create the datastore request.

  request = objStore.put(entry);
  // Handle a successful datastore put.
  request.onsuccess = function(e) {
    // Execute the callback function.
    callback(entry);
  };

  // Handle errors.
  request.onerror = DB.onerror;
};

/**
 * Delete a todo item.
 */
DB.deleteEntry = function(id) {
  var db = datastore;
  var transaction = db.transaction(['log'], 'readwrite');
  var objStore = transaction.objectStore('log');

  var request = objStore.delete(id);

  request.onsuccess = function(e) {
   document.location.reload();
  }

  request.onerror = function(e) {
    console.log(e);
  }
};
    // Export the tDB object.
    return DB;
  }());
