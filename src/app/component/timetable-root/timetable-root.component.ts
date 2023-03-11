import { Component, Input, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Appointment } from 'src/app/model/appointment.model';
import { Notification } from 'src/app/model/notification.model';

@Component({
  selector: 'app-timetable-root',
  templateUrl: './timetable-root.component.html',
  styleUrls: ['./timetable-root.component.less']
})
export class TimetableRootComponent implements OnInit{


  public startTime = 7;
  public endTime = 19;

  public testAppointments: Array<Appointment> = [{ appointment_end: new Date("2023-03-10 16:25:00"), appointment_start: new Date("2023-03-10 15:40:00"), class_id: 3259168, id: 2410, place: "L-Zimmer 104", summary: "Lehrperson: Dietrich J\ufffdrg\\nKlasse: AMM 19-23", title: "Allgemeinbildung" }]

  constructor(private store : Store){}

  ngOnInit(): void {

    
  }
}
