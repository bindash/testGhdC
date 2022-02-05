import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'
import { environment } from 'src/environments/environment';
import { Patient } from '../models/patient.model';
import { Observable } from 'rxjs'

@Injectable({
  providedIn: 'root'
})
export class PatientService {

  private readonly _endPoint: string = environment.api + "/patients"

  constructor(private _http: HttpClient) { }

  getAll(): Observable<Patient[]> {
    return this._http.get<Patient[]>(this._endPoint)
  }

  getById(id: number): Observable<Patient> {
    return this._http.get<Patient>(this._endPoint + "/" + id)
  }
}
