import { formatDate } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Route, Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { loadClasses } from 'src/app/state/class.action';

@Component({
  selector: 'app-stunden-overview',
  templateUrl: './stunden-overview.component.html',
  styleUrls: ['./stunden-overview.component.less']
})
export class StundenOverviewComponent implements OnInit {

  public DATE = "";

  constructor(private store: Store, private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.store.dispatch(loadClasses());
    this.DATE = this.route.snapshot.queryParamMap.get('period') || formatDate(new Date(), "yyyy-MM", "en-US");

    if(!this.DATE.match(/2\d{3}-(0[1-9]|1[0-2])/)){
      this.DATE = formatDate(new Date(), "yyyy-MM", "en-US");
    }
  }
};
