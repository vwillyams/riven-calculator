import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RivenStatSelectorComponent } from './riven-stat-selector.component';

describe('RivenStatSelectorComponent', () => {
  let component: RivenStatSelectorComponent;
  let fixture: ComponentFixture<RivenStatSelectorComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RivenStatSelectorComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RivenStatSelectorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
