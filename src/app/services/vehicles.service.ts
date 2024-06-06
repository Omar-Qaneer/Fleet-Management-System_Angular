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
  addVehicleInfo=(Gvar: GVAR):Observable<GVAR>=> this.http.post<GVAR>("https://localhost:7051/api/VehiclesInfo",Gvar)
  getVehicle=(id: number):Observable<GVAR>=> this.http.get<GVAR>(`https://localhost:7051/api/VehiclesInfo/${id}`)
  addVehicle=(Gvar: GVAR):Observable<GVAR>=> this.http.post<GVAR>("https://localhost:7051/api/Vehicle",Gvar)
  editVehicle=(Gvar: GVAR):Observable<GVAR>=> this.http.put<GVAR>("https://localhost:7051/api/Vehicle",Gvar)
  deleteVehicle=(id: number):Observable<GVAR>=> this.http.delete<GVAR>(`https://localhost:7051/api/Vehicle/${id}`)
  getVehicles=():Observable<GVAR>=> this.http.get<GVAR>("https://localhost:7051/api/Vehicle")




}
