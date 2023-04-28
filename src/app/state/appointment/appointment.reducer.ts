import { createReducer, INIT, on } from "@ngrx/store";
import { Appointment } from "src/app/model/appointment.model";
import { clear, loadAppointmentsSuccess } from "./appointment.action";

const INITIAL_STATE: Array<Appointment> = [];

function generateVowel(str : String) : String{
    return str.replace("ae", "ä").replace("ue", "ü").replace("oe", "ö");
}

function generateVowelForAppointment(appointment : Array<Appointment>): Array<Appointment>{
    let updatedAppointments : Array<Appointment> = [];

    appointment.forEach(appointment => {
        appointment = {...appointment};
        appointment.place = generateVowel(appointment.place);
        appointment.summary = generateVowel(appointment.summary);
        appointment.title = generateVowel(appointment.title);
        updatedAppointments.push(appointment);
    })
    return updatedAppointments;
}

export const appointmentReducer = createReducer(
    INITIAL_STATE,
    on(loadAppointmentsSuccess, (state, {appointments}) => generateVowelForAppointment(appointments)),
    on(clear, (state) => INITIAL_STATE)
)