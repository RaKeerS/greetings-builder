import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GreetingsTemplateComponent } from './greetings-template.component';

describe('GreetingsTemplateComponent', () => {
  let component: GreetingsTemplateComponent;
  let fixture: ComponentFixture<GreetingsTemplateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GreetingsTemplateComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(GreetingsTemplateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
