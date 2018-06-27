import { Component, OnInit } from '@angular/core';
import { InventoryService } from '../../../../../services/inventory.service';

@Component({
  selector: 'app-price-list',
  templateUrl: './price-list.component.html',
  styleUrls: ['./price-list.component.css']
})
export class PriceListComponent implements OnInit {

  loading: boolean = false;
  constructor(
    public inventoryService: InventoryService

  ) { }

  ngOnInit() {
  }

  public createXL () {
    this.loading = true;
    this.inventoryService.createXLPrice((data)=>{
      console.log(data)
      this.loading = false;
    })
  }
}
