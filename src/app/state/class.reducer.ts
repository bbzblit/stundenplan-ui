import { createReducer, on } from "@ngrx/store";
import { Class } from "../model/class.model";
import { loadClassesSuccess } from "./class.action";

const INITIAL_STATE: Array<Class> = [];

export const classReducer = createReducer(
    INITIAL_STATE,
    on(loadClassesSuccess, (state, {classes}) => state.concat(classes))
)