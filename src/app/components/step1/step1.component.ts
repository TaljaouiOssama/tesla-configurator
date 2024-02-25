import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
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
export class Step1Component implements OnInit {
  models$: Observable<Model[]> | null = null;

  selectedModel?: Model | null = null;
  selectedColor?: Color | null = null;

  constructor(
    private modelSercive: ModelService,
    private formData: FormDataService
  ) {}

  ngOnInit(): void {
    this.models$ = this.modelSercive.getModels();
    this.formData.getFormData().subscribe((data) => {
      if (data) {
        this.selectedModel = data.selectedModel ?? this.selectedModel;
        this.selectedColor = data.selectedColor;
      }
    });
  }
  updateData() {
    this.formData.updateFormData({
      selectedModel: this.selectedModel,
      selectedColor: this.selectedColor,
    });
  }
}
