import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FicheProductComponent } from './fiche-product.component';

describe('FicheProductComponent', () => {
  let component: FicheProductComponent;
  let fixture: ComponentFixture<FicheProductComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FicheProductComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FicheProductComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
