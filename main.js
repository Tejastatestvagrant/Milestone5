import Note from './src/Note.js'

function welcomeMessage() {
    console.log("Welcome to the Note-Taking Application!");
  }
  
  welcomeMessage();

  let noteList= [];


  let createNote=(title,content)=>{
    let newNote=new Note(title,content);
    noteList.push(newNote);

  }

 
  createNote('First Note', 'This is the first note.');
  createNote('Second Note', 'This is the second note.');
  createNote('Third Note', 'This is the third note.');

  
  const displayAllNotes= ()=>{for (const note of noteList) {
    note.displayNote();
    console.log('---');
  }}

  const deleteNote=(title)=>{

    const index=noteList.findIndex((note)=>{
      return note.title===title
    })

    if(index!=-1)
    {
      noteList.splice(index,1);
    }
    {
      console.log(`this note  is not there in list `);
    }

    console.table(noteList);


  }


  deleteNote('First Note');