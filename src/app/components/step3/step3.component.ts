import { Component, OnInit } from '@angular/core';
import { Data } from '../../shared/types';
import { FormDataService } from '../../services/form-data.service';
import { Observable, map } from 'rxjs';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-step3',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './step3.component.html',
  styleUrl: './step3.component.scss',
})
export class Step3Component implements OnInit {
  summary$: Observable<
    | (Partial<Data> & {
        towHitchCost?: number;
        yokeCost?: number;
        totalCost?: number;
      })
    | null
  > | null = null;
  constructor(private formData: FormDataService) {}
  ngOnInit(): void {
    this.summary$ = this.formData.getFormData().pipe(
      map((data) => {
        const baseCost = data?.selectedConfiguration?.price ?? 0;
        const towHitchCost = data?.towHitch ? 1000 : 0;
        const yokeCost = data?.yoke ? 1000 : 0;
        const paintCost = data?.selectedColor?.price ?? 0;
        const totalCost = baseCost + towHitchCost + yokeCost + paintCost;
        return {
          ...data,
          towHitchCost,
          yokeCost,
          totalCost,
        };
      })
    );
  }
}
