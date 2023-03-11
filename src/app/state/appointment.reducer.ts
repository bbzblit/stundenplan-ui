import { createReducer, on } from "@ngrx/store";
import { Appointment } from "../model/appointment.model";
import { loadAppointmentsSuccess } from "./appointment.action";

const INITIAL_STATE: Array<Appointment> = [];

export const appointmentReducer = createReducer(
    INITIAL_STATE,
    on(loadAppointmentsSuccess, (state, {appointments}) => appointments)
)