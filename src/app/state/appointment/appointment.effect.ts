import { Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { catchError, map, mergeMap, of } from "rxjs";
import { AppointmentService } from "src/app/services/appointment.service";
import { addNotification } from "../error.action";
import { loadAppointments, loadAppointmentsSuccess } from "./appointment.action";

@Injectable()
export class AppointmentEffect {
    constructor(private actions$: Actions, private appointmentService: AppointmentService) { }

    getClasses$ = createEffect(() => this.actions$.pipe(
        ofType(loadAppointments),
        mergeMap(({classId}) => this.appointmentService.loadAppointmentsByClass(classId).pipe(
            map((appointments) => loadAppointmentsSuccess({ appointments: appointments })),
            catchError(error => of(addNotification({ desc: "Someting went wrong requesting Appointments by the class id " + classId, isError: true })))
        )
        )
    ))
};