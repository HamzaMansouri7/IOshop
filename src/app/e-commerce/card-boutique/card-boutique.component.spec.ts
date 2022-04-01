import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CardBoutiqueComponent } from './card-boutique.component';

describe('CardBoutiqueComponent', () => {
  let component: CardBoutiqueComponent;
  let fixture: ComponentFixture<CardBoutiqueComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CardBoutiqueComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CardBoutiqueComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
