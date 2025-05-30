import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ComponentsDemoComponent } from './components-demo.component';

describe('ComponentsDemoComponent', () => {
  let component: ComponentsDemoComponent;
  let fixture: ComponentFixture<ComponentsDemoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ComponentsDemoComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ComponentsDemoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
