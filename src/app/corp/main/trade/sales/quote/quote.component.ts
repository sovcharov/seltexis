import { Component, OnInit } from '@angular/core';
import { InventoryService } from '../../../../../services/inventory.service';
import { AlertService, Alert } from '../../../../../services/alert.service';

interface search {
  searchPhrase: string,
  searchResults: any[]
}

@Component({
  selector: 'app-quote',
  templateUrl: './quote.component.html',
  styleUrls: ['./quote.component.css']
})

export class QuoteComponent implements OnInit {

  public boldText: string = "1234 2345";
  public arrayToQuote: search[] = [];
  public loading: boolean = false;
  public discount: number = 5;
  public quoted: boolean = false;
  public finalPlainText: string = "";
  constructor(
    private inventoryService: InventoryService,
    private alertService: AlertService
  ) { }

  ngOnInit(): void {
  }

  public checkBoldText() {
    let result = this.boldText.replace(/[\n,\s,\;\/\:]+/g, ",").split(",");
    // console.log(result); 
    if (result[result.length-1] === "") {
      result.pop();
    }
    if (result[0] === "") {
      result.splice(0,1);
    }
    for (let i = 0; i < result.length; i += 1) {
      this.arrayToQuote[i] = {
        searchPhrase: result[i],
        searchResults: []
      }
    }
    // this.arrayToQuote = result;
  }

  public sendToQuote() {
    console.log(this.arrayToQuote); 
    this.loading = true;

    for (let i = 0; i < this.arrayToQuote.length; i += 1) {
      this.inventoryService.searchInventory(this.arrayToQuote[i].searchPhrase, (res) => {
        this.arrayToQuote[i].searchResults = res;
        this.setDescriptionToFinal (this.arrayToQuote[i].searchResults);

      });
    }
    this.quoted = true;
  }

  public setDescriptionToFinalForAll () {
    for (let i = 0; i < this.arrayToQuote.length; i += 1) {
      this.setDescriptionToFinal (this.arrayToQuote[i].searchResults);
    }
  }

  private setDescriptionToFinal (searchResults) {
    for (let j = 0; j < searchResults.length; j += 1) {
      searchResults[j].descriptionToFinal = `${searchResults[j].description} ${searchResults[j].numbers}`;
      searchResults[j].descriptionToFinal = searchResults[j].descriptionToFinal.replace(/[\t,\r,\n,\f,\s]+/g," ");
      searchResults[j].descriptionToFinal += `- ${Math.ceil(searchResults[j].price * ((100 -this.discount)/100))}р. Нал: Мск: ${searchResults[j].msk} СПб: ${searchResults[j].stock} Едет: ${searchResults[j].ordered}`
      // console.log(res);
    }
  }

  public deleteNumber(i) {
    this.arrayToQuote.splice(i,1); 
  }
  public clearForm() {
    this.boldText = "";
  }
  public startOver() {
    this.arrayToQuote = [];
    this.quoted = false;
  }

  public getSearchResultsLength (i) {
    return this.arrayToQuote[i].searchResults.length;
  }

  public createPlainText () {
    let result: string = '';
    for(let i = 0; i < this.arrayToQuote.length; i += 1) {
      for (let j = 0; j < this.arrayToQuote[i].searchResults.length; j += 1) {
        if(this.arrayToQuote[i].searchResults[j].toTheFinalList) {
          result = result.length ? `${result}\n${this.arrayToQuote[i].searchResults[j].descriptionToFinal}` : `${this.arrayToQuote[i].searchResults[j].descriptionToFinal}`;
        }
      }
    }
    this.finalPlainText = result;
  }

}