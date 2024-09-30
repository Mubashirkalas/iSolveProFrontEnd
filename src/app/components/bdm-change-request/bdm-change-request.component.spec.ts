import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BdmChangeRequestComponent } from './bdm-change-request.component';

describe('BdmChangeRequestComponent', () => {
  let component: BdmChangeRequestComponent;
  let fixture: ComponentFixture<BdmChangeRequestComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [BdmChangeRequestComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BdmChangeRequestComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
