import { Component, Input } from '@angular/core';
import { Appointment } from 'src/app/model/appointment.model';

@Component({
  selector: 'app-mobile-appointment-view',
  templateUrl: './mobile-appointment-view.component.html',
  styleUrls: ['./mobile-appointment-view.component.less']
})
export class MobileAppointmentViewComponent {

  public days = Array(7);

  @Input("startDate") public startDate! : Date;
  @Input("groupedAppointments")   public groupedAppointments: Array<Array<Appointment>> = [];
  public dayNames = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];

  getDayName(div : number){
    let _tmp_date = new Date(this.startDate.getTime());
    _tmp_date.setDate(_tmp_date.getDate() + div);
    return this.dayNames[_tmp_date.getDay()];
  }
  getDate(div: number) {
    let _tmp_date = new Date(this.startDate.getTime());
    _tmp_date.setDate(_tmp_date.getDate() + div);
    return _tmp_date.getDate() + "." + _tmp_date.getMonth();
  }

}
