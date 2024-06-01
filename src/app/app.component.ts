import { Component } from '@angular/core';
import { RouterOutlet, RouterLink } from '@angular/router';
import { VehicleComponent } from './components/vehicle/vehicle.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet,RouterLink,VehicleComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'my-angular-project';
}
