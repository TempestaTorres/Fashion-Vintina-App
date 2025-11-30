import { Injectable } from '@angular/core';
declare var $: any;

export interface SlickOptions {
  autoplay: boolean;
  slidesToShow: number;
  height?: number;
}

@Injectable({
  providedIn: 'root',
})
export class SlickService {

  private slick: any;

  constructor() {
  }

  public slickMount(selector: string,options: SlickOptions): void {

    this.slick = $(selector);

    if (this.slick) {

      this.slick.slick({
        autoplay: options.autoplay,
        slidesToShow: options.slidesToShow,
        prevArrow: '<button type="button" class="slick-prev"></button>',
        nextArrow: '<button type="button" class="slick-next"></button>'
      });

      if (options.height) {
        let h: string = options.height + 'px';
        let wrap = $(selector).find(".apsisac-img-wrap");
        if (wrap) {
          wrap.css('height', h);
        }
      }
    }
  }

  public slickPlay(): void {
    this.slick.slick('slickPlay');
  }
  public slickPause(): void {
    this.slick.slick('slickPause');
  }
  public slickNext(): void {
    this.slick.slick('slickNext');
  }
  public slickPrev(): void {
    this.slick.slick('slickPrev');
  }
  public unslick(): void {
    this.slick.slick('unslick');
  }
}
