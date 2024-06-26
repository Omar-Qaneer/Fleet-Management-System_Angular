import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { GVAR } from '../../GVAR';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DriverService {

  constructor(private http:HttpClient) { }

  getDrivers=():Observable<GVAR>=> this.http.get<GVAR>("https://localhost:7051/api/Driver");
  addDriver=(Gvar: GVAR):Observable<GVAR>=> this.http.post<GVAR>("https://localhost:7051/api/Driver",Gvar);
  editDriver=(Gvar: GVAR):Observable<GVAR>=> this.http.put<GVAR>("https://localhost:7051/api/Driver",Gvar);
  deleteDriver=(id: number):Observable<GVAR>=> this.http.delete<GVAR>(`https://localhost:7051/api/Driver/${id}`)


}
