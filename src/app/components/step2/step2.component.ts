import { Component, Input } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ConfigService } from '../../services/config.service';
import { CommonModule } from '@angular/common';
import { Observable, map } from 'rxjs';
import { Configs, Configuration } from '../../shared/types';
import { FormDataService } from '../../services/form-data.service';

@Component({
  selector: 'app-step2',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './step2.component.html',
  styleUrl: './step2.component.scss',
})
export class Step2Component {
  configs$?: Observable<Configuration>;

  selectedConfiguration?: Configs | null = null;
  towHitch: boolean = false;
  yoke: boolean = false;

  @Input()
  set codeModel(value: string) {
    this.configs$ = this.configService.getConfig(value).pipe(
      map((data) => {
        this.towHitch = data.towHitch;
        this.yoke = data.yoke;
        return data;
      })
    );
  }

  constructor(
    private configService: ConfigService,
    private formData: FormDataService
  ) {}

  updateData() {
    this.formData.updateFormData({
      selectedConfiguration: this.selectedConfiguration,
      towHitch: this.towHitch,
      yoke: this.yoke,
    });
  }
}
