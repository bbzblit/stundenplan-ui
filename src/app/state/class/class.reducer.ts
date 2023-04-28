import { createReducer, on } from "@ngrx/store";
import { ClassSelectorComponent } from "src/app/component/stunden-overview/class-selector/class-selector.component";
import { Class } from "src/app/model/class.model";
import { loadClassesSuccess } from "./class.action";

const INITIAL_STATE: Array<Class> = [];


function generateVowel(str : String) : String{
    return str.replace("ae", "ä").replace("ue", "ü").replace("oe", "ö");
}


function generateVowelForClasses(classes : Array<Class>): Array<Class>{
    let updatedClasses : Array<Class> = [];
    classes.forEach(cls => {
        cls = {...cls};
        cls.name = generateVowel(cls.name)
        updatedClasses.push(cls);
    })

    return updatedClasses;
}

export const classReducer = createReducer(
    INITIAL_STATE,
    on(loadClassesSuccess, (state, {classes}) => generateVowelForClasses(classes))
)