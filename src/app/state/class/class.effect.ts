import { Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { catchError, map, mergeMap, of } from "rxjs";
import { ClassService } from "src/app/services/class.service";
import { addNotification } from "../error.action";
import { loadClasses, loadClassesSuccess } from "./class.action";

@Injectable()
export class ClassEffect {
    constructor(private actions$: Actions, private classService: ClassService) { }

    getClasses$ = createEffect(() => this.actions$.pipe(
        ofType(loadClasses),
        mergeMap(() => this.classService.loadAllClasses().pipe(
            map((classes) => loadClassesSuccess({ classes: classes })),
            catchError(error => of(addNotification({ desc: "Someting went wrong requesting all classes. Try it later again", isError: true })))
        )
        )
    ))
};