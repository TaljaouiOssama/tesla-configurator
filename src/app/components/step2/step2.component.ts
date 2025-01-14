import { Component, Input } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ConfigService } from '../../services/config.service';
import { CommonModule } from '@angular/common';
import { Configs } from '../../shared/types';
import { FormDataService } from '../../services/form-data.service';

@Component({
  selector: 'app-step2',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './step2.component.html',
  styleUrl: './step2.component.scss',
})
export class Step2Component {
  configs: Configs[] | null = null;
  selectedConfiguration: Configs | null = null;
  configurationId: number | null = null;
  initTowHitch: boolean = false;
  initYoke: boolean = false;
  towHitch: boolean | null = null;
  yoke: boolean | null = null;

  @Input()
  set codeModel(value: string) {
    this.formData.getFormData().subscribe((data) => {
      if (data) {
        this.selectedConfiguration = data.selectedConfiguration ?? null;
        this.configurationId = this.selectedConfiguration?.id ?? null;
        if (this.towHitch === null) this.towHitch = data.towHitch as boolean;
        if (this.yoke === null) this.yoke = data.yoke as boolean;
      }
    });

    this.configService.getConfig(value).subscribe((data) => {
      this.configs = data.configs ?? null;

      if (!this.configurationId) {
        this.towHitch = data.towHitch;
        this.yoke = data.yoke;
      }

      this.initTowHitch = data.towHitch;
      this.initYoke = data.yoke;
    });
  }

  constructor(
    private configService: ConfigService,
    private formData: FormDataService
  ) {}

  updateConfiguration(configId: number) {
    this.selectedConfiguration =
      this.configs?.find((item) => item.id === configId) ?? null;
    this.formData.updateFormData({
      selectedConfiguration: this.selectedConfiguration,
      towHitch: this.towHitch,
      yoke: this.yoke,
    });
  }
  updateYoke() {
    this.formData.updateFormData({
      yoke: this.yoke,
    });
  }
  updateTowHitch() {
    this.formData.updateFormData({
      towHitch: this.towHitch,
    });
  }
}
