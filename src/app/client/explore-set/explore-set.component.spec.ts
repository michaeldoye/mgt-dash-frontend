import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ExploreSetComponent } from './explore-set.component';

describe('ExploreSetComponent', () => {
  let component: ExploreSetComponent;
  let fixture: ComponentFixture<ExploreSetComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ExploreSetComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ExploreSetComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
