// import { Observable } from 'rxjs/Observable';
import { Injectable } from '@angular/core';

import { ServerService } from './server.service';
import { CompanyService } from './company.service';
import { AlertService, Alert } from './alert.service';
import { UserService } from './user.service';


@Injectable()
export class InventoryService {

  inventory: any = [];
  inventoryToEdit: any;
  constructor(
    private serverService: ServerService,
    private companyService: CompanyService,
    private alertService: AlertService,
    private userService: UserService
  ) { }


  getAllInventory(callback) {
    this.serverService.getAllInventory(this.companyService.company.id)
      .subscribe(
      (response) => {
        console.log(response);
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
        this.inventoryToEdit.numbers=[];
        // this.inventoryToEdit.numbers = [{id:2,number: '12123',manufcaturer:'Caterpillar',manufacturerId:1},{id:1,number: '222',manufacturer:'Cummins',manufacturerId:2,main:1}];
        this.getInventoryNumbers(invenventoryId,(res)=>{
          this.inventoryToEdit.numbers = res;
        });
        callback();
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

        callback(response[0].number);
      },
      (error) => {
        console.log("Error: " + error);
        return false;
      }
      );
  }

  saveInventoryNewNumber(invenventoryId, newNumber, callback) {
    this.serverService.saveInventoryNewNumber(this.companyService.company.id, invenventoryId, newNumber)
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

}
