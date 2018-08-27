import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DeckMenuComponent } from './deck-menu.component';

describe('DeckMenuComponent', () => {
  let component: DeckMenuComponent;
  let fixture: ComponentFixture<DeckMenuComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DeckMenuComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DeckMenuComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
