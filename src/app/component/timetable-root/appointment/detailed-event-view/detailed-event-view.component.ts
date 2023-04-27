import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Appointment } from 'src/app/model/appointment.model';

@Component({
  selector: 'app-detailed-event-view',
  templateUrl: './detailed-event-view.component.html',
  styleUrls: ['./detailed-event-view.component.less']
})
export class DetailedEventViewComponent {
  public appointment : Appointment;

  constructor(@Inject(MAT_DIALOG_DATA) public data: {appointment: Appointment}){
    this.appointment = data.appointment;
  }

  wrapLine(line : String) : String{
    return line.replace(/\\n/g, " ");
  }
  
}
