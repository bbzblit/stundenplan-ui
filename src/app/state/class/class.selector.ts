import { createFeature, createFeatureSelector, createSelector } from "@ngrx/store";
import { Class } from "src/app/model/class.model";


export const selectAllClasses = createFeatureSelector<Array<Class>>("classes");