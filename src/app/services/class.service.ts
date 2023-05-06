import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { Class } from '../model/class.model';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ClassService {

  constructor( private http: HttpClient) { }
  public loadAllClasses(): Observable<Array<Class>> {
    return this.http.get<Array<Class>>("/api/v1/class/");
  }
}
