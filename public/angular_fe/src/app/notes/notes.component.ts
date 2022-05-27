import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-notes',
  templateUrl: './notes.component.html',
  styleUrls: ['./notes.component.css']
})
export class NotesComponent implements OnInit {
  notes:Array<any> = []
  constructor() { }

  async ngOnInit() {
    const res = await fetch('http://localhost:3002/api/notes');
    const data = await res.json();
    console.log(data);
    for(let note of data.notes){
      this.notes.push({
        id: note.id,
        msg: note.value,
        updating: false
      });
    }
    console.log(this.notes);
  }
  async onEnterUp(e:any){
      const res = await fetch('http://localhost:3002/api/notes/add', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          note: e.value
        })
      });
      const data = await res.json();
      if(data.done){
        this.notes.push({
          id: data.note.id,
          msg: data.note.value,
          updating: false
        });
      }
      e.value = ""
  }

  onDelete = async (note:any)=>{
    console.log(this.notes)
    const res = await fetch('http://localhost:3002/api/notes/delete', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        id: note.id
      })
    });
    const data = await res.json();
    if(data.done){
      const index = this.notes.indexOf(note);
      this.notes.splice(index,1);
    }
  }
}
