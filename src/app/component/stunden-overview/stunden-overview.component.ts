import { formatDate } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Route, Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { loadClasses } from 'src/app/state/class/class.action';
import { selectDate } from 'src/app/state/date/date.selector';

@Component({
  selector: 'app-stunden-overview',
  templateUrl: './stunden-overview.component.html',
  styleUrls: ['./stunden-overview.component.less']
})
export class StundenOverviewComponent implements OnInit {

  public DATE = "";

  constructor(private store: Store, private route: ActivatedRoute) { }

  getMonday(date : Date): Date{
      let weekDay = date.getDay();
      date.setDate(date.getDate() - weekDay + (!weekDay ? -6 : 1));
      return date;
    }

  ngOnInit(): void {
    this.store.dispatch(loadClasses());
    
    this.DATE = this.route.snapshot.queryParamMap.get('period') || formatDate(this.getMonday(new Date()), "dd-MM-yyyy", "en-US");

    this.store.select(selectDate).subscribe((date) => this.DATE = formatDate(this.getMonday(date), "dd-MM-yyyy", "en-US") );
    
    console.log(this.DATE);
    if(!this.DATE.match(/(\d{2}-(0?[1-9]|1[0-2])-2\d{3})/)){
      this.DATE = formatDate(this.getMonday(new Date()), "dd-MM-yyyy", "en-US");
    }
  }
};
