import { DestroyRef, Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Data } from '../shared/types';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
@Injectable({
  providedIn: 'root',
})
export class FormDataService {
  private formDataSubject = new BehaviorSubject<Partial<Data> | null>(null);

  constructor(private ref: DestroyRef) {}
  getFormData(): Observable<Partial<Data> | null> {
    return this.formDataSubject
      .asObservable()
      .pipe(takeUntilDestroyed(this.ref));
  }

  updateFormData(data: Partial<Data>) {
    const prev = this.formDataSubject.getValue();
    this.formDataSubject.next({ ...prev, ...data });
  }

  canActivateStep2() {
    const formData = this.formDataSubject.getValue();
    return formData?.selectedColor?.code && formData?.selectedModel?.code;
  }

  canActivateStep3() {
    const formData = this.formDataSubject.getValue();
    return this.canActivateStep2() && formData?.selectedConfiguration?.id;
  }
}
