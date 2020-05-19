import { Component, OnInit } from '@angular/core';
import { InventoryService } from '../../../../../services/inventory.service';
import { IconService } from '../../../../../services/icon.service';
import { AlertService, Alert } from '../../../../../services/alert.service';



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
    public inventoryService: InventoryService,
    public iconService: IconService,
    private alertService: AlertService
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
      this.loading = false;
    });
  }

  public generatePermaLinks() {
    let qtyChecked: number = 0;
    for(let i = 0; i < this.inventoryService.inventoryPermalinks.length; i += 1) {
      if (this.inventoryService.inventoryPermalinks[i].checked) {
        qtyChecked += 1;
        this.inventoryService.inventoryPermalinks[i].permalink.loading = true;
        this.inventoryService.getRecommendedUrlForItem(this.inventoryService.inventoryPermalinks[i], (res) => {
          this.inventoryService.inventoryPermalinks[i].permalink.text = res.text;
          this.inventoryService.inventoryPermalinks[i].permalink.loading = false;

        });
      }
    }
    if (!qtyChecked) {
      let alert: Alert = {
        alertClass: "Danger",
        text: "0 items checked",
        comment: "Please check items to proceed"
      }
      this.alertService.addAlert(alert);
    }
  }

  public savePermaLinks() {
    let qtyChecked: number = 0;
    for(let i = 0; i < this.inventoryService.inventoryPermalinks.length; i += 1) {
      if (this.inventoryService.inventoryPermalinks[i].checked && this.inventoryService.inventoryPermalinks[i].permalink.text) {
        qtyChecked += 1;
        this.inventoryService.inventoryPermalinks[i].permalink.loading = true;
        this.inventoryService.updateInventoryUrl(this.inventoryService.inventoryPermalinks[i].id, this.inventoryService.inventoryPermalinks[i].permalink.text, (res) => {
          this.inventoryService.inventoryPermalinks[i].permalink.loading = false;
        });
      }
    }
    if (!qtyChecked) {
      let alert: Alert = {
        alertClass: "Danger",
        text: "0 items saved",
        comment: "check box or generate"
      }
      this.alertService.addAlert(alert);
    }
  }

  checkAllItems () {
    for(let i = 0; i < this.inventoryService.inventoryPermalinks.length; i += 1) {
      this.inventoryService.inventoryPermalinks[i].checked = this.checkAll;
    }
  }

  public isAnyChecked(): boolean {
    for(let i = 0; i < this.inventoryService.inventoryPermalinks.length; i += 1) {
      if (this.inventoryService.inventoryPermalinks[i].checked) {
        return true;
      }
    }
    return false;
  }

  public isAnyCheckedWithPermalink(): boolean {
    for(let i = 0; i < this.inventoryService.inventoryPermalinks.length; i += 1) {
      if (this.inventoryService.inventoryPermalinks[i].checked && this.inventoryService.inventoryPermalinks[i].permalink.text) {
        return true;
      }
    }
    return false;
  }

}
