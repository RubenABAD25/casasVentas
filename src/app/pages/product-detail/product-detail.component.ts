import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { ActivatedRoute } from '@angular/router';
import { Product } from 'src/app/models/product';
import { ProductService } from 'src/app/services/product.service';
import { SwiperOptions } from 'swiper';

@Component({
  selector: 'app-product-detail',
  templateUrl: './product-detail.component.html',
  styleUrls: ['./product-detail.component.scss']
})
export class ProductDetailComponent implements OnInit {

  private uid!: string | null;
  private data: any;

  public imgUrl!: string;

  public product!: Product;

  config: SwiperOptions = {
    slidesPerView: 1,
      spaceBetween: 10,
      // navigation: true,
      autoplay: {
        delay: 3000,
        disableOnInteraction: true
      },
      // pagination: { clickable: true },
      // scrollbar: { draggable: true },
  };

  constructor(private title: Title, private route: ActivatedRoute, private ps: ProductService) { }

  ngOnInit(): void {
    this.getRouterParams();
  }


  private getRouterParams(): void {
    this.uid = this.route.snapshot.paramMap.get('id');
    this.data = window.history.state.data;
    if (this.uid) {
      if (this.data) {
        this.product = this.data;
        this.title.setTitle(this.product.title);
        if (this.product.images)
          this.imgUrl = this.product.images[0];
      } else {
        this.obtenerProducto();
      }
    }

  }

  private obtenerProducto() {
    if (this.uid)
      this.ps.getProduct(this.uid)
        .subscribe({
          next: response => {
            if (!!response) {
              this.product = response;
              this.imgUrl = this.product.images![0];
              console.log('Product:', response);
              this.title.setTitle(this.product.title);
            } else {
              location.href = '/error/404';
            }
          },
          error: e => console.error(e),
          complete: () => console.info("Producto recuperado")
        });
  }

}
