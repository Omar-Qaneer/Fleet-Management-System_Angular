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
  selector: 'app-add-vehicle-form',
  standalone: true,
  imports: [FormsModule, MatFormFieldModule, MatInputModule,MatButtonModule,RouterOutlet,RouterLink,ReactiveFormsModule],
  templateUrl: './add-vehicle-form.component.html',
  styleUrl: './add-vehicle-form.component.css'
})
export class AddVehicleFormComponent {

  vehicleService = inject(VehiclesService);
  status:string="";
  error: string | null = null;
  vehicleForm: FormGroup;


  constructor(private _snackBar: MatSnackBar, private router: Router, private fb: FormBuilder) {
    this.vehicleForm = this.fb.group({
      vehicleNumber: ['',Validators.required],
      vehicleType: ['',Validators.required]
    });
  }

  addVehicle(){
    const vehicleData = this.vehicleForm.value;
    var Gvar = new GVAR();
    Gvar.DicOfDic.Tags={
      "VehicleNumber" : vehicleData.vehicleNumber,
      "VehicleType" : vehicleData.vehicleType
    }
    console.log(Gvar);
    this.vehicleService.addVehicle(Gvar).subscribe({
      next: (response) => {
        console.log(response);
        this.status = response.DicOfDic.Tags["STS"];
        if(this.status == "1"){
          this._snackBar.open("Vehicle Added Successfully", "Ok");
          this.router.navigate(['/vehicles']);
        }else{
          this._snackBar.open("Vehicle doesn't Add Successfully", "Ok");
        }
      },
      error: (error) => {
        this.error = error.message;
      }
    });
  }
}
