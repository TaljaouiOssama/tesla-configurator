import { HttpClient } from '@angular/common/http';
import { DestroyRef, Injectable } from '@angular/core';
import { Configuration } from '../shared/types';
import { Observable } from 'rxjs';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
@Injectable({
  providedIn: 'root',
})
export class ConfigService {
  constructor(private http: HttpClient, private ref: DestroyRef) {}
  getConfig(code: string): Observable<Configuration> {
    return this.http
      .get<Configuration>(`/options/${code}`)
      .pipe(takeUntilDestroyed(this.ref));
  }
}
