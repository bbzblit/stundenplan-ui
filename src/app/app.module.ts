import { NgModule, isDevMode } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ClassSelectorComponent } from './component/stunden-overview/class-selector/class-selector.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { HttpClientModule } from '@angular/common/http';
import {MatAutocompleteModule} from '@angular/material/autocomplete'; 
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {MatButtonModule} from '@angular/material/button';
import { MatInputModule,  } from '@angular/material/input';
import { StundenOverviewComponent } from './component/stunden-overview/stunden-overview.component';
import { TimetableRootComponent } from './component/timetable-root/timetable-root.component';
import { TimetableDayComponent } from './component/timetable-root/timetable-day/timetable-day.component';
import { AppointmentComponent } from './component/timetable-root/appointment/appointment.component';
import {MatIconModule} from '@angular/material/icon';
import { DaypickerComponent } from './component/stunden-overview/daypicker/daypicker.component';
import {MatDatepickerModule} from '@angular/material/datepicker'; 
import { MatNativeDateModule } from '@angular/material/core';
import { AppointmentEffect } from './state/appointment/appointment.effect';
import { appointmentReducer } from './state/appointment/appointment.reducer';
import { dateReducer } from './state/date/date.reducer';
import { ClassEffect } from './state/class/class.effect';
import { classReducer } from './state/class/class.reducer';
import { DetailedEventViewComponent } from './component/timetable-root/appointment/detailed-event-view/detailed-event-view.component';
import {MatDialogModule} from '@angular/material/dialog';
import { MobileAppointmentViewComponent } from './component/timetable-root/mobile-appointment-view/mobile-appointment-view.component';
import { WelcomeComponent } from './component/welcome/welcome.component';

@NgModule({
  declarations: [
    AppComponent,
    ClassSelectorComponent,
    StundenOverviewComponent,
    TimetableRootComponent,
    TimetableDayComponent,
    DaypickerComponent,
    AppointmentComponent,
    DetailedEventViewComponent,
    MobileAppointmentViewComponent,
    WelcomeComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    StoreModule.forRoot({"classes" : classReducer, "appointments" : appointmentReducer, "date" : dateReducer}, {}),
    EffectsModule.forRoot([ClassEffect, AppointmentEffect]),
    StoreDevtoolsModule.instrument({ maxAge: 25, logOnly: !isDevMode() }),
    HttpClientModule,
    MatAutocompleteModule,
    FormsModule,
    MatButtonModule,
    ReactiveFormsModule,
    MatInputModule,
    MatIconModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatDialogModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
