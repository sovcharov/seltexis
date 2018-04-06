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
        console.log(response);
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
    // this.inventoryToEdit = [];
    this.serverService.getInventory(this.companyService.company.id, invenventoryId)
    .subscribe(
      (response) => {
        // console.log(response);
        this.inventoryToEdit = response[0];
        this.inventoryToEdit.image = {loading:true};
        this.inventoryToEdit.description = {text: this.inventoryToEdit.description};
        this.inventoryToEdit.comment = {text: this.inventoryToEdit.comment};
        this.inventoryToEdit.weight = {text: this.inventoryToEdit.weight};
        this.inventoryToEdit.numbers=[];
        this.inventoryToEdit.loadingNumbers = true;
        // this.inventoryToEdit.numbers = [{id:2,number: '12123',manufcaturer:'Caterpillar',manufacturerId:1},{id:1,number: '222',manufacturer:'Cummins',manufacturerId:2,main:1}];
        this.getInventoryNumbers(invenventoryId,(res)=>{
          this.inventoryToEdit.numbers = res;
          this.inventoryToEdit.loadingNumbers = false;
          callback(this.inventoryToEdit);
        });
        this.getInventoryImage(invenventoryId,(res)=>{
          if(!res.error) {
            // console.log(res);
            this.inventoryToEdit.image.data = res.image;
            this.inventoryToEdit.image.loading = false;

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

searchInventory(search, callback) {
  this.serverService.searchInventory(this.companyService.company.id, search)
  .subscribe(
    (response) => {
      this.inventory = response;
      callback();
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

}
