import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { loadClasses } from 'src/app/state/class.action';

@Component({
  selector: 'app-stunden-overview',
  templateUrl: './stunden-overview.component.html',
  styleUrls: ['./stunden-overview.component.less']
})
export class StundenOverviewComponent implements OnInit {

  constructor(private store: Store) { }

  ngOnInit(): void {
    this.store.dispatch(loadClasses());
  }
};
