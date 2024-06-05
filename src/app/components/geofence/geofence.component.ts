import { Component, OnInit, ViewChild, inject } from '@angular/core';
import { RouterOutlet, RouterLink, Router, NavigationExtras } from '@angular/router';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import {MatButtonModule} from '@angular/material/button';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import {MatSnackBar} from '@angular/material/snack-bar';
import { FlexLayoutModule } from '@angular/flex-layout';
import { GVAR } from '../../../GVAR';
import { Driver } from '../../types/driver';
import { GeofencesService } from '../../services/geofences.service';
import { Geofence } from '../../types/geofence';

@Component({
  selector: 'app-geofence',
  standalone: true,
  imports: [MatTableModule, MatPaginatorModule,MatButtonModule,RouterOutlet,RouterLink,FlexLayoutModule],
  templateUrl: './geofence.component.html',
  styleUrl: './geofence.component.css'
})

export class GeofenceComponent implements OnInit {
  displayedColumns: string[] = ['GeofenceID', 'GeofenceType', 'newAddedDate','StrockColor','StrockOpacity','StrockWeight','FillColor','FillOpacity'];
  ELEMENT_DATA: NewGeofence[] = [];
  dataSource = new MatTableDataSource<NewGeofence>(this.ELEMENT_DATA);
  geofences: Geofence[]=[];
  status!: string;
  epoch:string="";

  @ViewChild(MatPaginator)
  paginator!: MatPaginator;

  error: string | null = null;

  geofenceService = inject(GeofencesService);
  constructor(private router: Router,private _snackBar: MatSnackBar){}

  ngOnInit(): void {
    this.geofenceService.getGeofences().subscribe({
      next: (response) => {
        var Gvar = new GVAR();
        Gvar = response;
        this.geofences = Gvar.DicOfDT["Geofences"];
        const newArray: NewGeofence[] = this.geofences.map(obj => {
          const { GeofenceID,GeofenceType,AddedDate,StrockColor,StrockOpacity,StrockWeight,FillColor,FillOpacity } = obj;
          const newAddedDate =epochToDateString(AddedDate);

          return { GeofenceID,GeofenceType,newAddedDate,StrockColor,StrockOpacity,StrockWeight,FillColor,FillOpacity }; // Return the new object
        });
        this.ELEMENT_DATA = Gvar.DicOfDT["Geofences"];
        this.dataSource.data = newArray;
        console.log(response);
      },
      error: (error) => {
        this.error = error.message;
      }
    });
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

interface NewGeofence {
  GeofenceID:number;
  GeofenceType:string;
  StrockColor:string;
  StrockOpacity:number;
  StrockWeight:number;
  FillColor:string;
  FillOpacity:number;
}
