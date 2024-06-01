import { Component, OnInit, inject,AfterViewInit, ViewChild } from '@angular/core';
import { VehiclesService } from '../../services/vehicles.service';
import { Vehicle } from '../../types/vehicle';
import { Observable } from 'rxjs';
import {MatPaginator, MatPaginatorModule} from '@angular/material/paginator';
import {MatTableDataSource, MatTableModule} from '@angular/material/table';
import {MatButtonModule} from '@angular/material/button';
import { GVAR } from '../../../GVAR';


@Component({
  selector: 'app-vehicle',
  standalone: true,
  imports: [MatTableModule, MatPaginatorModule,MatButtonModule],
  templateUrl: './vehicle.component.html',
  styleUrl: './vehicle.component.css'
})
export class VehicleComponent implements OnInit {
  displayedColumns: string[] = ['VehicleID', 'VehicleNumber', 'VehicleType', 'LastDirection','LastStatus','LastAddress','LastLatitude','LastLongitude','ShowMore'];
  ELEMENT_DATA: Vehicle[] = [];
  dataSource = new MatTableDataSource<Vehicle>(this.ELEMENT_DATA);
  @ViewChild(MatPaginator)
  paginator!: MatPaginator;


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
        this.ELEMENT_DATA = response.DicOfDT["Vehicles"];
        this.dataSource.data = response.DicOfDT["Vehicles"];
        console.log(response);
        this.isLoading = false;
      },
      error: (error) => {
        this.error = error.message;
        this.isLoading = false;
      }
    });
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }
}
