import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NaturexComponent } from './naturex.component';

describe('NaturexComponent', () => {
  let component: NaturexComponent;
  let fixture: ComponentFixture<NaturexComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NaturexComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NaturexComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
