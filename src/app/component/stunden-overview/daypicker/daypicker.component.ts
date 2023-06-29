import { DATE_PIPE_DEFAULT_OPTIONS, formatDate } from '@angular/common';
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
import { selectDate } from 'src/app/state/date/date.selector';

@Injectable()
export class WeekSelectorStrategy implements MatDateRangeSelectionStrategy<string> {

  constructor() { }

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
    { provide: MAT_DATE_LOCALE, useValue: 'de-CH' }
  ],
})
export class DaypickerComponent {

  getMonday(date: Date): Date {
    let weekDay = date.getDay();
    date.setDate(date.getDate() - weekDay + (!weekDay ? -6 : 1));
    return date;
  }

  private now: Date = this.getMonday(new Date());
  public startDate!: String;
  public endDate!: String;

  updateDate() {
    this.startDate = formatDate(this.now, "dd.MM.yyyy", "en-US");
    let localNow = new Date(this.now);
    localNow.setDate(localNow.getDate() + 6);
    this.endDate = formatDate(localNow, "dd.MM.yyyy", "en-US");
  }

  constructor(private route: ActivatedRoute, private router: Router, private store: Store, private dateAdapter: DateAdapter<Date>) {
    this.updateDate();
    this.store.select(selectDate).subscribe(date => { this.now = date; this.updateDate() });
    this.dateAdapter.setLocale("de-CH");
  }

  setStartDate(input: any) {
    let date = new Date(input["value"]);
    this.updateStorageDate(date);
  }


  updateStorageDate(date: Date) {
    let strDate: string = date.getDate() + "-" + (date.getMonth() + 1) + "-" + date.getFullYear();
    this.store.dispatch(setDate({ date: date }));
    let today = new Date();
    today.setHours(0, 0, 0, 0);

    if (this.now.getTime() === this.getMonday(today).getTime()) {
      strDate = "now";
    }
    this.router.navigate(
      [],
      {
        relativeTo: this.route,
        queryParams: { period: strDate },
        queryParamsHandling: 'merge'
      });
  }

  addWeek() {
    let currentDate = new Date(this.now);
    currentDate.setDate(currentDate.getDate() + 7);
    this.updateStorageDate(currentDate);
  }

  removeWeek() {
    let currentDate = new Date(this.now);
    currentDate.setDate(currentDate.getDate() - 7);
    this.updateStorageDate(currentDate);
  }

  showCurrentWeek() {
    let currentWeekStart = this.getMonday(new Date());
    currentWeekStart.setHours(0, 0, 0, 0);
    this.updateStorageDate(currentWeekStart);
  }

}
