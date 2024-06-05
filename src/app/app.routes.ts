import { Routes } from '@angular/router';
import { VehicleInfoComponent } from './components/vehicleInfo/vehicleInfo.component';
import { VehicleComponent } from './components/vehicle/vehicle.component';

export const routes: Routes = [
  { path: 'vehiclesInfo', component: VehicleInfoComponent },
  { path: 'vehicles', component: VehicleComponent },
];
