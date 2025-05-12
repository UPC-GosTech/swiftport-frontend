import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReprogramacionComponent } from './reprogramacion.component';

describe('ReprogramacionComponent', () => {
  let component: ReprogramacionComponent;
  let fixture: ComponentFixture<ReprogramacionComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ReprogramacionComponent]
    });
    fixture = TestBed.createComponent(ReprogramacionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
