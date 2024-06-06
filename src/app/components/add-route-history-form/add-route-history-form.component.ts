import { Component, inject } from '@angular/core';
import { RouterOutlet, RouterLink, Router, ActivatedRoute } from '@angular/router';
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';
import {FormsModule} from '@angular/forms';
import {MatButtonModule} from '@angular/material/button';
import {MatSnackBar} from '@angular/material/snack-bar';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { VehiclesService } from '../../services/vehicles.service';
import { GVAR } from '../../../GVAR';
import { RouteHistoryService } from '../../services/route-history.service';

@Component({
  selector: 'app-add-route-history-form',
  standalone: true,
  imports: [FormsModule, MatFormFieldModule, MatInputModule,MatButtonModule,RouterOutlet,RouterLink,ReactiveFormsModule],
  templateUrl: './add-route-history-form.component.html',
  styleUrl: './add-route-history-form.component.css'
})
export class AddRouteHistoryFormComponent {
  routeHistoryService = inject(RouteHistoryService);
  status:string="";
  error: string | null = null;
  routeHistoryForm: FormGroup;
  vehicleID!:number;

  constructor(private _snackBar: MatSnackBar, private router: Router, private fb: FormBuilder,private route: ActivatedRoute) {
    this.routeHistoryForm = this.fb.group({
      vehicleDirection: ['',Validators.required],
      status: ['',Validators.required],
      vehicleSpeed: ['',Validators.required],
      address: ['',Validators.required],
      latitude: ['',Validators.required],
      longitude: ['',Validators.required]
    });
  }

  ngOnInit() {
    this.route.params.subscribe(params => {
      const vehicleID = history.state.vehicleID;
      this.vehicleID = vehicleID;
    });
  }

  addVehicleInfo(){
    const vehicleInfoData = this.routeHistoryForm.value;
    var Gvar = new GVAR();
    const currentEpochTime: number = Date.now();
    Gvar.DicOfDic.Tags={
      "VehicleID" : this.vehicleID.toString(),
      "VehicleDirection" : vehicleInfoData.vehicleDirection,
      "Status" : vehicleInfoData.status,
      "VehicleSpeed" : vehicleInfoData.vehicleSpeed,
      "Epoch" : currentEpochTime.toString(),
      "Address" : vehicleInfoData.address,
      "Latitude" : vehicleInfoData.latitude,
      "Longitude" : vehicleInfoData.longitude,
    }
    console.log(Gvar);
    this.routeHistoryService.addRouteHistory(Gvar).subscribe({
      next: (response) => {
        console.log(response);
        this.status = response.DicOfDic.Tags["STS"];
        if(this.status == "1"){
          this._snackBar.open("RouteHistory Added Successfully", "Ok");
          this.router.navigate(['/vehiclesDetails']);
        }else{
          this._snackBar.open("RouteHistory doesn't Add Successfully", "Ok");
        }
      },
      error: (error) => {
        this.error = error.message;
      }
    });
  }
}
