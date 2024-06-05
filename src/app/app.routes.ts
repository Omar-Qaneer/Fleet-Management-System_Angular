import { Routes } from '@angular/router';
import { VehicleInfoComponent } from './components/vehicleInfo/vehicleInfo.component';
import { VehicleComponent } from './components/vehicle/vehicle.component';
import { AddVehicleFormComponent } from './components/add-vehicle-form/add-vehicle-form.component';

export const routes: Routes = [
  { path: 'vehiclesInfo', component: VehicleInfoComponent },
  { path: 'vehicles', component: VehicleComponent },
  { path: 'create-vehicle', component: AddVehicleFormComponent },
];
