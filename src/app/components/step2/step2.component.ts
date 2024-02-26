import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ConfigService } from '../../services/config.service';
import { CommonModule } from '@angular/common';
import { Subscription } from 'rxjs';
import { Configs } from '../../shared/types';
import { FormDataService } from '../../services/form-data.service';

@Component({
  selector: 'app-step2',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './step2.component.html',
  styleUrl: './step2.component.scss',
})
export class Step2Component implements OnInit, OnDestroy {
  configs$?: Subscription;
  formData$?: Subscription;

  configs: Configs[] | null = null;
  selectedConfiguration: Configs | null = null;
  configurationId: number | null = null;
  towHitch: boolean = false;
  yoke: boolean = false;

  @Input()
  set codeModel(value: string) {
    this.configs$ = this.configService.getConfig(value).subscribe((data) => {
      this.configs = data.configs ?? null;
      this.towHitch = data.towHitch;
      this.yoke = data.yoke;
    });
  }

  constructor(
    private configService: ConfigService,
    private formData: FormDataService
  ) {}

  ngOnInit(): void {
    this.formData$ = this.formData.getFormData().subscribe((data) => {
      if (data) {
        this.selectedConfiguration = data.selectedConfiguration ?? null;
        this.configurationId = this.selectedConfiguration?.id ?? null;
      }
    });
  }

  ngOnDestroy(): void {
    this.configs$?.unsubscribe();
    this.formData$?.unsubscribe();
  }

  updateConfiguration(configId: number) {
    this.selectedConfiguration =
      this.configs?.find((item) => item.id === configId) ?? null;
    this.formData.updateFormData({
      selectedConfiguration: this.selectedConfiguration,
      towHitch: this.towHitch,
      yoke: this.yoke,
    });
  }
}
