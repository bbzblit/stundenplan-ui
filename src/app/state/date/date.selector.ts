import { createFeatureSelector } from "@ngrx/store";

export const selectDate = createFeatureSelector<Date>("date");