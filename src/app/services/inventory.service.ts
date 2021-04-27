// import { Observable } from 'rxjs/Observable';
import { Injectable } from '@angular/core';

import { ServerService } from './server.service';
import { CompanyService } from './company.service';
import { AlertService, Alert } from './alert.service';
import { UserService } from './user.service';


@Injectable()
export class InventoryService {

  inventory: any = [];
  inventoryToEdit: any = {};
  manufacturers: any = [];
  inventoryPermalinks: any = [];
  constructor(
    private serverService: ServerService,
    private companyService: CompanyService,
    private alertService: AlertService,
    private userService: UserService
  ) {
    // this.getManufacturers();
  }

  getManufacturers() {
    this.manufacturers =  [];
    this.serverService.getManufacturers(this.companyService.company.id)
    .subscribe(
      (response) => {
        // console.log(response);
        if(!response) {
          this.alertService.addAlert({alertClass: 'danger',text: 'ERROR response',comment: 'in get manufacturers',});
          this.getManufacturers();
        } else {
          this.manufacturers = response;
        }
      },
      (error) => {
        this.getManufacturers();
        console.log("Error in getManufacturers: " + error);
        this.alertService.addAlert({alertClass: 'danger',text: 'ERROR error',comment: 'in get manufacturers',});
        return false;
      }
    );
  }


  getAllInventory(callback) {
    this.serverService.getAllInventory(this.companyService.company.id)
    .subscribe(
      (response) => {
        // console.log(response);
        this.inventory = response;
        callback();
      },
      (error) => {
        console.log("Error: " + error);
        return false;
      }
    );
  }

  getLast100Inventory(callback) {
    this.serverService.getLast100Inventory(this.companyService.company.id)
    .subscribe(
      (response) => {
        // console.log(response);
        this.inventory = response;
        callback();
      },
      (error) => {
        console.log("Error: " + error);
        return false;
      }
    );
  }

  getInventory(invenventoryId, callback) {
    // this.inventoryToEdit = [];
    if (!this.manufacturers.length) {
      this.getManufacturers();
    }
    this.serverService.getInventory(this.companyService.company.id, invenventoryId)
    .subscribe(
      (response) => {
        // console.log(response);
        this.inventoryToEdit = response[0];
        this.inventoryToEdit.images = {
          loading: true,
          data: []
        };

        this.inventoryToEdit.image = {loading: false};
        this.inventoryToEdit.description = {text: this.inventoryToEdit.description};
        this.inventoryToEdit.comment = {text: this.inventoryToEdit.comment};
        this.inventoryToEdit.weight = {text: this.inventoryToEdit.weight};
        this.inventoryToEdit.url = {text: this.inventoryToEdit.url};
        this.inventoryToEdit.numbers=[];
        this.inventoryToEdit.loadingNumbers = true;
        // this.inventoryToEdit.numbers = [{id:2,number: '12123',manufcaturer:'Caterpillar',manufacturerId:1},{id:1,number: '222',manufacturer:'Cummins',manufacturerId:2,main:1}];
        this.getInventoryNumbers(invenventoryId,(res)=>{
          this.inventoryToEdit.numbers = res;
          this.inventoryToEdit.loadingNumbers = false;
          callback(this.inventoryToEdit);
        });
        this.getInventoryImages(invenventoryId,(res)=>{
          if(!res.error) {
            console.log(res);
            // this.inventoryToEdit.image.data = res.image;
            this.inventoryToEdit.images.data = res;
            this.inventoryToEdit.images.loading = false;
          }
        });
      },
      (error) => {
        console.log("Error: " + error);
        return false;
      }
    );
  }

  getInventoryNumbers(invenventoryId, callback) {
    this.serverService.getInventoryNumbers(this.companyService.company.id, invenventoryId)
    .subscribe(
      (response) => {
        // console.log(response);
        callback(response);
      },
      (error) => {
        console.log("Error: " + error);
        return false;
      }
    );
  }


