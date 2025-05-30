import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EquipmentManagementComponent } from './equipment-management.component';

describe('EquipmentManagementComponent', () => {
  let component: EquipmentManagementComponent;
  let fixture: ComponentFixture<EquipmentManagementComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EquipmentManagementComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EquipmentManagementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
