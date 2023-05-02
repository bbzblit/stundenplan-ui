import { createReducer, on } from "@ngrx/store";
import { setDate } from "./date.action";

function getMonday(date: Date): Date {
    let weekDay = date.getDay();
    date.setDate(date.getDate() - weekDay + (!weekDay ? -6 : 1));
    return date;
}

const INITIAL_STATE: Date = getMonday(new Date());

export const dateReducer = createReducer(
    INITIAL_STATE,
    on(setDate, (state, { date }) => date)
);