import { Directive, HostBinding, Input } from '@angular/core';

@Directive({
  selector: '[appTeslaImage]',
  standalone: true,
})
export class TeslaImageDirective {
  private model: string = '';
  private color: string = '';
  @HostBinding('src')
  imageSrc = '';

  @Input()
  set teslaModel(value: string) {
    this.model = value;
    this.imageSrc = this.updateImageSrc(value, this.color);
  }
  @Input()
  set teslaColor(value: string) {
    this.color = value;
    this.imageSrc = this.updateImageSrc(this.model, value);
  }
  private updateImageSrc(model: string, color: string) {
    return `https://interstate21.com/tesla-app/images/${model}/${color}.jpg`;
  }
}
