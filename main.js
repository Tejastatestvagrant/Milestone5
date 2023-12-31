import { promisify } from "util";
import Note from "./src/Note.js";
import fs, { writeFileSync } from "fs";
import {InputInValidError,FileAccessError ,InvalidJsonError} from "./error.js";
import PromptSync from "prompt-sync";
const prompt =PromptSync();
function welcomeMessage() {
  console.log("Welcome to the Note-Taking Application!");
}

welcomeMessage();

let noteList = [];

let createNote=(title,content)=>{

  const validition =isValidateInput(title,content);
  if(validition!==true)
  {
    console.log(err);
    return;
  }

  let newNote=new Note(title,content);
  noteList.push(newNote);
}


const displayAllNotes = () => {
  for (const note of noteList) {
    note.displayNote();
    console.log("---");
  }
};

const deleteNote = (title) => {
     
  {const index = noteList.findIndex((note) => {
    return note.title === title;
  });

  if (index != -1) {
    noteList.splice(index, 1);
  } else {
    console.log(`this note  is not there in list `);
  }

  console.table(noteList);}
};

const editNote = (title, newContent) => {
  
     const validition=isValidateInput(title,newContent)

  if(validition!==true)
  {
    console.log(err);
    return;
  }
  
  const edit = noteList.find((note) => note.title === title);
  if (edit) {
    edit.content = newContent;
    console.log(
      `${title} is successfully updated the content as ${newContent}`
    );
  } else {
    console.log(`${title} note is not found `);
  }
  
};



const saveNotes = async () => {
  try {
    const writeFileAsync = promisify(fs.writeFile);
    const jsonData = JSON.stringify(noteList);
    await writeFileAsync('./src/Database.json', jsonData, "utf-8");
    console.log("Successfully updated");
  } catch (err) {
    console.log("Error Occurred " + err);
  }
};

const loadNotes = async () => {
  try{const readFileAsync = promisify(fs.readFile);

  const loadedData = await readFileAsync('./src/Database.json', "utf-8");
  const datas =  JSON.parse(loadedData);

  noteList = datas.map((data) => new Note(data.title, data.content));}
  catch(err)
  {
    if(err instanceof InputInValidError)
    {
      console.log(err.name);
    }
    else if(err instanceof FileAccessError )
    {
      console.log(err.name);
    }
    else if(err instanceof InvalidJsonError )
    {
      console.log(err.name);
    }
    else 
    {
     console.log(err.name);
    }
  }
};



const isValidateInput = (title, content) => {
  const titleRegex = /^[a-zA-Z0-9\s-]{3,}$/g;
  const contentRegex = /.{5,}$/g;

  if (!titleRegex.test(title.trim())) {
    throw new InputInValidError(
      "Error: Title must be at least 3 characters long and can only contain letters, numbers, spaces, and hyphens."
    );
  }

  if (!contentRegex.test(content.trim())) {
    throw new InputInValidError(
      "Error: Content must be at least 5 characters long."
    );
  }

  return true;
};

const search= async(Query)=>{
 
  
 
  return noteList.filter(note => 
    {
    const titleMatch = note.title.toLowerCase().includes(Query.toLowerCase());
    const contentMatch = note.content.toLowerCase().includes(Query.toLowerCase());
    return titleMatch || contentMatch;
  })
}
  

const start = async() => {

  let  userChoice;

  do{

  console.log("\\nMenu:");
  console.log("1. Create a Note");
  console.log("2. Edit a Note");
  console.log("3. Delete a Note");
  console.log("4. Display All Notes");
  console.log("5. Save Notes to a JSON File");
  console.log("6. Load Notes from a JSON File");
  console.log("7. Search");
  console.log("8.Quit");

   userChoice=parseInt(prompt("enter the choose : "))
  switch (userChoice) {
    case 1:
        const title = prompt("Enter note title: ");
        const content = prompt("Enter note content: ");
        createNote(title, content);
        break;
    case 2:
        const titleToEdit = prompt("Enter the title of the note to edit: ");
        const newContent = prompt("Enter the new content for the note: ");
        editNote(titleToEdit, newContent);
        break;
    case 3:
        const titleToDelete = prompt("Enter the title of the note to delete: ");
        deleteNote(titleToDelete);
        break;
    case 4:
        displayAllNotes();
        break;
    case 5:
        await saveNotes();
        break;
    case 6:
        await loadNotes();
        break;
    case 7:
        const result=search(prompt("enter the query to search : "));
        console.table(result);
        break;
   case 8:
    console.log("thanks for using ");
    break;
    default:
        console.log("\\nInvalid choice! Please try again.");
}
  }while(userChoice!==8);



}
start();

