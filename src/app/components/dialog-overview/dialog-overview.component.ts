import { Component, Inject, ViewChild } from '@angular/core';
import {
  MatDialog,
  MAT_DIALOG_DATA,
  MatDialogRef,
  MatDialogTitle,
  MatDialogContent,
  MatDialogActions,
  MatDialogClose,
} from '@angular/material/dialog';
import {MatButtonModule} from '@angular/material/button';
import {FormsModule} from '@angular/forms';
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatSelectModule} from '@angular/material/select';
import { VehicleInfo } from '../../types/vehicleInfo';
import { SelectOverviewComponent } from '../select-overview/select-overview.component';

@Component({
  selector: 'app-dialog-overview',
  standalone: true,
  imports: [
    MatFormFieldModule,
    MatInputModule,
    FormsModule,
    MatButtonModule,
    MatDialogTitle,
    MatDialogContent,
    MatDialogActions,
    MatDialogClose,
    MatSelectModule,
    SelectOverviewComponent,
  ],
  templateUrl: './dialog-overview.component.html',
  styleUrl: './dialog-overview.component.css'
})
export class DialogOverviewComponent {
  driversNames:string[]=[];
  index:number=0;;
  constructor(
    public dialogRef: MatDialogRef<DialogOverviewComponent>,
    @Inject(MAT_DIALOG_DATA) public data: VehicleInfo,
  ) {}



  onNoClick(): void {
    this.dialogRef.close();
  }

  receiveMessage($event: string) {
    this.index = this.data.DriverName.indexOf($event);
  }
}
