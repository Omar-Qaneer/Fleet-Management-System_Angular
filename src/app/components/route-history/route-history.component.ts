import { Component, OnInit, inject,AfterViewInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { RouterOutlet, RouterLink } from '@angular/router';
import { VehiclesService } from '../../services/vehicles.service';
import { VehicleDetails } from '../../types/vehicleDetails';
import { Observable } from 'rxjs';
import {MatPaginator, MatPaginatorModule} from '@angular/material/paginator';
import {MatTableDataSource, MatTableModule} from '@angular/material/table';
import {MatButtonModule} from '@angular/material/button';
import { GVAR } from '../../../GVAR';
import { DialogOverviewComponent } from '../dialog-overview/dialog-overview.component';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MatDialog } from '@angular/material/dialog';
import { VehicleInfo } from '../../types/vehicleInfo';
import { RouteHistory } from '../../types/routeHistory';
import { RouteHistoryService } from '../../services/route-history.service';

@Component({
  selector: 'app-route-history',
  standalone: true,
  imports: [MatTableModule, MatPaginatorModule,MatButtonModule,RouterOutlet,RouterLink,FlexLayoutModule],
  templateUrl: './route-history.component.html',
  styleUrl: './route-history.component.css'
})
export class RouteHistoryComponent {




  displayedColumns: string[] = ['RouteHistoryID', 'VehicleID', 'VehicleDirection','Status','GPSSpeed','GPSSTime','Address','Latitude','Longitude'];
  ELEMENT_DATA: RouteHistory[] = [];
  dataSource = new MatTableDataSource<RouteHistory>(this.ELEMENT_DATA);
  routesHistories: RouteHistory[]=[];
  status!: string;

  @ViewChild(MatPaginator)
  paginator!: MatPaginator;

  error: string | null = null;

  RouteHistoryService = inject(RouteHistoryService);

  constructor(private route: ActivatedRoute,private router: Router) {}

  ngOnInit() {
    this.route.params.subscribe(params => {
      const vehicleID = history.state.vehicleID;
      console.log(vehicleID);

      this.RouteHistoryService.getRoutesHistories(vehicleID).subscribe({
        next: (response) => {
          var Gvar = new GVAR();
          Gvar = response;
          this.routesHistories = response.DicOfDT["RouteHistory"];
          this.ELEMENT_DATA = response.DicOfDT["RouteHistory"];
          this.dataSource.data = response.DicOfDT["RouteHistory"];
          console.log(response);
        },
        error: (error) => {
          this.error = error.message;
        }
      });

    });
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }


}
