import { Component, OnInit } from '@angular/core';
import { InventoryService } from '../../../../../services/inventory.service';
import { AlertService, Alert } from '../../../../../services/alert.service';
import { LoadAnimationService } from '../../../../../services/load-animation.service';


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
  public listVars = {
    includeSearchNumber: false,
    includeDescription: true,
    includeNumber: true,
    includeManufacturer: true,
    includeSpb: true,
    includeMsk: true,
    includeOrdered: false
  };
  public includeDescription= true;
  constructor(
    private inventoryService: InventoryService,
    private alertService: AlertService,
    private loadAnimationService: LoadAnimationService
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
    // console.log(this.arrayToQuote); 
    this.loading = true;
    this.loadAnimationService.loading = true;
    let countTotal = 0;
    let countDone = 0;

    for (let i = 0; i < this.arrayToQuote.length; i += 1) {
      this.inventoryService.searchInventory(this.arrayToQuote[i].searchPhrase, (res) => {
        this.arrayToQuote[i].searchResults = res;
        // console.log(res);
        for (let j = 0; j < this.arrayToQuote[i].searchResults.length; j += 1) {
          countTotal += 1;
          this.inventoryService.getInventoryNumbers(this.arrayToQuote[i].searchResults[j].id, (res2) => {
            this.arrayToQuote[i].searchResults[j].allNumbers = res2;
            // console.log(res2);
            this.setDescriptionToFinalSingleItem (this.arrayToQuote[i].searchResults[j], this.arrayToQuote[i].searchPhrase);
            countDone += 1;
            // console.log(countDone,"-",countTotal);
            if (countTotal === countDone) {
              this.loadAnimationService.loading = false;
            }
          });
        }

        // this.setDescriptionToFinal (this.arrayToQuote[i].searchResults);

      });
    }
    this.quoted = true;
  }

  public setDescriptionToFinalForAll () {
    for (let i = 0; i < this.arrayToQuote.length; i += 1) {
      this.setDescriptionToFinal (this.arrayToQuote[i].searchResults, this.arrayToQuote[i].searchPhrase);
    }
  }

  private setDescriptionToFinal (searchResults, searchPhrase) {
    for (let j = 0; j < searchResults.length; j += 1) {
      this.setDescriptionToFinalSingleItem (searchResults[j], searchPhrase);
    }
  }

  private setDescriptionToFinalSingleItem (searchResult, searchPhrase) {
      let availability: string = "";
      searchResult.descriptionToFinal = "";
      if (this.listVars.includeMsk) {
        if(searchResult.msk > 20) {
          availability += `Мск: Много `;
        } else {
          availability += `Мск: ${searchResult.msk} `;
        }
      }
      if (this.listVars.includeSpb) {
        if(searchResult.stock > 20) {
          availability += `СПб: Много `;
        } else {
          availability += `СПб: ${searchResult.stock} `;
        }
      }
      if (this.listVars.includeOrdered) {
        if(searchResult.ordered > 20) {
          availability += `Едет: Много `;
        } else {
          availability += `Едет: ${searchResult.ordered} `;
        }
      }
      if (availability.length) {
        availability = `Нал: ${availability}`;
      }
      if (this.listVars.includeSearchNumber) {
        searchResult.descriptionToFinal += `${searchPhrase} `;
      }
      if (this.listVars.includeDescription) {
        searchResult.descriptionToFinal += `${searchResult.description} `;
      }
      if (this.listVars.includeNumber) {
        searchResult.descriptionToFinal += `${searchResult.allNumbers[0].number} `;
      }
      if (this.listVars.includeManufacturer) {
        searchResult.descriptionToFinal += `(Произв:${searchResult.allNumbers[0].manufacturer}) `;
      }
      searchResult.descriptionToFinal = searchResult.descriptionToFinal.replace(/[\t,\r,\n,\f,\s]+/g," ");
      searchResult.descriptionToFinal += `- ${Math.ceil(searchResult.price * ((100 -this.discount)/100))} р. ${availability}`;
  }



  public deleteNumber(i) {
    this.arrayToQuote.splice(i,1); 
  }
  public clearForm() {
    this.boldText = "";
    this.finalPlainText = "";
  }
  public startOver() {
    this.arrayToQuote = [];
    this.quoted = false;
    this.finalPlainText = "";
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
    if (result.length) {
      result = `${result}\nЦена включает скидку ${this.discount}%`
    }
    this.finalPlainText = result;
  }

}