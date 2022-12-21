import { AfterViewInit, Component, Input, OnInit, ViewChild } from '@angular/core';
import { Product } from 'src/app/models/product';

import { SwiperComponent } from 'swiper/angular';
import SwiperCore, { Autoplay, SwiperOptions } from 'swiper';

@Component({
  selector: 'app-product-card',
  templateUrl: './product-card.component.html',
  styleUrls: ['./product-card.component.scss']
})
export class ProductCardComponent implements AfterViewInit {

  @Input() product!: Product;
  @ViewChild('swiperSlideShow') swiperSlideShow!: SwiperComponent;


  config: SwiperOptions = {};

  constructor() {
    SwiperCore.use([Autoplay]);
  }

  ngAfterViewInit(): void {
    this.config = {
      slidesPerView: 1,
      spaceBetween: 10,
      // navigation: true,
      autoplay: {
        delay: 3000,
        disableOnInteraction: false
      },
      // pagination: { clickable: true },
      // scrollbar: { draggable: true },
    }
    this.swiperSlideShow.swiperRef.autoplay.start();
  }

}
