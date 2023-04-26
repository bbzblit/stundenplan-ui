import { createAction, props } from "@ngrx/store";
import { Class } from "src/app/model/class.model";



export const loadClasses = createAction(
    "[Api] loading all available classes"
);

export const loadClassesSuccess = createAction(
    "[Collection] success loading all available classes",
    props<{ classes: Array<Class> }>()
);
