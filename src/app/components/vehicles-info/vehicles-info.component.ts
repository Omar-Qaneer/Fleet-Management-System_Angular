import { Component, OnInit, inject,AfterViewInit, ViewChild } from '@angular/core';
import { RouterOutlet, RouterLink, NavigationExtras, Router } from '@angular/router';
import { VehiclesService } from '../../services/vehicles.service';
import {MatPaginator, MatPaginatorModule} from '@angular/material/paginator';
import {MatTableDataSource, MatTableModule} from '@angular/material/table';
import {MatButtonModule} from '@angular/material/button';
import { GVAR } from '../../../GVAR';
import { FlexLayoutModule } from '@angular/flex-layout';
import { VehicleInfoDetails } from '../../types/vehicleInfoDetails';

@Component({
  selector: 'app-vehicles-info',
  standalone: true,
  imports: [MatTableModule, MatPaginatorModule,MatButtonModule,RouterOutlet,RouterLink,FlexLayoutModule],
  templateUrl: './vehicles-info.component.html',
  styleUrl: './vehicles-info.component.css'
})
export class VehiclesInfoComponent {
  displayedColumns: string[] = ['ID','VehicleID', 'DriverID', 'VehicleMake', 'VehicleModel','newAddedDate','Action'];
  ELEMENT_DATA: NewVehiclesDetails[] = [];
  dataSource = new MatTableDataSource<NewVehiclesDetails>(this.ELEMENT_DATA);
  @ViewChild(MatPaginator)
  paginator!: MatPaginator;

  constructor(private router: Router){}


  vehicles: VehicleInfoDetails[]=[];
  vehicleInfo!: VehicleInfoDetails;
  isLoading = false;
  error: string | null = null;

  vehicleService = inject(VehiclesService);

  ngOnInit(): void {
    this.isLoading = true;
    this.vehicleService.getVehiclesDetails().subscribe({
      next: (response) => {
        var Gvar = new GVAR();
        Gvar = response;
        this.vehicles = response.DicOfDT["VehicleInformation"];
        const newArray: NewVehiclesDetails[] = this.vehicles.map(obj => {
          const { ID,VehicleID,DriverID,VehicleMake,VehicleModel,PurchaseDate } = obj;
          const newAddedDate =epochToDateString(PurchaseDate);

          return { ID,VehicleID,DriverID,VehicleMake,VehicleModel,newAddedDate }; // Return the new object
        });
        this.ELEMENT_DATA = response.DicOfDT["VehicleInformation"];
        this.dataSource.data = newArray;
        console.log(response);
        this.isLoading = false;
      },
      error: (error) => {
        this.error = error.message;
        this.isLoading = false;
      }
    });
  }

  addRouteHistory(vehicleID: number) {
    const navigationExtras: NavigationExtras = {
      state: {
        vehicleID: vehicleID
      }
    };
    this.router.navigate(['/create-routeHistory'],navigationExtras);
    }


  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }

}

function epochToDateString(epoch: number): string {
  const date = new Date(epoch);

  const formattedDate = date.toLocaleDateString('en-US',{
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
  });

  return formattedDate;
}

interface NewVehiclesDetails {
  ID:number;
  VehicleID:number;
  DriverID:number;
  VehicleMake:string;
  VehicleModel:string;
}
