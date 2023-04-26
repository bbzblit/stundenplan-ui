import { createAction, props } from "@ngrx/store";

export const setDate = createAction(
    "[Storage] Setting Date",
    props<{date : Date}>()
);