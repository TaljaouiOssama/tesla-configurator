import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Data } from '../shared/types';

@Injectable({
  providedIn: 'root',
})
export class FormDataService {
  private formDataSubject = new BehaviorSubject<Partial<Data> | null>(null);

  getFormData() {
    return this.formDataSubject.asObservable();
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
