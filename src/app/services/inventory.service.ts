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
  constructor(
    private serverService: ServerService,
    private companyService: CompanyService,
    private alertService: AlertService,
    private userService: UserService
  ) {
    this.getManufacturers();
  }

  getManufacturers() {
    this.serverService.getManufacturers(this.companyService.company.id)
      .subscribe(
      (response) => {
        // console.log(response);
        this.manufacturers = response;
      },
      (error) => {
        console.log("Error: " + error);
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

  getInventory(invenventoryId, callback) {
    this.serverService.getInventory(this.companyService.company.id, invenventoryId)
      .subscribe(
      (response) => {
        // console.log(response);
        this.inventoryToEdit = response[0];
        this.inventoryToEdit.description = {text: this.inventoryToEdit.description};
        this.inventoryToEdit.numbers=[];
        // this.inventoryToEdit.numbers = [{id:2,number: '12123',manufcaturer:'Caterpillar',manufacturerId:1},{id:1,number: '222',manufacturer:'Cummins',manufacturerId:2,main:1}];
        this.getInventoryNumbers(invenventoryId,(res)=>{
          this.inventoryToEdit.numbers = res;

          callback(this.inventoryToEdit);
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
        this.alertService.addAlert({alertClass: 'success',text: 'Deleted',comment: '',});
      },
      (error) => {
        console.log("Error: " + error);
        this.alertService.addAlert({alertClass: 'danger',text: 'ERROR',comment: '',});
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

}
