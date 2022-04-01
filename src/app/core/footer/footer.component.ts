import { Component, HostListener } from '@angular/core';
import { GlobalObjectServiceService } from 'src/app/global-object-service.service';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.css']
})
export class FooterComponent {
  mobileMode: boolean;
  showMenu: boolean;
  innerWidth: number;
  @HostListener('window:resize', ['$event'])
  getScreenSize(event?) {
        this.innerWidth = this.GlobalObjectServiceService.getWindow().innerWidth;
  }
  constructor(private GlobalObjectServiceService: GlobalObjectServiceService) {
    this.getScreenSize();
    if (this.innerWidth < 426) {
      this.mobileMode = true
    }
    else  {
      this.mobileMode=false
    }
  }

  openMenu() {
    if (!this.showMenu) {
      this.showMenu = true
    } else {
      this.showMenu = false
    }
  }

}
