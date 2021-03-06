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
  constructor( 
    public inventoryService: InventoryService
  ) { }

  ngOnInit() {
    this.getSiteMapUpdateDate();
  }

  public getSiteMapUpdateDate() {
    this.loading = true;
    this.inventoryService.getSiteMapUpdateDate((data)=>{
      // console.log(data);
      this.dateUpdated = data.LastModified;
      this.loading = false;
    });
  }

  public createSiteMap () {
    console.log("Hi");
    this.loading = true;
    this.inventoryService.createSiteMap((data)=>{
      // console.log(data);
      this.dateUpdated = data.data.LastModified;
      // this.askToUpdatePrice = false;
      this.loading = false;
    })
  }



}
