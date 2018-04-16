import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RivenGeneratorComponent } from './riven-generator.component';

describe('RivenGeneratorComponent', () => {
  let component: RivenGeneratorComponent;
  let fixture: ComponentFixture<RivenGeneratorComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RivenGeneratorComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RivenGeneratorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
