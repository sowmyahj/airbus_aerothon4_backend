import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  static loginForm:Boolean = true;

  get loginF(){
    return AppComponent.loginForm;
  }
  title = 'my-app';
}
