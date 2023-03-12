import { Component, Input, OnInit } from '@angular/core';
import { Appointment } from 'src/app/model/appointment.model';

@Component({
  selector: 'app-timetable-day',
  templateUrl: './timetable-day.component.html',
  styleUrls: ['./timetable-day.component.less']
})
export class TimetableDayComponent implements OnInit{

  @Input("appointments") appointments: Array<Appointment> = [];

  @Input("showIndex") public showIndex : boolean = false;

  @Input("start") public start : number = 7;
  @Input("end") public end : number = 19;
  

  public hourPercent! : number;

  ngOnInit(){
    this.hourPercent = 100 / (this.end - this.start); 
  }

}
