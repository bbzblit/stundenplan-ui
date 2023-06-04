import { Component, Renderer2 } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.less']
})
export class AppComponent {
  public isDarkmode = localStorage.getItem("theme") !== "light";

  constructor(private renderer: Renderer2) {
    if (this.isDarkmode) {
      this.renderer.addClass(document.body, 'darkmode');
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
