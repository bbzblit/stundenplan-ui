import { DATE_PIPE_DEFAULT_OPTIONS } from '@angular/common';
import { Component, Injectable } from '@angular/core';
import { DateAdapter, MAT_DATE_LOCALE } from '@angular/material/core';

import {
  MatDateRangeSelectionStrategy,
  DateRange,
  MAT_DATE_RANGE_SELECTION_STRATEGY,
} from '@angular/material/datepicker';
import { ActivatedRoute, Route, Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { setDate } from 'src/app/state/date/date.action';

@Injectable()
export class WeekSelectorStrategy implements MatDateRangeSelectionStrategy<string> {

  constructor(private _dateAdapter: DateAdapter<string>) { }

  selectionFinished(date: string | null): DateRange<string> {
    return this._createFiveDayRange(date);
  }

  createPreview(activeDate: string | null): DateRange<string> {
    return this._createFiveDayRange(activeDate);
  }

  private _createFiveDayRange(date: string | null): DateRange<any> {
    let d = new Date();
    if (date) {
      d = new Date(date)
    }
    let weekDay = d.getDay();
    let diff = d.getDate() - weekDay + (!weekDay ? -6 : 1);
    return new DateRange<any>(new Date(d.setDate(diff)), new Date(d.setDate(diff + 6)));
  }
}

@Component({
  selector: 'app-daypicker',
  templateUrl: './daypicker.component.html',
  styleUrls: ['./daypicker.component.less'],
  providers: [
    {
      provide: MAT_DATE_RANGE_SELECTION_STRATEGY,
      useClass: WeekSelectorStrategy,
    },
    { provide: MAT_DATE_LOCALE, useValue: 'de-De' }
  ],
})
export class DaypickerComponent {

  constructor(private route : ActivatedRoute, private router : Router, private store : Store){}

  setStartDate(input : any){
    let date = new Date(input["value"]);
    console.log(date);

    let strDate : string = date.getDate() + "-" + (date.getMonth() + 1) + "-" + date.getFullYear();
    this.store.dispatch(setDate({date : date}));
    this.router.navigate(
      [], 
      {
        relativeTo: this.route,
        queryParams: { period: strDate },
        queryParamsHandling: 'merge'
      });
  }

}
