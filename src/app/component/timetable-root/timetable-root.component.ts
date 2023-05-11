import { ListKeyManager } from '@angular/cdk/a11y';
import { IfStmt } from '@angular/compiler';
import { AfterContentInit, Component, Input, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Subject } from 'rxjs';
import { Appointment } from 'src/app/model/appointment.model';
import { Notification } from 'src/app/model/notification.model';
import { selectAppointmentsOfWeek } from 'src/app/state/appointment/appointment.selector';
import { selectDate } from 'src/app/state/date/date.selector';

@Component({
  selector: 'app-timetable-root',
  templateUrl: './timetable-root.component.html',
  styleUrls: ['./timetable-root.component.less']
})
export class TimetableRootComponent implements OnInit, AfterContentInit {


  public startTime = 7;
  public shortestAppointment = -1;
  public endTime = 19;
  public days = Array(7);
  public groupedAppointments: Array<Array<Appointment>> = [];
  public startDate = new Date();
  private dayNames = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
  private now = new Date();
  public updateEvents: Subject<{start : number, end : number}> = new Subject<{start : number, end : number}>();


  public loadAppointments(appointments: Array<Appointment>, start: Date) {

    let day = -1;

    let modefiedAppointments: Array<Appointment> = [];
    appointments.forEach(appointment => { appointment = { ...appointment }; appointment.appointment_end = new Date(appointment.appointment_end); appointment.appointment_start = new Date(appointment.appointment_start); modefiedAppointments.push(appointment) })

    appointments = modefiedAppointments;
    let _start = 24, _end = 0;

    if(appointments.length !== 0){
      this.shortestAppointment = -1;
    }
    
    appointments.forEach(appointment => {
      if(appointment.appointment_end.getHours() >= _end){
        _end = appointment.appointment_end.getHours();
      }
      if(appointment.appointment_start.getHours() <= _start){
        _start = appointment.appointment_start.getHours();
      }

      let _div = appointment.appointment_end.getHours() 
      + (appointment.appointment_start.getMinutes() < appointment.appointment_end.getMinutes() ? 1 : 0) 
      - appointment.appointment_start.getHours();

      if(_div < this.shortestAppointment || this.shortestAppointment === -1) {
        this.shortestAppointment = _div
      }

    })

    if(_start < _end){
      this.startTime = _start;
      this.endTime = _end + 1;
    }
    
    while (day++ < 6) {
      this.groupedAppointments[day] = appointments.filter(appointment => appointment.appointment_start.getDay() == start.getDay());
      start.setDate(start.getDate() + 1);
    }

    this.updateEvents.next({start : this.startTime, end : this.endTime});
  }

  loadAttachmentsOfWeek(){
    this.startDate.setDate(this.startDate.getDate() + (1 - this.startDate.getDay()) % 7);
    this.startDate.setHours(0, 0, 0, 0);
    this.groupedAppointments.length = 7;
    let _end_date = new Date(this.startDate.getTime());
    _end_date.setDate(_end_date.getDate() + 7);
    this.store.select(selectAppointmentsOfWeek({ start: this.startDate, end: _end_date })).subscribe(appointments => this.loadAppointments(appointments, new Date(this.startDate.getTime())));

  }

  constructor(private store: Store) {
    this.loadAttachmentsOfWeek();
    this.store.select(selectDate).subscribe((date) => {this.startDate = date; this.loadAttachmentsOfWeek()});
  }

  ngAfterContentInit(): void {
    let callendarScroll =  document.getElementById("table-scroll")
    if(!callendarScroll){
      return;
    }
    callendarScroll.scrollTop = 1280/12 * (this.startTime - this.now.getHours());
  }

  ngOnInit(): void {
    
  }

  getDayName(div : number){
    let _tmp_date = new Date(this.startDate.getTime());
    _tmp_date.setDate(_tmp_date.getDate() + div);
    return this.dayNames[_tmp_date.getDay()];
  }
  getDate(div: number) {
    let _tmp_date = new Date(this.startDate.getTime());
    _tmp_date.setDate(_tmp_date.getDate() + div);
    return _tmp_date.getDate() + "." + _tmp_date.getMonth();
  }
}