  getInventoryImage(invenventoryId, callback) {
    this.serverService.getInventoryImage(this.companyService.company.id, invenventoryId)
    .subscribe(
      (response) => {
        // console.log(response);
        callback(response);
      },
      (error) => {
        console.log("Error: " + error);
        return false;
      }
    );
  }

  getInventoryImages(invenventoryId, callback) {
    this.serverService.getInventoryImages(this.companyService.company.id, invenventoryId)
    .subscribe(
      (response) => {
        // console.log(response);
        callback(response);
      },
      (error) => {
        console.log("Error: " + error);
        return false;
      }
    );
  }

  saveInventoryImage(image, invenventoryId, callback) {
    this.serverService.saveInventoryImage(this.companyService.company.id, image, invenventoryId)
    .subscribe(
      (response) => {
        // console.log(response);
        callback(response);
      },
      (error) => {
        console.log("Error: ", error);
        return false;
      }
    );
  }

  deleteInventoryImage(imageId, partId, callback) {
    this.serverService.deleteInventoryImage(this.companyService.company.id, partId, imageId)
    .subscribe(
      (response) => {
        // console.log(response);
        callback(response);
      },
      (error) => {
        console.log("Error: ", error);
        return false;
      }
    );
  }

  updateInventoryMainImage(imageId, partId, callback) {
    this.serverService.updateInventoryMainImage(this.companyService.company.id, partId, imageId)
    .subscribe(
      (response) => {
        // console.log(response);
        callback(response);
      },
      (error) => {
        console.log("Error: ", error);
        return false;
      }
    );
  }

  updateImage(image, partId, callback) {
    this.serverService.updateImage(this.companyService.company.id, image, partId)
    .subscribe(
      (response) => {
        callback(response);
      },
      (error) => {
        console.log("Error: " + error);
        return false;
      }
    );
  }

  searchInventory(search, callback) {
    this.serverService.searchInventory(this.companyService.company.id, search)
    .subscribe(
      (response) => {
        // this.inventory = response;
        callback(response);
      },
      (error) => {
        console.log("Error: " + error);
        return false;
      }
    );
  }

  updateInventoryNumber(invenventoryNumberId, newNumber, newManufacturer, callback) {
    this.serverService.updateInventoryNumber(this.companyService.company.id, invenventoryNumberId, newNumber, newManufacturer)
    .subscribe(
      (response) => {
        // console.log(response);

        callback(response[0]);
      },
      (error) => {
        console.log("Error: " + error);
        return false;
      }
    );
  }

  updateInventoryMainNumber(invenventoryNumberId, inventoryId, callback) {
    this.serverService.updateInventoryMainNumber(this.companyService.company.id, invenventoryNumberId, inventoryId)
    .subscribe(
      (response) => {
        callback(response[0].main);
      },
      (error) => {
        console.log("Error: " + error);
        return false;
      }
    );
  }

  saveInventoryNewNumber(invenventoryId, newNumber, newManufacturer, callback) {
    this.serverService.saveInventoryNewNumber(this.companyService.company.id, invenventoryId, newNumber, newManufacturer)
    .subscribe(
      (response) => {
        callback(response);
      },
      (error) => {
        console.log("Error: " + error);
        return false;
      }
    );
  }

  deleteInventoryNumber(numberId, callback) {
    this.serverService.deleteInventoryNumber(this.companyService.company.id, numberId)
    .subscribe(
      (response) => {
        callback(response);
      },
      (error) => {
        console.log("Error: " + error);
        return false;
      }
    );
  }

  updateInventoryDescription(invenventoryId, newDescription, callback) {
    this.serverService.updateInventoryDescription(this.companyService.company.id, invenventoryId, newDescription)
    .subscribe(
      (response) => {
        // console.log(response);

        callback(response[0]);
      },
      (error) => {
        console.log("Error: " + error);
        return false;
      }
    );
  }

  updateInventoryComment(invenventoryId, newComment, callback) {
    this.serverService.updateInventoryComment(this.companyService.company.id, invenventoryId, newComment)
    .subscribe(
      (response) => {
        // console.log(response);

        callback(response[0]);
      },
      (error) => {
        console.log("Error: " + error);
        return false;
      }
    );
  }

