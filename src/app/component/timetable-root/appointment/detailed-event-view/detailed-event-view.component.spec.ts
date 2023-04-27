import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DetailedEventViewComponent } from './detailed-event-view.component';

describe('DetailedEventViewComponent', () => {
  let component: DetailedEventViewComponent;
  let fixture: ComponentFixture<DetailedEventViewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DetailedEventViewComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DetailedEventViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
