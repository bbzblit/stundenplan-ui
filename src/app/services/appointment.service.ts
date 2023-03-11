import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Appointment } from '../model/appointment.model';

@Injectable({
  providedIn: 'root'
})
export class AppointmentService {

  constructor(private http : HttpClient) { }


  loadAppointmentsByClass(classId : number){
    return this.http.get<Array<Appointment>>("/api/v1/appointment/?classId=" + classId);
  }
}
