import { Component, OnInit } from '@angular/core';
import { Product } from 'src/app/models/product';
import { OrderDetailsService } from 'src/app/services/order-details.service';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})
export class MenuComponent implements OnInit {

  constructor(private service: OrderDetailsService) { }
  houses: Product[] = [];
  ngOnInit(): void {
    this.houses = this.service.houses;
  }

}
