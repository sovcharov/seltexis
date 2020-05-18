import { Component, OnInit } from '@angular/core';
import { InventoryService } from '../../../../../services/inventory.service';
import { LoadAnimationService } from '../../../../../services/load-animation.service';


@Component({
  selector: 'app-sitemap',
  templateUrl: './sitemap.component.html',
  styleUrls: ['./sitemap.component.css']
})
export class SitemapComponent implements OnInit {
  loading: boolean = false;
  dateUpdated: string = "";
  constructor( 
    public inventoryService: InventoryService,
    private loadAnimationService: LoadAnimationService
  ) { }

  ngOnInit() {
    this.getSiteMapUpdateDate();
  }

  public getSiteMapUpdateDate() {
    this.loadAnimationService.loading = true;
    this.inventoryService.getSiteMapUpdateDate((data)=>{
      // console.log(data);
      this.dateUpdated = data.LastModified;
      this.loadAnimationService.loading = false;
    });
  }

  public createSiteMap () {
    console.log("Hi");
    this.loadAnimationService.loading = true;
    this.inventoryService.createSiteMap((data)=>{
      // console.log(data);
      this.dateUpdated = data.data.LastModified;
      // this.askToUpdatePrice = false;
      this.loadAnimationService.loading = false;
    })
  }



}
