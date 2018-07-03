import { Component, OnInit } from '@angular/core';
import { InventoryService } from '../../../../../services/inventory.service';

@Component({
  selector: 'app-price-list',
  templateUrl: './price-list.component.html',
  styleUrls: ['./price-list.component.css']
})
export class PriceListComponent implements OnInit {

  loading: boolean = true;
  myInterval;
  constructor(
    public inventoryService: InventoryService

  ) { }

  ngOnInit() {
    this.inventoryService.getPriceListCreateGetStatus((data)=>{
      if (data[0].value === "0") {
        this.loading = false;
      } else {
        this.startCheckPriceList();
      }
    });
  }


  startCheckPriceList() {
    this.myInterval = setInterval(() => {
      this.inventoryService.getPriceListCreateGetStatus((data)=>{
        if (data[0].value === "0") {
          this.loading = false;
          this.stopCheckPriceList();
        }
        // console.log(data);
      });
    }, 10000);
  }

  stopCheckPriceList() {
    clearInterval(this.myInterval);
  }

  public createXL () {
    this.loading = true;
    this.inventoryService.createXLPrice((data)=>{
      // console.log(data)
      this.startCheckPriceList();
      // this.loading = false;
    })
  }



}
