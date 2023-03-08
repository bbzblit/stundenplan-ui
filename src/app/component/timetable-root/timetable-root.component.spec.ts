import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TimetableRootComponent } from './timetable-root.component';

describe('TimetableRootComponent', () => {
  let component: TimetableRootComponent;
  let fixture: ComponentFixture<TimetableRootComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TimetableRootComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TimetableRootComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
