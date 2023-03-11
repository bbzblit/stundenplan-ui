import { Component, Input } from '@angular/core';
import { Appointment } from 'src/app/model/appointment.model';

@Component({
  selector: 'app-appointment',
  templateUrl: './appointment.component.html',
  styleUrls: ['./appointment.component.less']
})
export class AppointmentComponent {

  @Input("appointment") public appointment! : Appointment;

}
