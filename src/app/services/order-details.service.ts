import { Injectable } from '@angular/core';
import { Product } from '../models/product';


@Injectable({
  providedIn: 'root'
})
export class OrderDetailsService {

  constructor() { }

  // description

  houses: Product[] = [
    {
      id: 1,
      title: "Paneer Grilled Sandwich",
      description: "Pan-fried masala paneer.",
      price: 200,
      imageUrl: "https://cdn.pixabay.com/photo/2014/07/10/17/18/large-home-389271__340.jpg"
    },
    {
      id: 2,
      title: "Veggie Supreme",
      description: "Onion| Green Capsicum|Mushroom |black olives , sweet corn , Red Paprika topped with Cheese",
      price: 369,
      imageUrl: "https://cdn.pixabay.com/photo/2013/10/09/02/27/lake-192990__340.jpg"
    },
    {
      id: 3,
      title: "Paneer Burger",
      description: "panner",
      price: 149,
      imageUrl: "https://cdn.pixabay.com/photo/2014/11/21/17/17/house-540796__340.jpg"
    },
    {
      id: 4,
      title: "Veg Masala Roll In Naan",
      description: "A homely mix of mashed potato and veggies, seasoned with Indian spices. A filling sure to take you back to mom's kitchen.",
      price: 140,
      imageUrl: "https://cdn.pixabay.com/photo/2017/04/10/22/28/residence-2219972__340.jpg"
    },
    {
      id: 5,
      title: "Indulgence Brownie",
      description: "(Eggless) Indulge in richly decadent chocolate brownie crafted with love & topped with bitter-sweet chocolate that provides ultra-rich chocolate experience.",
      price: 105,
      imageUrl: "https://cdn.pixabay.com/photo/2016/11/29/03/53/house-1867187__340.jpg"
    },
    {
      id: 6,
      title: "Oreo Cheesecake Ice Cream",
      description: "Oreo ice cream",
      price: 219,
      imageUrl: "https://cdn.pixabay.com/photo/2017/11/16/19/29/cottage-2955582__340.jpg"
    }
  ]




}
