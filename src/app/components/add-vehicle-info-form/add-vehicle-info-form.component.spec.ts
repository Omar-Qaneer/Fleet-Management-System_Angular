import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddVehicleInfoFormComponent } from './add-vehicle-info-form.component';

describe('AddVehicleInfoFormComponent', () => {
  let component: AddVehicleInfoFormComponent;
  let fixture: ComponentFixture<AddVehicleInfoFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AddVehicleInfoFormComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AddVehicleInfoFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
