import { Component, OnInit, ViewChild, inject } from '@angular/core';
import { RouterOutlet, RouterLink, Router, NavigationExtras } from '@angular/router';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import {MatButtonModule} from '@angular/material/button';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import {MatSnackBar} from '@angular/material/snack-bar';
import { FlexLayoutModule } from '@angular/flex-layout';
import { GVAR } from '../../../GVAR';
import { Driver } from '../../types/driver';
import { DriverService } from '../../services/driver.service';

@Component({
  selector: 'app-driver',
  standalone: true,
  imports: [MatTableModule, MatPaginatorModule,MatButtonModule,RouterOutlet,RouterLink,FlexLayoutModule],
  templateUrl: './driver.component.html',
  styleUrl: './driver.component.css'
})
export class DriverComponent implements OnInit {
  displayedColumns: string[] = ['DriverID', 'DriverName', 'PhoneNumber','Action'];
  ELEMENT_DATA: Driver[] = [];
  dataSource = new MatTableDataSource<Driver>(this.ELEMENT_DATA);
  drivers: Driver[]=[];
  status!: string;

  @ViewChild(MatPaginator)
  paginator!: MatPaginator;

  error: string | null = null;

  driverService = inject(DriverService);
  constructor(private router: Router,private _snackBar: MatSnackBar){}

  ngOnInit(): void {
    this.driverService.getDrivers().subscribe({
      next: (response) => {
        var Gvar = new GVAR();
        Gvar = response;
        this.drivers = Gvar.DicOfDT["Drivers"];
        this.ELEMENT_DATA = Gvar.DicOfDT["Drivers"];
        this.dataSource.data = Gvar.DicOfDT["Drivers"];
        console.log(response);
      },
      error: (error) => {
        this.error = error.message;
      }
    });
  }

  editDriver(driver: Driver) {
    const navigationExtras: NavigationExtras = {
      state: {
        driver: driver
      }
    };
    console.log(navigationExtras);
    this.router.navigate(['/edit-driver'],navigationExtras);
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }
}
