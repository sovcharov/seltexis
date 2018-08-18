import { Component, OnInit } from '@angular/core';
import { InventoryService } from '../../../../../services/inventory.service';

@Component({
  selector: 'app-price-list',
  templateUrl: './price-list.component.html',
  styleUrls: ['./price-list.component.css']
})
export class PriceListComponent implements OnInit {

  loading: boolean = true;
  askToUpdatePrice: boolean = false;
  myInterval;
  constructor(
    public inventoryService: InventoryService

  ) { }

  ngOnInit() {
    this.inventoryService.getPriceListUpdateDate((data)=>{
      console.log(data);
      this.loading = false;
    });
  }


  createXLStart() {
    this.askToUpdatePrice = true;
  }

  createXLCancel() {
    this.askToUpdatePrice = false;
  }

  public createXL () {
    this.loading = true;
    this.inventoryService.createXLPrice((data)=>{
      this.inventoryService.getPriceListUpdateDate((data)=>{
        this.loading = false;
        this.askToUpdatePrice = false;
      });
    })
  }



}
