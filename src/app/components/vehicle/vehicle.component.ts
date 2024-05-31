import { Component, OnInit, inject } from '@angular/core';
import { VehiclesService } from '../../services/vehicles.service';
import { Vehicle } from '../../types/vehicle';
import { Observable } from 'rxjs';
import { GVAR } from '../../../GVAR';


@Component({
  selector: 'app-vehicle',
  standalone: true,
  imports: [],
  templateUrl: './vehicle.component.html',
  styleUrl: './vehicle.component.css'
})
export class VehicleComponent implements OnInit {
  vehicles: Vehicle[]=[];
  isLoading = false;
  error: string | null = null;

  vehicleService = inject(VehiclesService);

  ngOnInit(): void {
    this.isLoading = true;
    this.vehicleService.getVehicles().subscribe({
      next: (response) => {
        var Gvar = new GVAR();
        Gvar = response;
        this.vehicles = response.DicOfDT["Vehicles"];
        this.isLoading = false;
      },
      error: (error) => {
        this.error = error.message;
        this.isLoading = false;
      }
    });
  }
}
