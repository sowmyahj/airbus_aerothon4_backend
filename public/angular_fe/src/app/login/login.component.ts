import { Component, OnInit } from '@angular/core';
import { AppComponent } from '../app.component';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  constructor() { 
  }

  ngOnInit(): void {
  }

 async onFormSubmit(sub:any){
    const res = await fetch('http://localhost:3002/api/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(sub.form.value)
    })
    const data = await res.json()
    if(data.response == "success"){
      AppComponent.loginForm = false;
    }
  }

}
