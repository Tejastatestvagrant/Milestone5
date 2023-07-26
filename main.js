import { promisify } from 'util';
import Note from './src/Note.js'
import fs, { writeFileSync } from 'fs';
function welcomeMessage() {
    console.log("Welcome to the Note-Taking Application!");
  }
  
  welcomeMessage();

  let noteList= [];


  // let createNote=(title,content)=>{
  //   let newNote=new Note(title,content);
  //   noteList.push(newNote);

  // }

 
  // createNote('First Note', 'This is the first note.');
  // createNote('Second Note', 'This is the second note.');
  // createNote('Third Note', 'This is the third note.');

  
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

  //  const writeDataToFile= async(data,filename)=>{
       
  //   const jsonData= JSON.stringify(data)

  // fs.writeFile(filename,jsonData,'utf-8',(err)=>{
  //   if(err)
  //   {
  //     console.log(`error occured during writing file`);
  //   }
  //   else{
  //     console.log(`Successfully updated file `);

  //   }
  // })


  const savaFile=async(data,file)=>{

    try{const writeFileAsync = promisify(fs.writeFile);
    const jsonData = JSON.stringify(data);
    await writeFileAsync(file,jsonData,'utf-8');
    console.log("Successfully updated");}
    catch(err)
    {
      console.log("Error Occurred " +err);
    }

  }

  const loadData=async(file)=>{

    const readFileAsync=promisify(fs.readFile);

    const loadedData = await readFileAsync(file,'utf-8');
    const datas= await JSON.parse(loadedData);

   
    noteList=datas.map(data=>new Note(data.title,data.content));
  }




 await loadData('./src/Database.json');
  console.table(noteList);
  



  // deleteNote('Second Note');
  // editNode('First Note' ,'updated first version');
  // savaFile(noteList,'./src/Database.json')
