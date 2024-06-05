import { Component } from '@angular/core';
import { RouterOutlet, RouterLink } from '@angular/router';
import { VehicleInfoComponent } from './components/vehicleInfo/vehicleInfo.component';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatIconModule} from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { FlexLayoutModule } from '@angular/flex-layout';
import {MatTabsModule} from '@angular/material/tabs';
import { VehicleComponent } from './components/vehicle/vehicle.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet,RouterLink,VehicleInfoComponent,MatToolbarModule,MatIconModule,MatButtonModule,FlexLayoutModule,MatTabsModule,VehicleComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'my-angular-project';
}
