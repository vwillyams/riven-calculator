import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProbabilityResultComponent } from './probability-result.component';

describe('ProbabilityResultComponent', () => {
  let component: ProbabilityResultComponent;
  let fixture: ComponentFixture<ProbabilityResultComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProbabilityResultComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProbabilityResultComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
