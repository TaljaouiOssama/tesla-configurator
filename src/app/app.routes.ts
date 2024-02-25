import { Routes } from '@angular/router';
import { Step1Component } from './components/step1/step1.component';
import { Step2Component } from './components/step2/step2.component';
import { Step3Component } from './components/step3/step3.component';

export const routes: Routes = [
  {
    path: '',
    component: Step1Component,
  },
  {
    path: 'step2/:codeModel',
    component: Step2Component,
  },
  {
    path: 'step3',
    component: Step3Component,
  },
];
