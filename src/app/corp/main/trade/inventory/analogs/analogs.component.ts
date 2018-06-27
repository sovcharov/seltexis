import { Component, OnInit } from '@angular/core';
import { InventoryService } from '../../../../../services/inventory.service';

@Component({
  selector: 'app-analogs',
  templateUrl: './analogs.component.html',
  styleUrls: ['./analogs.component.css']
})
export class AnalogsComponent implements OnInit {

  constructor(
    public inventoryService: InventoryService
  ) { }

  ngOnInit() {
  }

   public inventoryToSearch() {

   }

   public searchAnalogs () {

   }

   public getAllAnalogs () {
     console.log("getting");

     this.inventoryService.getAllAnalogs((data)=>{
       console.log(data);
     });
   }
}
