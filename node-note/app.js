const fs = require('fs');
const yargs = require('yargs');

const notes = require('./notes');

const titleOptions = {
    describe: "Title of note",
    demand: true,
    alias: "t"
};
const bodyOptions = {
    describe: "Content of note",
    demand: true,
    alias: "b"
};
var args = yargs.command('add', 'Add a new note', {
    title: titleOptions,
    body: bodyOptions
}).command('remove', 'To remove the exisiting note', {
    title: titleOptions
}).command('get', 'To get the exisiting note', {
    title: titleOptions
}).command('getall', 'To get all exisiting notes').help().argv;
var command = args._[0];

//to log 
var logNote = (note) => {
    console.log("---");
    console.log(`Title:${note.title}`);
    console.log(`Body:${note.body}`);
}

if (command == 'add') {
    var note = notes.addNote(args.title, args.body);
    if (note) {
        console.log("added note:");
        logNote(note);
    } else {
        console.log("note already exists")
    }
} else if (command == 'remove') {
    var noteRemoved = notes.removeNote(args.title);
    var msg = noteRemoved ? "Note was removed" : "Note not found";
    console.log(msg);
} else if (command == 'get') {
    var note = notes.getNote(args.title);
    if (note) {
        console.log("Found Note:");
        logNote(note);
    } else {
        console.log("Note not found");
    }
} else if (command == 'getall') {
    var allNotes = notes.getAll();
    console.log(`Fetching all notes: ${allNotes.length} notes`)
    allNotes.forEach((note) => logNote(note));
} else {
    console.log("command not reconized");
}
23341512