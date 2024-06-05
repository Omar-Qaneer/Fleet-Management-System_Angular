import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { GVAR } from '../../GVAR';

@Injectable({
  providedIn: 'root'
})
export class VehiclesService {

  constructor(private http:HttpClient) {   }
  getVehiclesInfo=():Observable<GVAR>=> this.http.get<GVAR>("https://localhost:7051/api/Vehicle/VehiclesInfo")
  getVehicle=(id: number):Observable<GVAR>=> this.http.get<GVAR>(`https://localhost:7051/api/VehiclesInfo/${id}`)
  //editVehicle=(Gvar: GVAR):Observable<GVAR>=> this.http.put<GVAR>("https://localhost:7051/api/Vehicles",GVAR)
  //deleteVehicle=(Gvar: GVAR):Observable<GVAR>=> this.http.put<GVAR>("https://localhost:7051/api/Vehicles",GVAR)
  getVehicles=():Observable<GVAR>=> this.http.get<GVAR>("https://localhost:7051/api/Vehicle")




}
