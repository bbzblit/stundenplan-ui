import { NonNullAssert } from '@angular/compiler';
import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Class } from 'src/app/model/class.model';
import { clear, loadAppointments } from 'src/app/state/appointment.action';
import { loadClasses } from 'src/app/state/class.action';
import { selectAllClasses } from 'src/app/state/class.selector';

@Component({
  selector: 'app-class-selector',
  templateUrl: './class-selector.component.html',
  styleUrls: ['./class-selector.component.less']
})
export class ClassSelectorComponent implements OnInit {


  constructor(private store: Store) { };

  private NON_ALPHABETIC = /[^A-Za-z0-9]/g;
  private availableClasses = new Array<Class>();
  public previewClasses = new Array<Class>();

  filterClasses(key: string): void {
    let keys = key.toLowerCase().split(" ");

    for (let idx: number = keys.length; idx--;) {
      keys[idx] = keys[idx].replace(this.NON_ALPHABETIC, "")
    }

    let _temp_classes = [...this.availableClasses];

    for (let idx: number = _temp_classes.length - 1; --idx;) {
      _temp_classes[idx] = { ..._temp_classes[idx] };
      _temp_classes[idx].name = _temp_classes[idx].name.replace(this.NON_ALPHABETIC, "").toLowerCase();
    }
    let validKeys: Array<number> = [];
    _temp_classes.forEach(cls => {
      if (keys.every(key => cls.name.includes(key))) {
        validKeys.push(cls.id);
      }
    });
    this.previewClasses = this.availableClasses.filter(cls => validKeys.includes(cls.id));

  }

  ngOnInit(): void {
    this.store.select(selectAllClasses).subscribe(classes => { this.availableClasses = classes; this.previewClasses = classes });
  }

  clearAppointment(){
    this.store.dispatch(clear());
  }


  reloadAppointments(id: number, event : any) {
    if (!event.isUserInput) {
      return;
    }
    this.store.dispatch(loadAppointments({ classId: id }));
  }

}
