import { Component, OnInit } from '@angular/core';
import {
  Router,
  ActivatedRoute
} from '@angular/router';
import { InventoryService } from '../../../../services/inventory.service';

import { Tabs } from '../../../../services/tabs.service'

@Component({
  selector: 'app-inventory',
  templateUrl: './inventory.component.html',
  styleUrls: ['./inventory.component.css']
})
export class InventoryComponent implements OnInit {

  loading: boolean;
  inventoryToSearch: string = "";
  constructor(
    public inventoryService: InventoryService,
    private router: Router,
    private activaterRoute: ActivatedRoute,
    private tabs: Tabs

  ) {
  }

  ngOnInit() {
  }

  public getAllInventory() {
    this.loading = true;
    this.inventoryService.inventory = [];
    this.inventoryService.getAllInventory(() => {
      this.loading = false;
    });
  }

  public openInventoryId(id) {
    this.inventoryService.inventoryToEdit = {id: id};
    this.inventoryService.getInventory(id,()=>{});
    this.tabs.openTab(`Редактор`, `app-inventory-change`);
  }

  public searchInventory() {
    this.loading = true;
    this.inventoryService.searchInventory(this.inventoryToSearch, () => {
      this.loading = false;
    });
  }

}
