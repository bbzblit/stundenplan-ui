import { NonNullAssert } from '@angular/compiler';
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { Class } from 'src/app/model/class.model';
import { clear, loadAppointments } from 'src/app/state/appointment/appointment.action';
import { selectAllClasses } from 'src/app/state/class/class.selector';

@Component({
  selector: 'app-class-selector',
  templateUrl: './class-selector.component.html',
  styleUrls: ['./class-selector.component.less']
})
export class ClassSelectorComponent implements OnInit {


  constructor(private store: Store, private router :  Router, private route: ActivatedRoute) { };

  private NON_ALPHABETIC = /[^A-Za-z0-9]/g;
  private availableClasses = new Array<Class>();
  public previewClasses = new Array<Class>();
  public defaultClass : Class = {id : -1, name : ""};

  
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

  loadDefaultClass(): void{
    let storageId = this.route.snapshot.queryParamMap.get('classId') || localStorage.getItem("classId")
    if(storageId == null){
      return;
    }
    let targetId = +storageId;
    this.availableClasses.forEach(
      cls => {
        if(cls.id === targetId){
          this.defaultClass = cls;
          this.reloadAppointments(cls.id, null);
        }
      }
    )
  }
  ngOnInit(): void {
    this.store.select(selectAllClasses).subscribe(classes => {this.availableClasses = classes; this.loadDefaultClass() ;this.previewClasses = classes });
  }

  clearAppointment(){
    this.store.dispatch(clear());
    this.previewClasses = [...this.availableClasses];
  }


  reloadAppointments(id: number, event : any | null) {
    if (event != null && !event.isUserInput) {
      return;
    }
    localStorage.setItem("classId", id + "");
    this.router.navigate(
      [],
      {
        relativeTo: this.route,
        queryParams: { classId: id },
        queryParamsHandling: 'merge'
      });
    this.store.dispatch(loadAppointments({ classId: id }));
  }

}
