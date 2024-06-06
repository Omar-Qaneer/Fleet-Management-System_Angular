import { Routes } from '@angular/router';
import { VehicleInfoComponent } from './components/vehicleInfo/vehicleInfo.component';
import { VehicleComponent } from './components/vehicle/vehicle.component';
import { AddVehicleFormComponent } from './components/add-vehicle-form/add-vehicle-form.component';
import { EditVehicleFormComponent } from './components/edit-vehicle-form/edit-vehicle-form.component';
import { DriverComponent } from './components/driver/driver.component';
import { AddDriverFormComponent } from './components/add-driver-form/add-driver-form.component';
import { EditDriverFormComponent } from './components/edit-driver-form/edit-driver-form.component';
import { GeofenceComponent } from './components/geofence/geofence.component';
import { AddVehicleInfoFormComponent } from './components/add-vehicle-info-form/add-vehicle-info-form.component';

export const routes: Routes = [
  { path: 'vehiclesInfo', component: VehicleInfoComponent },
  { path: 'create-vehicleInfo', component: AddVehicleInfoFormComponent },
  { path: 'vehicles', component: VehicleComponent },
  { path: 'create-vehicle', component: AddVehicleFormComponent },
  { path: 'edit-vehicle', component: EditVehicleFormComponent },
  { path: 'drivers', component: DriverComponent },
  { path: 'create-driver', component: AddDriverFormComponent },
  { path: 'edit-driver', component: EditDriverFormComponent },
  { path: 'geofence', component: GeofenceComponent },

];
