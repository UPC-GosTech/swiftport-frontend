import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HomeOperarioComponent } from './home-operario.component';

describe('HomeOperarioComponent', () => {
  let component: HomeOperarioComponent;
  let fixture: ComponentFixture<HomeOperarioComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HomeOperarioComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HomeOperarioComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
