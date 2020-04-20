import { Component, OnInit } from '@angular/core';
import { InventoryService } from '../../../../../services/inventory.service';

@Component({
  selector: 'app-permalink',
  templateUrl: './permalink.component.html',
  styleUrls: ['./permalink.component.css']
})
export class PermalinkComponent implements OnInit {


  loading: boolean;
  inventoryToSearch: string = "";
  constructor(
    public inventoryService: InventoryService
  ) { }

  ngOnInit() {
  }

  public getInventory() {
    this.loading = true;
    this.inventoryService.inventoryPermalinks = [];
    this.inventoryService.getInventoryForPermalinks(() => {
      this.loading = false;
    });
  }

}
