import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AvantageDetailsComponent } from './avantage-details.component';

describe('AvantageDetailsComponent', () => {
  let component: AvantageDetailsComponent;
  let fixture: ComponentFixture<AvantageDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AvantageDetailsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AvantageDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
