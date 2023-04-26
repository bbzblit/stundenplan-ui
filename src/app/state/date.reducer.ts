import { createReducer, on } from "@ngrx/store";
import { setDate } from "./date.action";

const INITIAL_STATE: Date = new Date();

export const dateReducer = createReducer(
    INITIAL_STATE,
    on(setDate, (state, {date}) => date)
);