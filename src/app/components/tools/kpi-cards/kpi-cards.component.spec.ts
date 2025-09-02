import { ComponentFixture, TestBed } from '@angular/core/testing';

import { KpiCardsComponent } from './kpi-cards.component';

describe('KpiCardsComponent', () => {
  let component: KpiCardsComponent;
  let fixture: ComponentFixture<KpiCardsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [KpiCardsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(KpiCardsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
