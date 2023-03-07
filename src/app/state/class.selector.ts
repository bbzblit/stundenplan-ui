import { createFeature, createFeatureSelector, createSelector } from "@ngrx/store";
import { Class } from "../model/class.model";


export const selectAllClasses = createFeatureSelector<Array<Class>>("classes");