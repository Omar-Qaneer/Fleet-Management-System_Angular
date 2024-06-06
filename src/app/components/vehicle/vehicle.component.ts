import { Component, OnInit, ViewChild, inject } from '@angular/core';
import { RouterOutlet, RouterLink, Router, NavigationExtras } from '@angular/router';
import { Vehicle } from '../../types/vehicle';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import {MatButtonModule} from '@angular/material/button';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import {MatSnackBar} from '@angular/material/snack-bar';
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
  status!: string;

  @ViewChild(MatPaginator)
  paginator!: MatPaginator;

  error: string | null = null;

  vehicleService = inject(VehiclesService);
  constructor(private router: Router,private _snackBar: MatSnackBar){}

  ngOnInit(): void {
    this.vehicleService.getVehicles().subscribe({
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
    const response = await this.vehicleService.deleteVehicle(id).toPromise();
    this.status = response?.DicOfDic.Tags["STS"];
    console.log(response);
    if(this.status == "1"){
      this._snackBar.open("Vehicle deleted Successfully", "Ok");
      this.router.navigate(['/vehicles']);
    }else{
      this._snackBar.open("Vehicle isn't deleted Successfully", "Ok");
    }
    this.vehicleService.getVehicles().subscribe({
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

    editVehicle(vehicle: Vehicle) {
      const navigationExtras: NavigationExtras = {
        state: {
          vehicle: vehicle
        }
      };
      this.router.navigate(['/edit-vehicle'],navigationExtras);


    }

    showRoutesHistories(vehicleID: number) {
      const navigationExtras: NavigationExtras = {
        state: {
          vehicleID: vehicleID
        }
      };
      this.router.navigate(['/show-routesHistory'],navigationExtras);
      }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }

}
