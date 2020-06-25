import { Component, OnInit } from '@angular/core';
import { InventoryService } from '../../../../services/inventory.service';

@Component({
  selector: 'app-sales',
  templateUrl: './sales.component.html',
  styleUrls: ['./sales.component.css']
})
export class SalesComponent implements OnInit {

  constructor(
    public inventoryService: InventoryService
  ) { }

  ngOnInit() {
    // this.inventoryService.getInventoryImages(1110, data => {
    //   console.log(data);
    // });
    // this.inventoryService.deleteInventoryImage('1110','11', data => {
    //   console.log(data);
    // });
  }

}
