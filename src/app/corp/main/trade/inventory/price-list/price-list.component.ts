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
  dateUpdated: string = "";
  myInterval;
  constructor(
    public inventoryService: InventoryService

  ) { }

  ngOnInit() {
    this.getPriceListUpdateDate();
  }


 getPriceListUpdateDate() {
   this.loading = true;
   this.inventoryService.getPriceListUpdateDate((data)=>{
     this.dateUpdated = data.LastModified;
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
      this.dateUpdated = data.data.LastModified;
      this.askToUpdatePrice = false;
      this.loading = false;
    })
  }



}
