import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { GVAR } from '../../GVAR';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class RouteHistoryService {

  constructor(private http:HttpClient) { }

  getRoutesHistories=(id: number):Observable<GVAR>=> this.http.get<GVAR>(`https://localhost:7051/api/RouteHistory/${id}`)

}
