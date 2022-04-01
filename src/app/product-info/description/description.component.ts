import { Component, Input } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';

@Component({
  selector: 'app-description',
  templateUrl: './description.component.html',
  styleUrls: ['./description.component.css']
})

export class DescriptionComponent {
  @Input() productDetails: any
  withVideo: boolean = false
  constructor(private sanitizer: DomSanitizer) { }
  active = 1
  ngOnChanges() {
    if (this.productDetails?.video) {
      this.productDetails.video = this.sanitizer.bypassSecurityTrustHtml(this.productDetails.video);
      this.withVideo = true
    }
    else {
      this.withVideo = false
    }
  }

}
