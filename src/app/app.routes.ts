import { Routes } from '@angular/router';
import { VehicleInfoComponent } from './components/vehicleInfo/vehicleInfo.component';
import { VehicleComponent } from './components/vehicle/vehicle.component';
import { AddVehicleFormComponent } from './components/add-vehicle-form/add-vehicle-form.component';
import { EditVehicleFormComponent } from './components/edit-vehicle-form/edit-vehicle-form.component';
import { DriverComponent } from './components/driver/driver.component';

export const routes: Routes = [
  { path: 'vehiclesInfo', component: VehicleInfoComponent },
  { path: 'vehicles', component: VehicleComponent },
  { path: 'create-vehicle', component: AddVehicleFormComponent },
  { path: 'edit-vehicle', component: EditVehicleFormComponent },
  { path: 'drivers', component: DriverComponent },
];
