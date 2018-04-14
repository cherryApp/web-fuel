import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FuelingComponent } from './fueling.component';

describe('FuelingComponent', () => {
  let component: FuelingComponent;
  let fixture: ComponentFixture<FuelingComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FuelingComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FuelingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
