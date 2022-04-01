import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AvantageCommerceComponent } from './avantage-commerce.component';

describe('AvantageCommerceComponent', () => {
  let component: AvantageCommerceComponent;
  let fixture: ComponentFixture<AvantageCommerceComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AvantageCommerceComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AvantageCommerceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
