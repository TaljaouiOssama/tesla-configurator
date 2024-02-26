import { Router, Routes } from '@angular/router';
import { Step1Component } from './components/step1/step1.component';
import { Step2Component } from './components/step2/step2.component';
import { Step3Component } from './components/step3/step3.component';
import { FormDataService } from './services/form-data.service';
import { inject } from '@angular/core';

export const routes: Routes = [
  {
    path: '',
    component: Step1Component,
  },
  {
    path: 'step2/:codeModel',
    component: Step2Component,
    canActivate: [
      () =>
        inject(FormDataService).canActivateStep2() ||
        inject(Router).parseUrl(''),
    ],
  },
  {
    path: 'step3',
    component: Step3Component,
    canActivate: [
      () =>
        inject(FormDataService).canActivateStep3() ||
        inject(Router).parseUrl(''),
    ],
  },
];
