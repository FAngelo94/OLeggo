const MyNotesViewModel = require("./my-notes-view-model");
var Sqlite = require( "nativescript-sqlite" );
var Toast = require("nativescript-toast");

var saveChanges = Toast.makeText("Modification Saved Successfully!");
var DB = require("~/shared/db/db")

var page;
function onLoaded(args) {
	page = args.object
	setUpModel()
}

function setUpModel(){
	(new Sqlite("OleggoDB.db")).then((db) => {
         console.log("gotDB")
         var temp = new MyNotesViewModel(db)
		 console.info("temp="+temp)
         page.bindingContext = temp
     }, err => {
         console.info("Failed to open database", err)
         errorAlert("Failed to open database: " + err)
     })
}

function modifyNote(args) {

	(new Sqlite("OleggoDB.db")).then(db => {
        // This should ALWAYS be true, db object is open in the "Callback" if no errors occurred
        console.info("Are we open yet (Inside Callback)? ", db.isOpen() ? "Yes" : "No"); // Yes
        var id=args.object.id
		var quote=page.getViewById(id+"text")
		db.execSQL(DB.updateQuote(), [quote.text, id]).then(id => {
            saveChanges.show()
			console.info("INSERT RESULT" + id);
        }, error => {
            console.info("INSERT ERROR" + error);
        });

    }, err => {
        console.info("Failed to open database", err);
        errorAlert("Failed to open database: " + err)
    })
}

function removeNote(args) {

	(new Sqlite("OleggoDB.db")).then(db => {
        // This should ALWAYS be true, db object is open in the "Callback" if no errors occurred
        console.info("Are we open yet (Inside Callback)? ", db.isOpen() ? "Yes" : "No"); // Yes
        var id=args.object.id
		db.execSQL(DB.removeQuote(), [id]).then(id => {
            console.info("INSERT RESULT" + id);
        }, error => {
            console.info("INSERT ERROR" + error);
        });

    }, err => {
        console.info("Failed to open database", err);
        errorAlert("Failed to open database: " + err)
    })
	setUpModel()
}

function notFavoriteNote(args) {

	(new Sqlite("OleggoDB.db")).then(db => {
        // This should ALWAYS be true, db object is open in the "Callback" if no errors occurred
        console.info("Are we open yet (Inside Callback)? ", db.isOpen() ? "Yes" : "No"); // Yes
        var id=args.object.id
		db.execSQL(DB.removeFromFavoriteQuote(), ["0", id]).then(id => {
            console.info("INSERT RESULT" + id);
        }, error => {
            console.info("INSERT ERROR" + error);
        });

    }, err => {
        console.info("Failed to open database", err);
        errorAlert("Failed to open database: " + err)
    })
}

exports.notFavoriteNote = notFavoriteNote
exports.removeNote = removeNote
exports.modifyNote = modifyNote
exports.onLoaded=onLoaded