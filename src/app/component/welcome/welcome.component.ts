import { Component } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-welcome',
  templateUrl: './welcome.component.html',
  styleUrls: ['./welcome.component.less']
})
export class WelcomeComponent {

  constructor(public dialogRef: MatDialogRef<WelcomeComponent>){}

  neverShowDialogAgain(){
    localStorage.setItem("hideWelcomeMessage", "true  ");
    this.dialogRef.close();
  }
}
