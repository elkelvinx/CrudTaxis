import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DatePickerHomeComponent } from './date-picker-home.component';

describe('DatePickerHomeComponent', () => {
  let component: DatePickerHomeComponent;
  let fixture: ComponentFixture<DatePickerHomeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [DatePickerHomeComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DatePickerHomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