  updateInventoryWeight(invenventoryId, newWeight, callback) {
    this.serverService.updateInventoryWeight(this.companyService.company.id, invenventoryId, newWeight)
    .subscribe(
      (response) => {
        // console.log(response);

        callback(response[0]);
      },
      (error) => {
        console.log("Error: " + error);
        return false;
      }
    );
  }

  updateInventoryUrl(invenventoryId, newUrl, callback) {
    this.serverService.updateInventoryUrl(this.companyService.company.id, invenventoryId, newUrl)
    .subscribe(
      (response) => {
        // console.log(response);

        callback(response[0]);
      },
      (error) => {
        console.log("Error: " + error);
        return false;
      }
    );
  }

  updateManufacturer(id, name, fullName, callback){
    this.serverService.updateManufacturer(this.companyService.company.id, id, name, fullName)
    .subscribe(
      (response) => {
        // console.log(response);

        callback(response[0]);
      },
      (error) => {
        console.log("Error: " + error);
        return false;
      }
    );
  }

  deleteManufacturer(id, callback) {
    this.serverService.deleteManufacturer(this.companyService.company.id, id)
    .subscribe(
      (response) => {
        callback(response);
      },
      (error) => {
        console.log("Error: " + error);
        this.alertService.addAlert({alertClass: 'danger',text: 'ERROR',comment: '',});
        return false;
      }
    );
  }

  addManufacturer(name, fullName, callback) {
    this.serverService.addManufacturer(this.companyService.company.id, name, fullName)
    .subscribe(
      (response) => {
        callback(response);
      },
      (error) => {
        console.log("Error: " + error);
        return false;
      }
    );
  }

  getAllAnalogs(callback) {
    this.serverService.tempFunc()
    .subscribe(
      (response) => {
        console.log(response);
        callback(response);
      },
      (error) => {
        console.log("Error: " + error);
        return false;
      }
    );
  }

  createXLPrice(callback) {
    this.serverService.createXLPrice()
    .subscribe(
      (response) => {
        // console.log(response);
        callback(response);
        this.alertService.addAlert({alertClass: 'success',text: 'Прайс обновлен', comment: ''});
      },
      (error) => {
        console.log("Error: " + error);
        return false;
      }
    );
  }

  getPriceListUpdateDate(callback) {
    this.serverService.getPriceListUpdateDate()
    .subscribe(
      (response) => {
        // console.log(response);
        callback(response);
        // this.alertService.addAlert({alertClass: 'success',text: 'Прайс обновляется', comment: ''});
      },
      (error) => {
        console.log("Error: " + error);
        return false;
      }
    );
  }

  getRecommendedUrlForItem(description, callback) {
    this.serverService.getRecommendedUrlForItem(this.companyService.company.id, description)
    .subscribe(
      (response) => {
        // console.log(response);
        callback(response);
        // this.alertService.addAlert({alertClass: 'success',text: 'Прайс обновляется', comment: ''});
      },
      (error) => {
        console.log("Error: " + error);
        return false;
      }
    );
  }

  getInventoryForPermalinks(callback) {
    this.serverService.getInventoryForPermalinks(this.companyService.company.id)
    .subscribe(
      (response) => {
        // console.log(response);
        this.inventoryPermalinks = response;
        callback();
      },
      (error) => {
        console.log("Error: " + error);
        return false;
      }
    );
  }

  createSiteMap(callback) {
    this.serverService.createSiteMap()
    .subscribe(
      (response) => {
        // console.log(response);
        callback(response);
        this.alertService.addAlert({alertClass: 'success',text: 'SiteMap обновлен', comment: ''});
      },
      (error) => {
        console.log("Error: " + error);
        return false;
      }
    );
  }

  getSiteMapUpdateDate(callback) {
    this.serverService.getSiteMapUpdateDate()
    .subscribe(
      (response) => {
        // console.log(response);
        callback(response);
        // this.alertService.addAlert({alertClass: 'success',text: 'Прайс обновляется', comment: ''});
      },
      (error) => {
        console.log("Error: " + error);
        return false;
      }
    );
  }



}
