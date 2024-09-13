import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AnnouncemnetComponent } from './announcemnet.component';

describe('AnnouncemnetComponent', () => {
  let component: AnnouncemnetComponent;
  let fixture: ComponentFixture<AnnouncemnetComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AnnouncemnetComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AnnouncemnetComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
