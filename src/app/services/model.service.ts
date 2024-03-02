import { HttpClient } from '@angular/common/http';
import { DestroyRef, Injectable } from '@angular/core';
import { Model } from '../shared/types';
import { Observable } from 'rxjs';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

@Injectable({
  providedIn: 'root',
})
export class ModelService {
  constructor(private http: HttpClient, private ref: DestroyRef) {}

  getModels(): Observable<Model[]> {
    return this.http.get<Model[]>('/models').pipe(takeUntilDestroyed(this.ref));
  }
}
