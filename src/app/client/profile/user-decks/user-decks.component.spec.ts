import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UserDecksComponent } from './user-decks.component';

describe('UserDecksComponent', () => {
  let component: UserDecksComponent;
  let fixture: ComponentFixture<UserDecksComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UserDecksComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UserDecksComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
