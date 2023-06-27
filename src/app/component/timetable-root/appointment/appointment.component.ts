import { Component, Input } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Appointment } from 'src/app/model/appointment.model';
import { DetailedEventViewComponent } from './detailed-event-view/detailed-event-view.component';

@Component({
  selector: 'app-appointment',
  templateUrl: './appointment.component.html',
  styleUrls: ['./appointment.component.less']
})
export class AppointmentComponent {

  @Input("appointment") public appointment!: Appointment;
  public rainbowMode: boolean = false;
  public lastTimestamp = -1;
  constructor(private dialog: MatDialog){}

  pad(n: number) {
    return (n < 10) ? '0' + n : n.toString();
  }

  openDetailedView(){
    let dialogRef = this.dialog.open(DetailedEventViewComponent, {
      height: '20rem',
      width: '40rem',
      data : {appointment: this.appointment }
    });
  }

  toggleRainbowMode(flag: boolean, event: Event){
    event.preventDefault();
    if(this.lastTimestamp === event['timeStamp']){
      return;
    }
    
    this.lastTimestamp = event['timeStamp'];

    this.rainbowMode = flag;
  }
}
