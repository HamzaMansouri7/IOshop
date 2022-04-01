import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MonirexComponent } from './monirex.component';

describe('MonirexComponent', () => {
  let component: MonirexComponent;
  let fixture: ComponentFixture<MonirexComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MonirexComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MonirexComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
