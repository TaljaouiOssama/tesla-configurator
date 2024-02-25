import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Configuration } from '../shared/types';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ConfigService {
  constructor(private http: HttpClient) {}
  getConfig(code: string): Observable<Configuration> {
    return this.http.get<Configuration>(`/options/${code}`);
  }
}
