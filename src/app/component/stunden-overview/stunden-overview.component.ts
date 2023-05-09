import { formatDate } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Route, Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { loadClasses } from 'src/app/state/class/class.action';
import { selectDate } from 'src/app/state/date/date.selector';
import { setDate } from 'src/app/state/date/date.action';

@Component({
  selector: 'app-stunden-overview',
  templateUrl: './stunden-overview.component.html',
  styleUrls: ['./stunden-overview.component.less']
})
export class StundenOverviewComponent implements OnInit {

  public DATE = "";

  constructor(private store: Store, private route: ActivatedRoute, private router: Router) { }

  getMonday(date: Date): Date {
    let weekDay = date.getDay();
    date.setDate(date.getDate() - weekDay + (!weekDay ? -6 : 1));
    return date;
  }

  private stringToDate(date: String): Date {
    let dateArr = date.split("-");
    let newDate = new Date();

    newDate.setDate(+dateArr[0]);
    newDate.setMonth(+dateArr[1] - 1);
    newDate.setFullYear(+dateArr[2]);

    return newDate;
  }
  ngOnInit(): void {
    this.store.dispatch(loadClasses());

    let _date = this.route.snapshot.queryParamMap.get('period');

    if(_date == null){
      _date = formatDate(this.getMonday(new Date()), "dd-MM-yyyy", "en-US");
      this.router.navigate(
        [],
        {
          relativeTo: this.route,
          queryParams: { period: "now" },
          queryParamsHandling: 'merge'
        });
    }
    this.DATE = _date;

    if (this.DATE.match(/(\d{1,2}-(0?[1-9]|1[0-2])-2\d{3})/)) {
      this.store.dispatch(setDate({ date: this.stringToDate(this.DATE) }));
    }
    this.store.select(selectDate).subscribe((date) => this.DATE = formatDate(this.getMonday(date), "dd-MM-yyyy", "en-US"));


  }
};
