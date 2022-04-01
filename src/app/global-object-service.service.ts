import { DOCUMENT } from '@angular/common';
import { Inject, Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class GlobalObjectServiceService {
  constructor(@Inject(DOCUMENT) private document: Document) {}

  getWindow(): Window | null {
    return this.document.defaultView;
  }

  getLocation(): Location {
    return this.document.location;
  }

  createElement(tag: string): HTMLElement {
    return this.document.createElement(tag);
  }
}
