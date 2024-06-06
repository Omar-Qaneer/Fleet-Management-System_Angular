import { Component, inject } from '@angular/core';
import { RouterOutlet, RouterLink, Router } from '@angular/router';
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';
import {FormsModule} from '@angular/forms';
import {MatButtonModule} from '@angular/material/button';
import {MatSnackBar} from '@angular/material/snack-bar';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { VehiclesService } from '../../services/vehicles.service';
import { GVAR } from '../../../GVAR';

@Component({
  selector: 'app-add-vehicle-info-form',
  standalone: true,
  imports: [FormsModule, MatFormFieldModule, MatInputModule,MatButtonModule,RouterOutlet,RouterLink,ReactiveFormsModule],
  templateUrl: './add-vehicle-info-form.component.html',
  styleUrl: './add-vehicle-info-form.component.css'
})
export class AddVehicleInfoFormComponent {
  vehicleService = inject(VehiclesService);
  status:string="";
  error: string | null = null;
  vehicleInfoForm: FormGroup;


  constructor(private _snackBar: MatSnackBar, private router: Router, private fb: FormBuilder) {
    this.vehicleInfoForm = this.fb.group({
      vehicleID: ['',Validators.required],
      driverID: ['',Validators.required],
      vehicleMake: ['',Validators.required],
      vehicleModel: ['',Validators.required]
    });
  }

  addVehicleInfo(){
    const vehicleInfoData = this.vehicleInfoForm.value;
    var Gvar = new GVAR();
    const currentEpochTime: number = Date.now();
    Gvar.DicOfDic.Tags={
      "VehicleID" : vehicleInfoData.vehicleID,
      "DriverID" : vehicleInfoData.driverID,
      "VehicleMake" : vehicleInfoData.vehicleMake,
      "VehicleModel" : vehicleInfoData.vehicleModel,
      "PurchaseDate" : currentEpochTime.toString()

    }
    console.log(Gvar);
    this.vehicleService.addVehicleInfo(Gvar).subscribe({
      next: (response) => {
        console.log(response);
        this.status = response.DicOfDic.Tags["STS"];
        if(this.status == "1"){
          this._snackBar.open("VehicleInfo Added Successfully", "Ok");
          this.router.navigate(['/vehicles']);
        }else{
          this._snackBar.open("VehicleInfo doesn't Add Successfully", "Ok");
        }
      },
      error: (error) => {
        this.error = error.message;
      }
    });
  }
}
