import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { OrderDetailsService } from 'src/app/services/order-details.service';

@Component({
  selector: 'app-menupage',
  templateUrl: './menupage.component.html',
  styleUrls: ['./menupage.component.scss']
})
export class MenupageComponent implements OnInit {

  constructor(private param: ActivatedRoute, private service: OrderDetailsService) { }
  id: any;
  menuData: any;

  ngOnInit(): void {
    this.id = this.param.snapshot.paramMap.get('id');
    console.log(this.id, 'getmenu');
    if (this.id) {
      this.menuData = this.service.houses.filter((house) => {
        return house.id == this.id;
      });
      console.log(this.menuData, 'menudata>>');

    }

  }

}
