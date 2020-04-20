import { Component, OnInit } from '@angular/core';
import { InventoryService } from '../../../../../services/inventory.service';

@Component({
  selector: 'app-sitemap',
  templateUrl: './sitemap.component.html',
  styleUrls: ['./sitemap.component.css']
})
export class SitemapComponent implements OnInit {
  loading: boolean = false;
  dateUpdated: string = "";
  constructor( public inventoryService: InventoryService ) { }

  ngOnInit() {
  }

  public createSiteMap () {
    this.loading = true;
    this.inventoryService.createSiteMap((data)=>{
      this.dateUpdated = data.data.LastModified;
      // this.askToUpdatePrice = false;
      this.loading = false;
    })
  }

}
