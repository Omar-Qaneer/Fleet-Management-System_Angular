import { Component, inject } from '@angular/core';
import { DriverService } from '../../services/driver.service';
import { Driver } from '../../types/driver';
import { ActivatedRoute } from '@angular/router';
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
  selector: 'app-edit-driver-form',
  standalone: true,
  imports: [FormsModule, MatFormFieldModule, MatInputModule,MatButtonModule,RouterOutlet,RouterLink,ReactiveFormsModule],
  templateUrl: './edit-driver-form.component.html',
  styleUrl: './edit-driver-form.component.css'
})
export class EditDriverFormComponent {
  driverService = inject(DriverService);
  status:string="";
  error: string | null = null;
  driverForm: FormGroup;

  constructor(private route: ActivatedRoute,private _snackBar: MatSnackBar, private router: Router, private fb: FormBuilder) {
    this.driverForm = this.fb.group({
      driverName: ['',Validators.required],
      phoneNumber: ['',Validators.required]
    });
  }
  driver!: Driver;
  ngOnInit() {
    this.route.params.subscribe(params => {
      const driver = history.state.driver;
      this.driver=driver;
      this.driverForm.patchValue({
        driverName: driver.DriverName,
        phoneNumber: driver.PhoneNumber
      });
    });
  }

  editDriver() {
    const driverData = this.driverForm.value;
    var Gvar = new GVAR();
    Gvar.DicOfDic.Tags={
      "DriverID" : this.driver.DriverID.toString(),
      "DriverName" : driverData.driverName,
      "PhoneNumber" : driverData.phoneNumber.toString()
    }
    console.log(Gvar);
    this.driverService.editDriver(Gvar).subscribe({
      next: (response) => {
        console.log(response);
        this.status = response.DicOfDic.Tags["STS"];
        if(this.status == "1"){
          this._snackBar.open("Driver data updated Successfully", "Ok");
          this.router.navigate(['/drivers']);
        }else{
          this._snackBar.open("Driver data isn't updated Successfully", "Ok");
        }
      },
      error: (error) => {
        this.error = error.message;
      }
    });
    }
}
