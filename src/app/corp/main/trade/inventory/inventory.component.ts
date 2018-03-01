import { Component, OnInit } from '@angular/core';
import {
  Router,
  ActivatedRoute
} from '@angular/router';
import { CompanyService } from '../../../../services/company.service';
import { InventoryService } from '../../../../services/inventory.service';

import { Tabs } from '../../../../services/tabs.service'

@Component({
  selector: 'app-inventory',
  templateUrl: './inventory.component.html',
  styleUrls: ['./inventory.component.css']
})
export class InventoryComponent implements OnInit {

  loading: boolean;
  constructor(
    private inventoryService: InventoryService,
    private router: Router,
    private activaterRoute: ActivatedRoute,
    private companyService: CompanyService,
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
    // console.log(this.router.url);
    this.router.navigate([`/${this.companyService.company.name}/inventory/change/`, id]);
    this.tabs.addTab(`Редактор ${id}`, `/${this.companyService.company.name}/inventory/change/${id}`);

  }

}
