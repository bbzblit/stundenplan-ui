import { NgModule, isDevMode } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ClassSelectorComponent } from './component/stunden-overview/class-selector/class-selector.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { ClassEffect } from './state/class.effect';
import { classReducer } from './state/class.reducer';
import { HttpClientModule } from '@angular/common/http';
import {MatAutocompleteModule} from '@angular/material/autocomplete'; 
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {MatButtonModule} from '@angular/material/button';
import { MatInputModule,  } from '@angular/material/input';
import { StundenOverviewComponent } from './component/stunden-overview/stunden-overview.component';
import { TimetableRootComponent } from './component/timetable-root/timetable-root.component';
import { TimetableDayComponent } from './component/timetable-root/timetable-day/timetable-day.component';
import { AppointmentComponent } from './component/timetable-root/appointment/appointment.component';
import { AppointmentEffect } from './state/appointment.effect';
import { appointmentReducer } from './state/appointment.reducer';

@NgModule({
  declarations: [
    AppComponent,
    ClassSelectorComponent,
    StundenOverviewComponent,
    TimetableRootComponent,
    TimetableDayComponent,
    AppointmentComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    StoreModule.forRoot({"classes" : classReducer, "appointments" : appointmentReducer}, {}),
    EffectsModule.forRoot([ClassEffect, AppointmentEffect]),
    StoreDevtoolsModule.instrument({ maxAge: 25, logOnly: !isDevMode() }),
    HttpClientModule,
    MatAutocompleteModule,
    FormsModule,
    MatButtonModule,
    ReactiveFormsModule,
    MatInputModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
