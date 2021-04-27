import { Component, OnInit } from '@angular/core';
import { InventoryService } from '../../../../services/inventory.service';
import { Tabs } from '../../../../services/tabs.service'


@Component({
  selector: 'app-sales',
  templateUrl: './sales.component.html',
  styleUrls: ['./sales.component.css']
})
export class SalesComponent implements OnInit {

  constructor(
    public inventoryService: InventoryService,
    private tabs: Tabs 
  ) { }

  ngOnInit() {
    // this.inventoryService.getInventoryImages(1110, data => {
    //   console.log(data);
    // });
    // this.inventoryService.deleteInventoryImage('1110','11', data => {
    //   console.log(data);
    // });
  }

  public addTab(name, id) {
    this.tabs.openTab(name, id);
  }

}
