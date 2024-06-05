import { Component, OnInit, inject,AfterViewInit, ViewChild } from '@angular/core';
import { VehiclesService } from '../../services/vehicles.service';
import { VehicleDetails } from '../../types/vehicleDetails';
import { Observable } from 'rxjs';
import {MatPaginator, MatPaginatorModule} from '@angular/material/paginator';
import {MatTableDataSource, MatTableModule} from '@angular/material/table';
import {MatButtonModule} from '@angular/material/button';
import { GVAR } from '../../../GVAR';
import { DialogOverviewComponent } from '../dialog-overview/dialog-overview.component';
import { MatDialog } from '@angular/material/dialog';
import { VehicleInfo } from '../../types/vehicleInfo';


@Component({
  selector: 'app-vehicleInfo',
  standalone: true,
  imports: [MatTableModule, MatPaginatorModule,MatButtonModule],
  templateUrl: './vehicleInfo.component.html',
  styleUrl: './vehicleInfo.component.css'
})
export class VehicleInfoComponent implements OnInit {
  displayedColumns: string[] = ['VehicleID', 'VehicleNumber', 'VehicleType', 'LastDirection','LastStatus','LastAddress','LastLatitude','LastLongitude','ShowMore'];
  ELEMENT_DATA: VehicleDetails[] = [];
  dataSource = new MatTableDataSource<VehicleDetails>(this.ELEMENT_DATA);
  @ViewChild(MatPaginator)
  paginator!: MatPaginator;


  vehicles: VehicleDetails[]=[];
  vehicleInfo:VehicleInfo = {
    VehicleNumber: 0,
    VehicleType: '',
    DriverName: [],
    PhoneNumber: [],
    LastPosition: '',
    VehicleMake: '',
    VehicleModel: '',
    LastGPSTime: 0,
    LastGPSSpeed: '',
    LastAddress: ''
  };
  isLoading = false;
  error: string | null = null;

  vehicleService = inject(VehiclesService);

  ngOnInit(): void {
    this.isLoading = true;
    this.vehicleService.getVehiclesInfo().subscribe({
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

  constructor(public dialog: MatDialog) {}

  async openDialog(id:number): Promise<void>{
    const response = await this.vehicleService.getVehicle(id).toPromise();
    this.vehicleInfo = response?.DicOfDT["VehicleInformation"][0] ?? {};
    const dialogRef = this.dialog.open(DialogOverviewComponent, {
      data: {
        VehicleNumber:this.vehicleInfo.VehicleNumber,
        VehicleType:this.vehicleInfo.VehicleType,
        DriverName:this.vehicleInfo.DriverName,
        PhoneNumber:this.vehicleInfo.PhoneNumber,
        LastPosition:this.vehicleInfo.LastPosition,
        VehicleMake:this.vehicleInfo.VehicleMake,
        VehicleModel:this.vehicleInfo.VehicleModel,
        LastGPSTime:this.vehicleInfo.LastGPSTime,
        LastGPSSpeed:this.vehicleInfo.LastGPSSpeed,
        LastAddress:this.vehicleInfo.LastAddress,
      },
      height: '600px',
      width: '600px',
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
      //this.animal = result;
    });
  }
}
