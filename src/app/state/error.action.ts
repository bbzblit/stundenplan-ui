import { createAction, props } from "@ngrx/store";
import { Notification } from "../model/notification.model";



export const addNotification = createAction(
    '[Col] adding Notification to collection',
    props<Notification>()
);