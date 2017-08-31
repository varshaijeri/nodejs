// adding,removing,get,getAll

const fs = require('fs');

//reading the file
var fetchNotes = () => {
    //grab all the data from the file to retain the existing values
    //handling exception if the file doesnt exists
    try{
        var notesString = fs.readFileSync('notes-data.json');
        return (JSON.parse(notesString));
    }catch(e){
        return [];
    }
}

//write the data to the file
var saveNotes = (notes) => {
    fs.writeFileSync('notes-data.json',JSON.stringify(notes));
}
var addNote = (title,body) =>{
    var notes = fetchNotes();
    var note = {title,body};

    //check for duplicate notes by title and then push the note inside it.
    var duplicateNotes = notes.filter((note) => note.title === title);
    if(duplicateNotes.length === 0){
        notes.push(note);
        saveNotes(notes);
        return note;
    }
}

var removeNote = (title) =>{
    //fetch the notes
    var notes = fetchNotes();
    //filter the notes,remove the element from array
    var filteredNotes = notes.filter((note) => note.title !== title);
    //save the notes back to the file
    saveNotes(filteredNotes);
    return notes.length!==filteredNotes.length;
}

var getNote = (title)=>{
    //fetch all the notes from file
    var notes = fetchNotes();
    //filter to find the note that matches eith title
    var foundNote = notes.filter((note) => note.title === title);
    //return found note
    return foundNote.length !==0 ? foundNote[0] : undefined;
}

var getAll = () =>{
    return fetchNotes();
}

module.exports = {
    addNote,
    removeNote,
    getNote,
    getAll
};