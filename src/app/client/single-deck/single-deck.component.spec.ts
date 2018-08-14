import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SingleDeckComponent } from './single-deck.component';

describe('SingleDeckComponent', () => {
  let component: SingleDeckComponent;
  let fixture: ComponentFixture<SingleDeckComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SingleDeckComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SingleDeckComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
