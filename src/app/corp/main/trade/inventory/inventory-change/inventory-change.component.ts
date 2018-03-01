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

  constructor(
    private inventoryService: InventoryService,
    private companyService: CompanyService,
    private route: ActivatedRoute
  ) { }

  ngOnInit() {
    this.route.params.subscribe(params => {
      this.loading = true;
      this.id = params['id'];
      this.inventoryService.getInventory(this.id, () => {
        this.loading = false;
      });
    });
  }

  getInventory(): void {
    this.loading = true;
    this.inventoryService.getInventory(this.id, () => {
      this.loading = false;
    });
    // console.log(this.inventoryService.inventory);
  }

  editBegin(index): void {
    this.inventoryService.inventoryToEdit.numbers[index].editing=true;
    this.inventoryService.inventoryToEdit.numbers[index].tempNumber = this.inventoryService.inventoryToEdit.numbers[index].number;
  }

  editSave(index): void {

      console.log(this.inventoryService.inventoryToEdit.numbers[index].number);
      this.inventoryService.inventoryToEdit.numbers[index].editing=false;
      this.inventoryService.inventoryToEdit.numbers[index].saving = true;
      this.inventoryService.updateInventoryNumber(this.inventoryService.inventoryToEdit.numbers[index].id, this.inventoryService.inventoryToEdit.numbers[index].number,
        this.inventoryService.inventoryToEdit.numbers[index].manufacturerId, (res) => {
        this.inventoryService.inventoryToEdit.numbers[index].saving = false;
        this.inventoryService.inventoryToEdit.numbers[index].number = res;
      });

  }

  editCancel(index): void {
    this.inventoryService.inventoryToEdit.numbers[index].editing=false;
      console.log(this.inventoryService.inventoryToEdit.numbers[index].number);
    this.inventoryService.inventoryToEdit.numbers[index].number = this.inventoryService.inventoryToEdit.numbers[index].tempNumber;
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

}
