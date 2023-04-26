import { createAction, props } from "@ngrx/store";
import { Appointment } from "../../model/appointment.model";



export const loadAppointments = createAction(
    "[Api] loading all available appoinets of class id",
    props<{classId : number}>()
);

export const loadAppointmentsSuccess = createAction(
    "[Collection] success loading all appointments of class",
    props<{ appointments: Array<Appointment> }>()
);

export const clear = createAction(
    "[Collection] clearing all cached appointments"
)