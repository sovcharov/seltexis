import { Component, OnInit } from '@angular/core';
import { InventoryService } from '../../../../../services/inventory.service';
import { AlertService, Alert } from '../../../../../services/alert.service';
import { MyCookieService } from '../../../../../services/my-cookie.service';
import { LoadAnimationService } from '../../../../../services/load-animation.service';

interface search {
  searchPhrase: string,
  qty: number,
  searchResults: any[]
}

@Component({
  selector: 'app-quote',
  templateUrl: './quote.component.html',
  styleUrls: ['./quote.component.css']
})

export class QuoteComponent implements OnInit {

  // public boldText: string = "";
  public boldText: string = `1979330 2
1979322 3
jkljl88878`;
  public arrayToQuote: search[] = [];
  public loading: boolean = false;
  public discount: number = 5;
  public quoted: boolean = false;
  public finalPlainText: string = "";
  public listVars: any;
  public includeDescription= true;
  constructor(
    private inventoryService: InventoryService,
    private alertService: AlertService,
    private loadAnimationService: LoadAnimationService,
    private MyCookieService: MyCookieService

    
  ) { }

  ngOnInit(): void {
    this.listVars = this.MyCookieService.getUserQuoteVars();
    if(!this.listVars) {
      this.listVars = {
        includeSearchNumber: false,
        includeSearchQty: true,
        includeDescription: true,
        includeComment: true,
        includeNumber: false,
        includeManufacturer: false,
        includeMsk: true,
        includeSpb: true,
        includeOrdered: false,
        discount: 5,
        showDiscount: true,
        showNotQuoted: true,
        showAsTable: true
      };
    }
  }

  public checkBoldText() {
    let result: any = this.boldText.replace(/[\n,\;,\/,\:]+/g, ",").split(",");
    if (result[result.length-1] === "") {
      result.pop();
    }
    if (result[0] === "") {
      result.splice(0,1);
    }
    for (let i = 0; i < result.length; i += 1) {
      result[i] = result[i].replace(/^\s+/g, "").replace(/\s+/g, ",").split(",");
    }
    for (let i = 0; i < result.length; i += 1) {
      this.arrayToQuote[i] = {
        searchPhrase: result[i][0],
        qty: result[i][1] || 1,
        searchResults: []
      }
    }

  }

  public sendToQuote() {
    // console.log(this.arrayToQuote); 
    this.loading = true;
    this.loadAnimationService.loading = true;
    let countTotal = 0;
    let countDone = 0;

    for (let i = 0; i < this.arrayToQuote.length; i += 1) {
      this.inventoryService.searchInventoryForQuote(this.arrayToQuote[i].searchPhrase, (res) => {
        this.arrayToQuote[i].searchResults = res;
        console.log(res);
        for (let j = 0; j < this.arrayToQuote[i].searchResults.length; j += 1) {
          countTotal += 1;
          this.inventoryService.getInventoryNumbers(this.arrayToQuote[i].searchResults[j].id, (res2) => {
            this.arrayToQuote[i].searchResults[j].allNumbers = res2;
            for (let k = 0; k < res2.length; k += 1) {
              if (k === 0) {
                this.arrayToQuote[i].searchResults[j].allNumbersText = `${res2[k].number}`;
              }
              this.arrayToQuote[i].searchResults[j].allNumbersText +=  ` ${res2[k].number}`
            }
            // console.log(res2);
            this.setDescriptionToFinalSingleItem (this.arrayToQuote[i].searchResults[j], this.arrayToQuote[i].searchPhrase, this.arrayToQuote[i].qty);
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
      this.setDescriptionToFinal (this.arrayToQuote[i].searchResults, this.arrayToQuote[i].searchPhrase, this.arrayToQuote[i].qty);
    }
  }

  private setDescriptionToFinal (searchResults, searchPhrase, qty) {
    for (let j = 0; j < searchResults.length; j += 1) {
      this.setDescriptionToFinalSingleItem (searchResults[j], searchPhrase, qty);
    }
  }

  private setDescriptionToFinalSingleItem (searchResult, searchPhrase, qty) {
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
        availability = `Склад: ${availability}`;
      }
      if (this.listVars.includeSearchNumber || this.listVars.includeSearchQty) {
        searchResult.descriptionToFinal += `(`;
        if (this.listVars.includeSearchNumber) {
          searchResult.descriptionToFinal += `${searchPhrase}`;
        }
        if (this.listVars.includeSearchQty) {
          if (this.listVars.includeSearchNumber) {
           searchResult.descriptionToFinal += ` `;
          }
          searchResult.descriptionToFinal += `${qty}шт`;
        }
        searchResult.descriptionToFinal += `) `;
      }
      if (this.listVars.includeDescription) {
        searchResult.descriptionToFinal += `${searchResult.iDescription} `;
      }
      if (this.listVars.includeComment) {
        searchResult.descriptionToFinal += `${searchResult.iComment} `;
      }
      if (this.listVars.includeNumber) {
        searchResult.descriptionToFinal += `${searchResult.allNumbers[0].number} `;
      }
      // if (this.listVars.includeSearchQty) {
      //   searchResult.descriptionToFinal += `(${qty}шт) `;
      // }
      if (this.listVars.includeManufacturer) {
        searchResult.descriptionToFinal += `(Брэнд:${searchResult.allNumbers[0].manufacturer}) `;
      }
      searchResult.descriptionToFinal = searchResult.descriptionToFinal.replace(/[\t,\r,\n,\f,\s]+/g," ");
      searchResult.descriptionToFinal += `- ${Math.ceil(searchResult.price * ((100 -this.listVars.discount)/100))} р. ${availability}`;
  }

  public getPriceWithDiscount (price) {
    return Math.ceil(price * ((100 -this.listVars.discount)/100))
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
    console.log(this.arrayToQuote);
    let result: string = '';
    for(let i = 0; i < this.arrayToQuote.length; i += 1) {
      if(!this.arrayToQuote[i].searchResults.length && this.listVars.showNotQuoted) {
        result = result.length ? `${result}\n${this.arrayToQuote[i].searchPhrase} - нет` : `${this.arrayToQuote[i].searchPhrase} - нет`;
      }
      for (let j = 0; j < this.arrayToQuote[i].searchResults.length; j += 1) {
        if(this.arrayToQuote[i].searchResults[j].toTheFinalList) {
          result = result.length ? `${result}\n${this.arrayToQuote[i].searchResults[j].descriptionToFinal}` : `${this.arrayToQuote[i].searchResults[j].descriptionToFinal}`;
        }
      }
    }
    if (result.length && this.listVars.showDiscount) {
      result = `${result}\nЦена включает скидку ${this.listVars.discount}%`
    }
    this.finalPlainText = result;
  }

  public saveQuoteVars () {
    this.MyCookieService.putUserQuoteVars(this.listVars);
    let alert: Alert = {
      alertClass: "success",
      text: "Настройки сохранены",
      comment: ''
    }
    this.alertService.addAlert(alert);
  }

  public copyToClipboard () {
    /* Get the text field */
    let copyText: any = document.getElementById("finalPlainTextArea");

    /* Select the text field */
    copyText.select();
    copyText.setSelectionRange(0, 99999); /* For mobile devices */

    /* Copy the text inside the text field */
    document.execCommand("copy");

    /* Alert the copied text */
    let alert: Alert = {
      alertClass: "success",
      text: "Скопировано",
      comment: 'в буфер обмена'
    }
    this.alertService.addAlert(alert);
    // alert("Copied the text: " + copyText.value);
  }

}