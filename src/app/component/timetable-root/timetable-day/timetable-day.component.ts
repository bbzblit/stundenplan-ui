import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-timetable-day',
  templateUrl: './timetable-day.component.html',
  styleUrls: ['./timetable-day.component.less']
})
export class TimetableDayComponent {

  @Input("title") public title : string = "REMOVE IN PROD";

  @Input("showIndex") public showIndex : boolean = false;

}
