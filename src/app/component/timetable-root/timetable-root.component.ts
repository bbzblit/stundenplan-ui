import { ListKeyManager } from '@angular/cdk/a11y';
import { Component, Input, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Appointment } from 'src/app/model/appointment.model';
import { Notification } from 'src/app/model/notification.model';
import { selectAppointmentsOfWeek } from 'src/app/state/appointment.selector';

@Component({
  selector: 'app-timetable-root',
  templateUrl: './timetable-root.component.html',
  styleUrls: ['./timetable-root.component.less']
})
export class TimetableRootComponent implements OnInit {


  public startTime = 7;
  public endTime = 19;
  public days = Array(7);
  public groupedAppointments: Array<Array<Appointment>> = [];
  private startDate = new Date();
  private dayNames = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
  public loadAppointments(appointments: Array<Appointment>, start: Date) {


    let day = -1;

    let modefiedAppointments: Array<Appointment> = [];
    appointments.forEach(appointment => { appointment = { ...appointment }; appointment.appointment_end = new Date(appointment.appointment_end); appointment.appointment_start = new Date(appointment.appointment_start); modefiedAppointments.push(appointment) })

    appointments = modefiedAppointments;

    while (day++ < 6) {
      this.groupedAppointments[day] = appointments.filter(appointment => appointment.appointment_start.getDay() == start.getDay());
      start.setDate(start.getDate() + 1);
    }
    console.log(this.groupedAppointments);
  }

  constructor(private store: Store) {
    this.startDate.setDate(this.startDate.getDate() + (1 + 7 - this.startDate.getDay()) % 7);
    this.startDate.setHours(0, 0, 0, 0);
    this.groupedAppointments.length = 7;
    let _end_date = new Date(this.startDate.getTime());
    _end_date.setDate(_end_date.getDate() + 7);

    this.store.select(selectAppointmentsOfWeek({ start: this.startDate, end: _end_date })).subscribe(appointments => { console.log(appointments); this.loadAppointments(appointments, new Date(this.startDate.getTime())) });
  }

  ngOnInit(): void {


  }

  getDate(div: number) {
    let _tmp_date = new Date(this.startDate.getTime());
    _tmp_date.setDate(_tmp_date.getDate() + div);
    return this.dayNames[_tmp_date.getDay()] + " " + _tmp_date.getDate() + "." + _tmp_date.getMonth();
  }
}
