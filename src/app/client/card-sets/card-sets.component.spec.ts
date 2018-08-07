import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CardSetsComponent } from './card-sets.component';

describe('CardSetsComponent', () => {
  let component: CardSetsComponent;
  let fixture: ComponentFixture<CardSetsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CardSetsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CardSetsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
