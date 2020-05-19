import { Component, OnInit } from '@angular/core';
// import { CompanyService } from '../../../../../services/company.service';
import { InventoryService } from '../../../../../services/inventory.service';
import { AlertService, Alert } from '../../../../../services/alert.service';
import { IconService } from '../../../../../services/icon.service';


@Component({
  selector: 'app-manufacturers',
  templateUrl: './manufacturers.component.html',
  styleUrls: ['./manufacturers.component.css']
})
export class ManufacturersComponent implements OnInit {

  manufacturerToAdd = {
    name: '',
    fullName: '',
    editing: false,
    saving: false
  };
  // i

  constructor(
    public inventoryService: InventoryService,
    private alertService: AlertService,
    public iconService: IconService
  ) { }

  ngOnInit() {
    if(!this.inventoryService.manufacturers.length) {
      this.inventoryService.getManufacturers();
    }
  }

  getManufacturers(){
    this.inventoryService.getManufacturers();
  }

  editManufacturerBegin(index) {
    this.inventoryService.manufacturers[index].editing = true;
  }

  editManufacturerSave(index) {
    this.inventoryService.manufacturers[index].saving = true;
    this.inventoryService.manufacturers[index].editing = false;
    this.inventoryService.updateManufacturer(this.inventoryService.manufacturers[index].id, this.inventoryService.manufacturers[index].name, this.inventoryService.manufacturers[index].fullName, (res) => {
      this.inventoryService.manufacturers[index].saving = true;
      console.log(res);
      this.inventoryService.manufacturers[index] = res;
    });
  }

  editManufacturerCancel(index) {
    this.inventoryService.manufacturers[index].editing = false;
  }

  deleteManufacturerBegin(index) {
    this.inventoryService.manufacturers[index].deleting = true;
  }

  deleteManufacturerSave(index) {
    this.inventoryService.manufacturers[index].deleting = false;
    this.inventoryService.manufacturers[index].saving = true;
    this.inventoryService.deleteManufacturer(this.inventoryService.manufacturers[index].id, (res) => {
      console.log(res);
      if(res[0].deleted){
        this.inventoryService.manufacturers.splice(index,1);
        this.alertService.addAlert({alertClass: 'success',text: 'Удалено успешно',comment: '',});
      } else if (res[0].canNotDelete){
        this.alertService.addAlert({alertClass: 'danger',text: 'Не удалить',comment: 'Используется',});
        this.inventoryService.manufacturers[index].saving = false;
        this.inventoryService.manufacturers[index].deleting = false;
      }
    });
  }

  deleteManufacturerCancel(index) {
    this.inventoryService.manufacturers[index].deleting = false;

  }

  addManufacturerBegin() {
    this.manufacturerToAdd.editing = true;

  }

  addManufacturerSave() {
    this.manufacturerToAdd.saving = true;
    this.inventoryService.addManufacturer(this.manufacturerToAdd.name, this.manufacturerToAdd.fullName, (res) => {
      console.log(res);
      this.inventoryService.manufacturers[this.inventoryService.manufacturers.length] = res[0];
      this.manufacturerToAdd.name = '';
      this.manufacturerToAdd.fullName = '';
      this.manufacturerToAdd.editing = false;
      this.manufacturerToAdd.saving = false;

    });


  }

  addManufacturerCancel() {
    this.manufacturerToAdd.editing = false;
    this.manufacturerToAdd.name = '';
    this.manufacturerToAdd.fullName = '';

  }


}
