import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class ScrollTotopService {

  public toTop(): void {

    let target: HTMLElement | null = document.getElementById('app-template-site');

    target?.scrollIntoView({
      block: "start",
      inline: "nearest"
    });
  }
  public toTopSmooth(): void {

    let target: HTMLElement | null = document.getElementById('app-template-site');

    target?.scrollIntoView({
      block: "start",
      inline: "nearest",
      behavior: "smooth"
    });
  }
}
