import { Component, OnInit, Renderer2 } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { WelcomeComponent } from './component/welcome/welcome.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.less']
})
export class AppComponent implements OnInit {
  public isDarkmode = localStorage.getItem("theme") !== "light";

  constructor(private renderer: Renderer2, private dialog: MatDialog) {
    if (this.isDarkmode) {
      this.renderer.addClass(document.body, 'darkmode');
    }
  }

  ngOnInit(): void {
    if(localStorage.getItem('hideWelcomeMessage') == null){
      this.dialog.open(WelcomeComponent,
        {
          width: '60rem',
          height: '35rem',
        })
    }
  }

  toggleDarkmode(isDarkmode: boolean) {
    this.isDarkmode = isDarkmode;
    if (this.isDarkmode) {
      this.renderer.addClass(document.body, 'darkmode');
    } else {
      this.renderer.removeClass(document.body, 'darkmode');
    }
    localStorage.setItem("theme", isDarkmode ? "dark" : "light");
  }
}
