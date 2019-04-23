var log = (function() {
    var DB = {};
    var datastore = null;
  
  /**
 * Open a connection to the datastore.
 */
DB.open = function() {
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
    };
  
    // Handle errors when opening the datastore.
    request.onerror = DB.onerror;
  };

  DB.fetchTodos = function(callback) {
    var db = datastore;
    var transaction = db.transaction(['log'], 'readwrite');
    var objStore = transaction.objectStore('log');
  
    var keyRange = IDBKeyRange.lowerBound(0);
    var cursorRequest = objStore.openCursor(keyRange);
  
    var entries = [];
  
    transaction.oncomplete = function(e) {
      // Execute the callback function.
      callback(todos);
    };
  
    cursorRequest.onsuccess = function(e) {
      var result = e.target.result;
  
      if (!!result == false) {
        return;
      }
  
      entries.push(result.value);
  
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
DB.createEntry = function(text, callback) {
  // Get a reference to the db.
  var db = datastore;

  // Initiate a new transaction.
  var transaction = db.transaction(['log'], 'readwrite');

  // Get the datastore.
  var objStore = transaction.objectStore('log');

  // Create a timestamp for the todo item.
  var timestamp = new Date().toDateString();

  // Create an object for the todo item.
  var todo = {
    'text': text,
    'timestamp': timestamp
  };

  // Create the datastore request.
  var request = objStore.put(todo);

  // Handle a successful datastore put.
  request.onsuccess = function(e) {
    // Execute the callback function.
    callback(todo);
  };

  // Handle errors.
  request.onerror = DB.onerror;
};

/**
 * Delete a todo item.
 */
DB.deleteTodo = function(id) {
  var db = datastore;
  var transaction = db.transaction(['log'], 'readwrite');
  var objStore = transaction.objectStore('log');

  var request = objStore.delete(id);

  request.onsuccess = function(e) {
   console.log("deleted")
  }

  request.onerror = function(e) {
    console.log(e);
  }
};
    // Export the tDB object.
    return DB;
  }());
