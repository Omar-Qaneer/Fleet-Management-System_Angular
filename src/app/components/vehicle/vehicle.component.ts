import { Component, OnInit, ViewChild, inject } from '@angular/core';
import { RouterOutlet, RouterLink } from '@angular/router';
import { Vehicle } from '../../types/vehicle';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import {MatButtonModule} from '@angular/material/button';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { FlexLayoutModule } from '@angular/flex-layout';
import { VehiclesService } from '../../services/vehicles.service';
import { GVAR } from '../../../GVAR';

@Component({
  selector: 'app-vehicle',
  standalone: true,
  imports: [MatTableModule, MatPaginatorModule,MatButtonModule,RouterOutlet,RouterLink,FlexLayoutModule],
  templateUrl: './vehicle.component.html',
  styleUrl: './vehicle.component.css'
})
export class VehicleComponent implements OnInit {

  displayedColumns: string[] = ['VehicleID', 'VehicleNumber', 'VehicleType','Action'];
  ELEMENT_DATA: Vehicle[] = [];
  dataSource = new MatTableDataSource<Vehicle>(this.ELEMENT_DATA);
  vehicles: Vehicle[]=[];

  @ViewChild(MatPaginator)
  paginator!: MatPaginator;

  error: string | null = null;

  vehicleService = inject(VehiclesService);

  ngOnInit(): void {
    this.vehicleService.getVehiclesInfo().subscribe({
      next: (response) => {
        var Gvar = new GVAR();
        Gvar = response;
        this.vehicles = response.DicOfDT["Vehicles"];
        this.ELEMENT_DATA = response.DicOfDT["Vehicles"];
        this.dataSource.data = response.DicOfDT["Vehicles"];
        console.log(response);
      },
      error: (error) => {
        this.error = error.message;
      }
    });
  }

  async deleteVehicle(id: number):Promise<void> {
    }
    async editVehicle(vehicle: Vehicle):Promise<void> {

    }

    async addVehicle():Promise<void> {

    }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }

}
