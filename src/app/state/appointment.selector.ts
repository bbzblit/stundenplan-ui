import { Portal } from "@angular/cdk/portal";
import {  createFeatureSelector, createSelector } from "@ngrx/store";
import { startWith } from "rxjs";
import { Appointment } from "../model/appointment.model";
import { Class } from "../model/class.model";


export const selectAppointments = createFeatureSelector<Array<Appointment>>("appointments");



export const selectAppointmentsOfWeek =  (props: { start: Date, end : Date }) => createSelector(
    selectAppointments,
    (appointments : Array<Appointment>) =>  appointments.filter(appointment => new Date(appointment.appointment_start) >= props.start  && new Date(appointment.appointment_end) <= props.end )
)