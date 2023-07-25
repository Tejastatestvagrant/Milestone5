 export default class Note
{
  

    constructor(title,content)
    {
       this.title=title;
       this.content=content;
    }
    displayNote() {
        console.log(`Title: ${this.title} \n Content: ${this.content}`);
      }
}

