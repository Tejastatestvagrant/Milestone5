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
    }
    )


    if(index!=-1)
    {
      noteList.splice(index,1);
    }else
    {
      console.log(`this note  is not there in list `);
    }

    console.table(noteList);


  }

  const editNode=(title ,newContent)=>{

    const edit=noteList.find((note)=> note.title===title);
    if(edit)
    {
      edit.content=newContent;
      console.log(`${title} is successfully updated the content as ${newContent}`);
    }else{
      console.log(`${title} note is not found `);
    }

  }



  deleteNote('Second Note');
  editNode('First Note' ,'updated first version');
  displayAllNotes();