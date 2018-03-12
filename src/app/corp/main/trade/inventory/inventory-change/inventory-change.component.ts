import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CompanyService } from '../../../../../services/company.service';
import { InventoryService } from '../../../../../services/inventory.service';

@Component({
  selector: 'app-inventory-change',
  templateUrl: './inventory-change.component.html',
  styleUrls: ['./inventory-change.component.css']
})
export class InventoryChangeComponent implements OnInit {

  id: number;
  loading: boolean;
  newNumber: string;
  changingMain: boolean;
  numberToAdd = {
    number: '',
    manufacturerId: 1,
    editing: false,
    saving: false
  };
  // inventoryToEdit: any;

  constructor(
    private inventoryService: InventoryService,
    private companyService: CompanyService,
    private route: ActivatedRoute
  ) { }

  ngOnInit() {
    // this.inventoryService.inventoryToEdit.id = this.inventoryService.inventoryToEdit.id;
    // this.getInventory();
  }

  getInventory(): void {
    this.loading = true;
    this.inventoryService.getInventory(this.inventoryService.inventoryToEdit.id, () => {
      this.loading = false;
    });
  }

  editNumberBegin(index): void {
    this.inventoryService.inventoryToEdit.numbers[index].editing=true;
    this.inventoryService.inventoryToEdit.numbers[index].tempNumber = this.inventoryService.inventoryToEdit.numbers[index].number;
    this.inventoryService.inventoryToEdit.numbers[index].tempManufacturerId = this.inventoryService.inventoryToEdit.numbers[index].manufacturerId;
  }

  editNumberSave(index): void {

      // console.log(this.inventoryService.inventoryToEdit.numbers[index].number);
      this.inventoryService.inventoryToEdit.numbers[index].editing=false;
      this.inventoryService.inventoryToEdit.numbers[index].saving = true;
      this.inventoryService.updateInventoryNumber(this.inventoryService.inventoryToEdit.numbers[index].id, this.inventoryService.inventoryToEdit.numbers[index].number,
        this.inventoryService.inventoryToEdit.numbers[index].manufacturerId, (res) => {
        this.inventoryService.inventoryToEdit.numbers[index].saving = false;
        this.inventoryService.inventoryToEdit.numbers[index] = res;
      });

  }

  editNumberCancel(index): void {
    this.inventoryService.inventoryToEdit.numbers[index].editing=false;
      // console.log(this.inventoryService.inventoryToEdit.numbers[index].number);
    this.inventoryService.inventoryToEdit.numbers[index].number = this.inventoryService.inventoryToEdit.numbers[index].tempNumber;
    this.inventoryService.inventoryToEdit.numbers[index].manufacturerId = this.inventoryService.inventoryToEdit.numbers[index].tempManufacturerId;
  }

  getMainNumber (): string {
    let i: number = 0;
    for (i = 0; i < this.inventoryService.inventoryToEdit.numbers.length; i += 1) {
      if(this.inventoryService.inventoryToEdit.numbers[i].main) {
        return this.inventoryService.inventoryToEdit.numbers[i].number;
      }
    }
    return '';
  }

  getMainManufacturer (): string {
    for (let i: number = 0; i < this.inventoryService.inventoryToEdit.numbers.length; i += 1) {
      if(this.inventoryService.inventoryToEdit.numbers[i].main) {
        return this.inventoryService.inventoryToEdit.numbers[i].manufacturerFullName;
      }
    }
    return '';
  }

  changeMainBegin(index){
    this.inventoryService.inventoryToEdit.numbers[index].changeMain=true;
  }

  changeMainSave(index){
    this.inventoryService.inventoryToEdit.numbers[index].saving = true;
    this.changingMain = true;
    this.inventoryService.updateInventoryMainNumber(this.inventoryService.inventoryToEdit.numbers[index].id, this.inventoryService.inventoryToEdit.id, (res) => {
      // console.log(res);
      this.inventoryService.inventoryToEdit.numbers[index].changeMain = false;
      for (let i = 0; i < this.inventoryService.inventoryToEdit.numbers.length; i+=1){
        if(this.inventoryService.inventoryToEdit.numbers[i].main) {
          this.inventoryService.inventoryToEdit.numbers[i].main = 0;
        }

      }
      this.inventoryService.inventoryToEdit.numbers[index].saving = false;
      this.changingMain = false;
      this.inventoryService.inventoryToEdit.numbers[index].main = 1;
    });
  }

  changeMainCancel(index){
    this.inventoryService.inventoryToEdit.numbers[index].changeMain=false;
  }

  addNumberBegin () {
    // console.log(this.numberToAdd);
    this.numberToAdd.editing = true;
  }

  addNumberSave () {
    this.numberToAdd.saving = true;
    this.inventoryService.saveInventoryNewNumber(this.inventoryService.inventoryToEdit.id, this.numberToAdd.number, this.numberToAdd.manufacturerId, (res) => {
      // console.log(res);
      this.inventoryService.inventoryToEdit.numbers[this.inventoryService.inventoryToEdit.numbers.length] = res[0];
      this.numberToAdd.number = '';
      this.numberToAdd.editing = false;
      this.numberToAdd.saving = false;

    });


  }

  addNumberCancel () {
    // console.log(this.numberToAdd);
    this.numberToAdd.editing = false;
    this.numberToAdd.number = '';

  }

  deleteNumberBegin (index) {
    // console.log(this.inventoryService.inventoryToEdit.numbers[index]);
    this.inventoryService.inventoryToEdit.numbers[index].deleting = true;
  }

  deleteNumberSave (index) {
    this.inventoryService.inventoryToEdit.numbers[index].saving = true;
    this.inventoryService.deleteInventoryNumber(this.inventoryService.inventoryToEdit.numbers[index].id, (res) => {
      // console.log(res);
      this.inventoryService.inventoryToEdit.numbers.splice(index,1);
    });
  }

  deleteNumberCancel (index) {
    // console.log(this.inventoryService.inventoryToEdit.numbers[index]);
    this.inventoryService.inventoryToEdit.numbers[index].deleting = false;
  }

  getManufacturer(number): string {
    for(let i = 0; i < this.inventoryService.manufacturers.length; i+=1) {
      if (this.inventoryService.manufacturers[i].id = number.manufacturerId) {
        return this.inventoryService.manufacturers[i].fullName;
      }
    }
    return '';
  }
  changeSelect(x){
    console.log(x);
  }

  editDescriptionBegin(){
    this.inventoryService.inventoryToEdit.description.editing=true;
    this.inventoryService.inventoryToEdit.description.tempText = this.inventoryService.inventoryToEdit.description.text;
  }

  editDescriptionSave(){
    this.inventoryService.inventoryToEdit.description.saving = true;
    this.inventoryService.inventoryToEdit.description.editing=false;
    this.inventoryService.updateInventoryDescription(this.inventoryService.inventoryToEdit.id, this.inventoryService.inventoryToEdit.description.text, (res) => {
      this.inventoryService.inventoryToEdit.description = res;
    });
  }

  editDescriptionCancel(){
    this.inventoryService.inventoryToEdit.description.editing=false;
    this.inventoryService.inventoryToEdit.description.text = this.inventoryService.inventoryToEdit.description.tempText;
  }

}
