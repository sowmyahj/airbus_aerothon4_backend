import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-note',
  templateUrl: './note.component.html',
  styleUrls: ['./note.component.css']
})
export class NoteComponent implements OnInit {
  @Input() note:any;
  @Input() onDelete:any;
  constructor() { 
  }
  onUpdate(note:any){
    note.updating = true;
  }
  ngOnInit(): void {}

  async doneUpdating(note:any,d:any){
    const res = await fetch('http://localhost:3002/api/notes/update', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        value: d.value,
        id: note.id
      })
    });
    const data = await res.json();

    if(data.done){
      note.updating = false;
      note.msg = data.note.value;
    }
    note.updating = false;
  }
}
