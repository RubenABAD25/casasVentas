import { Component, OnInit } from '@angular/core';
import { Product } from 'src/app/models/product';
import { OrderDetailsService } from 'src/app/services/order-details.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  constructor(private service: OrderDetailsService) { }
  houses: Product[] = [];
  ngOnInit(): void {
    this.houses = this.service.houses;
  }

}
