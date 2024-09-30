import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EventReportTableComponent } from './event-report-table.component';

describe('EventReportTableComponent', () => {
  let component: EventReportTableComponent;
  let fixture: ComponentFixture<EventReportTableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [EventReportTableComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EventReportTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
