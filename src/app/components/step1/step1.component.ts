import { CommonModule } from '@angular/common';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { ModelService } from '../../services/model.service';
import { Color, Model } from '../../shared/types';
import { FormsModule } from '@angular/forms';
import { TeslaImageDirective } from '../../directives/tesla-image.directive';
import { FormDataService } from '../../services/form-data.service';

@Component({
  selector: 'app-step1',
  standalone: true,
  imports: [CommonModule, FormsModule, TeslaImageDirective],
  templateUrl: './step1.component.html',
  styleUrl: './step1.component.scss',
})
export class Step1Component implements OnInit, OnDestroy {
  models$?: Subscription;
  formData$?: Subscription;

  models: Model[] | null = null;
  colors: Color[] | null = null;
  modelCode?: string | null = null;
  colorCode?: string | null = null;

  constructor(
    private modelSercive: ModelService,
    private formData: FormDataService
  ) {}

  ngOnInit(): void {
    this.models$ = this.modelSercive.getModels().subscribe((data) => {
      this.models = data;
    });
    this.formData$ = this.formData.getFormData().subscribe((data) => {
      if (data) {
        this.modelCode = data.selectedModel?.code;
        this.colorCode = data.selectedColor?.code;
        this.colors = data.selectedModel?.colors ?? null;
      }
    });
  }
  ngOnDestroy(): void {
    this.formData$?.unsubscribe();
    this.models$?.unsubscribe();
  }
  updateModel(model: string) {
    const selectedModel = this.models?.find((item) => item.code === model);
    this.colors = selectedModel?.colors || null;
    const selectedColor = this.colors?.[0];
    this.colorCode = selectedColor?.code;
    this.formData.updateFormData({
      selectedModel,
      selectedColor,
      selectedConfiguration: null,
    });
  }
  updateColor(color: string) {
    const selectedModel = this.models?.find(
      (item) => item.code === this.modelCode
    );
    const selectedColor = this.colors?.find((item) => item.code === color);
    this.formData.updateFormData({
      selectedModel,
      selectedColor,
      selectedConfiguration: null,
    });
  }
}
