import { Component, inject } from '@angular/core';
import { DriverService } from '../../services/driver.service';
import { RouterOutlet, RouterLink, Router } from '@angular/router';
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';
import {FormsModule} from '@angular/forms';
import {MatButtonModule} from '@angular/material/button';
import {MatSnackBar} from '@angular/material/snack-bar';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { GVAR } from '../../../GVAR';

@Component({
  selector: 'app-add-driver-form',
  standalone: true,
  imports: [FormsModule, MatFormFieldModule, MatInputModule,MatButtonModule,RouterOutlet,RouterLink,ReactiveFormsModule],
  templateUrl: './add-driver-form.component.html',
  styleUrl: './add-driver-form.component.css'
})
export class AddDriverFormComponent {

  driverService = inject(DriverService);
  status:string="";
  error: string | null = null;
  driverForm: FormGroup;


  constructor(private _snackBar: MatSnackBar, private router: Router, private fb: FormBuilder) {
    this.driverForm = this.fb.group({
      driverName: ['',Validators.required],
      phoneNumber: ['',Validators.required]
    });
  }

  addDriver(){
    const vehicleData = this.driverForm.value;
    var Gvar = new GVAR();
    Gvar.DicOfDic.Tags={
      "DriverName" : vehicleData.driverName,
      "PhoneNumber" : vehicleData.phoneNumber
    }
    console.log(Gvar);
    this.driverService.addDriver(Gvar).subscribe({
      next: (response) => {
        this.status = response.DicOfDic.Tags["STS"];
        if(this.status == "1"){
          this._snackBar.open("Driver Added Successfully", "Ok");
          this.router.navigate(['/drivers']);
        }else{
          this._snackBar.open("Driver isn't Added Successfully", "Ok");
        }
      },
      error: (error) => {
        this.error = error.message;
      }
    });
  }
}
