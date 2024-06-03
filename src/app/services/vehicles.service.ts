import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { GVAR } from '../../GVAR';

@Injectable({
  providedIn: 'root'
})
export class VehiclesService {

  constructor(private http:HttpClient) {   }
  getVehicles=():Observable<GVAR>=> this.http.get<GVAR>("https://localhost:7051/api/Vehicle/VehiclesInfo")
  getVehicle=(id: number):Observable<GVAR>=> this.http.get<GVAR>(`https://localhost:7051/api/VehiclesInfo/${id}`)


}
