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
  checkAll: boolean = false;
  constructor(
    public inventoryService: InventoryService
  ) { }

  ngOnInit() {
  }

  public getInventory() {
    this.loading = true;
    this.inventoryService.inventoryPermalinks = [];
    this.inventoryService.getInventoryForPermalinks(() => {
      for(let i = 0; i < this.inventoryService.inventoryPermalinks.length; i += 1) {
        this.inventoryService.inventoryPermalinks[i].numbersString ="";
        this.inventoryService.inventoryPermalinks[i].checked = false;
        this.inventoryService.inventoryPermalinks[i].permalink = {text:"", loading: false};


        for (let j = 0; j < this.inventoryService.inventoryPermalinks[i].numbers.length; j += 1) {
            this.inventoryService.inventoryPermalinks[i].numbersString += `${this.inventoryService.inventoryPermalinks[i].numbers[j].number}-${this.inventoryService.inventoryPermalinks[i].numbers[j].manufacturerFullName} `;

        }
      }
      // console.log(this.inventoryService.inventoryPermalinks);
      this.loading = false;
    });
  }

  public generatePermaLinks() {
    for(let i = 0; i < this.inventoryService.inventoryPermalinks.length; i += 1) {
      if (this.inventoryService.inventoryPermalinks[i].checked) {
        this.inventoryService.inventoryPermalinks[i].permalink.loading = true;
        this.inventoryService.getRecommendedUrlForItem(this.inventoryService.inventoryPermalinks[i], (res) => {
          this.inventoryService.inventoryPermalinks[i].permalink.text = res.text;
          this.inventoryService.inventoryPermalinks[i].permalink.loading = false;

        });
      }
    }
  }

  public savePermaLinks() {
    for(let i = 0; i < this.inventoryService.inventoryPermalinks.length; i += 1) {
      if (this.inventoryService.inventoryPermalinks[i].checked) {
        this.inventoryService.inventoryPermalinks[i].permalink.loading = true;
        this.inventoryService.updateInventoryUrl(this.inventoryService.inventoryPermalinks[i].id, this.inventoryService.inventoryPermalinks[i].permalink.text, (res) => {
          this.inventoryService.inventoryPermalinks[i].permalink.loading = false;

        });
      }
    }
  }

  checkAllItems () {
    console.log(this.checkAll);
    for(let i = 0; i < this.inventoryService.inventoryPermalinks.length; i += 1) {
      this.inventoryService.inventoryPermalinks[i].checked = this.checkAll;
    }
  }

}
