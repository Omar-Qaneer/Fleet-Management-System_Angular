import { Component, inject } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { RouterOutlet, RouterLink, Router } from '@angular/router';
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';
import {FormsModule} from '@angular/forms';
import {MatButtonModule} from '@angular/material/button';
import {MatSnackBar} from '@angular/material/snack-bar';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { Vehicle } from '../../types/vehicle';
import { GVAR } from '../../../GVAR';
import { VehiclesService } from '../../services/vehicles.service';

@Component({
  selector: 'app-edit-vehicle-form',
  standalone: true,
  imports: [FormsModule, MatFormFieldModule, MatInputModule,MatButtonModule,RouterOutlet,RouterLink,ReactiveFormsModule],
  templateUrl: './edit-vehicle-form.component.html',
  styleUrl: './edit-vehicle-form.component.css'
})
export class EditVehicleFormComponent {

  vehicleService = inject(VehiclesService);
  status:string="";
  error: string | null = null;
  vehicleForm: FormGroup;

  constructor(private route: ActivatedRoute,private _snackBar: MatSnackBar, private router: Router, private fb: FormBuilder) {
    this.vehicleForm = this.fb.group({
      vehicleNumber: ['',Validators.required],
      vehicleType: ['',Validators.required]
    });
  }
  vehicle!: Vehicle;
  ngOnInit() {
    this.route.params.subscribe(params => {
      const vehicle = history.state.vehicle;
      this.vehicle=vehicle;
      this.vehicleForm.patchValue({
        vehicleNumber: vehicle.VehicleNumber,
        vehicleType: vehicle.VehicleType
      });
    });
  }

  editVehicle() {
    const vehicleData = this.vehicleForm.value;
    var Gvar = new GVAR();
    Gvar.DicOfDic.Tags={
      "VehicleID" : this.vehicle.VehicleID.toString(),
      "VehicleNumber" : vehicleData.vehicleNumber.toString(),
      "VehicleType" : vehicleData.vehicleType
    }
    console.log(Gvar);
    this.vehicleService.editVehicle(Gvar).subscribe({
      next: (response) => {
        console.log(response);
        this.status = response.DicOfDic.Tags["STS"];
        if(this.status == "1"){
          this._snackBar.open("Vehicle updated Successfully", "Ok");
          this.router.navigate(['/vehicles']);
        }else{
          this._snackBar.open("Vehicle doesn't update Successfully", "Ok");
        }
      },
      error: (error) => {
        this.error = error.message;
      }
    });
    }

}
