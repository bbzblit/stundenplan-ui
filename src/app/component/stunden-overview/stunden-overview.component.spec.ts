import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StundenOverviewComponent } from './stunden-overview.component';

describe('StundenOverviewComponent', () => {
  let component: StundenOverviewComponent;
  let fixture: ComponentFixture<StundenOverviewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ StundenOverviewComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(StundenOverviewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
