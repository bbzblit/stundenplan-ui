import { DATE_PIPE_DEFAULT_OPTIONS } from '@angular/common';
import { Component, Injectable } from '@angular/core';
import { DateAdapter } from '@angular/material/core';

import {
  MatDateRangeSelectionStrategy,
  DateRange,
  MAT_DATE_RANGE_SELECTION_STRATEGY,
} from '@angular/material/datepicker';

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
      let d = new Date(date)
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
  ],
})
export class DaypickerComponent {

  now(days : number): string{
    let date = new Date();
    let weekDay = date.getDay();
    date.setDate(date.getDate() - weekDay + (!weekDay ? -6 : 1));
    date.setDate(date.getDate() + days);
    return date.getDate() + "/" + (date.getMonth() + 1) + "/" + date.getFullYear();
  }

}
