import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AgTemplate3Component } from './ag-template3.component';

describe('AgTemplate3Component', () => {
  let component: AgTemplate3Component;
  let fixture: ComponentFixture<AgTemplate3Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AgTemplate3Component ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AgTemplate3Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
