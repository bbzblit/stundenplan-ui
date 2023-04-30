import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MobileAppointmentViewComponent } from './mobile-appointment-view.component';

describe('MobileAppointmentViewComponent', () => {
  let component: MobileAppointmentViewComponent;
  let fixture: ComponentFixture<MobileAppointmentViewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MobileAppointmentViewComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MobileAppointmentViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
