import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Model } from '../shared/types';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ModelService {
  constructor(private http: HttpClient) {}

  getModels(): Observable<Model[]> {
    return this.http.get<Model[]>('/models');
  }
}
