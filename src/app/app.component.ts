import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink, RouterOutlet } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { FormDataService } from './services/form-data.service';
import { TeslaImageDirective } from './directives/tesla-image.directive';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    RouterOutlet,
    RouterLink,
    HttpClientModule,
    TeslaImageDirective,
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent implements OnInit {
  isStep2Disabled = true;
  isStep3Disabled = true;
  modelCode?: string;
  colorCode?: string;
  constructor(private formData: FormDataService) {}
  ngOnInit(): void {
    this.formData.getFormData().subscribe((data) => {
      if (data) {
        this.isStep2Disabled = !(
          data.selectedColor?.code && data.selectedModel?.code
        );
        this.isStep3Disabled = !data.selectedConfiguration?.id;
        this.modelCode = data.selectedModel?.code;
        this.colorCode = data.selectedColor?.code;
      }
    });
  }
}
