import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Class } from '../model/class.model';
import { loadClasses } from '../state/class.action';
import { selectAllClasses } from '../state/class.selector';

@Component({
  selector: 'app-class-selector',
  templateUrl: './class-selector.component.html',
  styleUrls: ['./class-selector.component.less']
})
export class ClassSelectorComponent implements OnInit {

  constructor(private store : Store){};

  public availableClasses = new Set<Class>();

  ngOnInit(): void {
    this.store.dispatch(loadClasses());
    this.store.select(selectAllClasses).subscribe(classes => {this.availableClasses.clear();classes.forEach(cls => this.availableClasses.add(cls))});
  }



}
