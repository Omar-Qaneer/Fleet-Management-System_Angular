import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VehiclesInfoComponent } from './vehicles-info.component';

describe('VehiclesInfoComponent', () => {
  let component: VehiclesInfoComponent;
  let fixture: ComponentFixture<VehiclesInfoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [VehiclesInfoComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(VehiclesInfoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
