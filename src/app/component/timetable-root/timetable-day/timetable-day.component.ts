import { Component, Input, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Appointment } from 'src/app/model/appointment.model';

@Component({
  selector: 'app-timetable-day',
  templateUrl: './timetable-day.component.html',
  styleUrls: ['./timetable-day.component.less']
})
export class TimetableDayComponent implements OnInit{

  @Input("appointments") appointments: Array<Appointment> = [];

  @Input("showIndex") public showIndex : boolean = false;

  @Input("updateEvetSize")  updateEventSize!: Observable<{start : number, end : number}>;
  
  public end : number = 19;
  public start : number = 7;
  public hourPercent! : number;

  ngOnInit(){

    this.updateEventSize.subscribe(({start, end}) => {this.hourPercent = 100 / (end - start); this.start = start, this.end = end});
    this.hourPercent = 100 / (this.start - this.end); 
  }

}
