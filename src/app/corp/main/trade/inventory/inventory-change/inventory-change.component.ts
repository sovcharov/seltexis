import { Component, OnInit } from '@angular/core';
// import { ActivatedRoute } from '@angular/router';
import { DomSanitizer } from '@angular/platform-browser';
import { Ng2ImgMaxService } from 'ng2-img-max';
// import { CompanyService } from '../../../../../services/company.service';
import { InventoryService } from '../../../../../services/inventory.service';
import { AlertService, Alert } from '../../../../../services/alert.service';
import heic2any from "heic2any";

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
  image: any;
  uploadedImage: File;
  imageLoading: boolean = false;
  maxSize: number = 200;
  turnCount: number = 0;

  constructor(
    public inventoryService: InventoryService,
    // private companyService: CompanyService,
    // private route: ActivatedRoute,
    public domSanitizer: DomSanitizer,
    private ng2ImgMax: Ng2ImgMaxService,
    private alertService: AlertService

  ) { }

  ngOnInit() {
    // this.inventoryService.inventoryToEdit.id = this.inventoryService.inventoryToEdit.id;
    // this.inventoryService.getInventory(1,()=>{});
  }

  getInventory() {
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


    editCommentBegin(){
      this.inventoryService.inventoryToEdit.comment.editing=true;
      this.inventoryService.inventoryToEdit.comment.tempText = this.inventoryService.inventoryToEdit.comment.text;
    }

    editCommentSave(){
      this.inventoryService.inventoryToEdit.comment.saving = true;
      this.inventoryService.inventoryToEdit.comment.editing=false;
      this.inventoryService.updateInventoryComment(this.inventoryService.inventoryToEdit.id, this.inventoryService.inventoryToEdit.comment.text, (res) => {
        this.inventoryService.inventoryToEdit.comment = res;
      });
    }

    editCommentCancel(){
      this.inventoryService.inventoryToEdit.comment.editing=false;
      this.inventoryService.inventoryToEdit.comment.text = this.inventoryService.inventoryToEdit.comment.tempText;
    }

    editWeightBegin(){
      this.inventoryService.inventoryToEdit.weight.editing=true;
      this.inventoryService.inventoryToEdit.weight.tempText = this.inventoryService.inventoryToEdit.weight.text;
    }

    editWeightSave(){
      this.inventoryService.inventoryToEdit.weight.saving = true;
      this.inventoryService.inventoryToEdit.weight.editing=false;

      this.weightCheck(this.inventoryService.inventoryToEdit.weight.text, (err) => {

        if(err) {
          this.inventoryService.inventoryToEdit.weight.saving = false;
          this.inventoryService.inventoryToEdit.weight.text = this.inventoryService.inventoryToEdit.weight.tempText;
        } else {
          let newWeight = this.getNumberFromText(this.inventoryService.inventoryToEdit.weight.text);
          this.inventoryService.updateInventoryWeight(this.inventoryService.inventoryToEdit.id, newWeight, (res) => {
            this.inventoryService.inventoryToEdit.weight = res;
          });
        }

      });

    }

    private getNumberFromText(text) {
      text = text.toString();
      const regex = /^([0-9]+)(,|.([0-9]+))?$/;
      let matches = text.match(regex);
      let number;
      if(matches[3]) {
        if(matches[3].length > 2){
          matches[3] = matches[3].substring(0,2);
        }
        number = `${matches[1]}.${matches[3]}`;
      } else {
        number = `${matches[1]}`;
      }
      return parseFloat(number);
    }

    private weightCheck(weight, callback) {
      const regex = /^([0-9]+)(,|.([0-9]+))?$/;
      if(regex.test(weight)){
        callback(false);
      } else {
        callback(true)
      };
    }

    editWeightCancel(){
      this.inventoryService.inventoryToEdit.weight.editing=false;
      this.inventoryService.inventoryToEdit.weight.text = this.inventoryService.inventoryToEdit.weight.tempText;
    }

    editUrlBegin(){
      this.inventoryService.inventoryToEdit.url.editing=true;
      this.inventoryService.inventoryToEdit.url.tempText = this.inventoryService.inventoryToEdit.url.text;
      // console.log(this.inventoryService.inventoryToEdit.url)

    }
    editUrlSave(){
      this.inventoryService.inventoryToEdit.url.saving = true;
      this.inventoryService.inventoryToEdit.url.editing=false;
      this.inventoryService.updateInventoryUrl(this.inventoryService.inventoryToEdit.id, this.inventoryService.inventoryToEdit.url.text, (res) => {
        this.inventoryService.inventoryToEdit.url.text = res.url;
        this.inventoryService.inventoryToEdit.url.saving = false;

      });
    }
    editUrlCancel(){
      this.inventoryService.inventoryToEdit.url.editing=false;
      this.inventoryService.inventoryToEdit.url.text = this.inventoryService.inventoryToEdit.url.tempText;
    }

    recommendUrlPull(){
      this.inventoryService.inventoryToEdit.url.pulling=true;
      this.inventoryService.getRecommendedUrlForItem(this.inventoryService.inventoryToEdit, (res) => {
        this.inventoryService.inventoryToEdit.url.textToRecommend = res.text;
        this.inventoryService.inventoryToEdit.url.pulling=false;
      });
    }
    recommendUrlPut(){
      this.inventoryService.inventoryToEdit.url.tempText = this.inventoryService.inventoryToEdit.url.text;
      this.inventoryService.inventoryToEdit.url.text = this.inventoryService.inventoryToEdit.url.textToRecommend;
      this.inventoryService.inventoryToEdit.url.editing=true;
    }
    isEqual () {
      if (this.inventoryService.inventoryToEdit.url.text === this.inventoryService.inventoryToEdit.url.textToRecommend) {
        return "совпадает с рекомендованным"
      } else {
        return "НЕ совпадает с рекомендованным"
      }
    }

    changeImageSize() {
      this.inventoryService.inventoryToEdit.image.loading = true;
      this.getCompressedImg(this.image, this.maxSize/1000);
    }

    onImageChange(event) {
      this.inventoryService.inventoryToEdit.image.loading = true;
      this.image = event.target.files[0];
      this.maxSize = 200; //reset since new file picked
      this.turnCount = 0; //reset since new file picked

      // console.log(image);
      if (this.image.type === 'image/heic') {
        heic2any({
          blob: this.image,
          // quality: 0.2,    
          toType: 'image/jpeg'
        }).then((result) => {
          // console.log(result);
          this.image = result;
          this.getCompressedImg(result, this.maxSize/1000);
        });
      } else {
        this.getCompressedImg(this.image, this.maxSize/1000);
      }
    }

    getCompressedImg(image, maxSize: number) {
      this.ng2ImgMax.compressImage(image, maxSize).subscribe(
        result => {
          // console.log(result);
          this.uploadedImage = new File([result], result.name);
          this.getImagePreview(this.uploadedImage);
        },
        error => {
          if ((error.error === 'UNABLE_TO_COMPRESS_ENOUGH' || error.error === 'MAX_STEPS_EXCEEDED') && maxSize < 1.1) {
            let alert: Alert = {
              alertClass: 'Danger',
              text: `Error: ${error.error}`,
              comment: `${error.reason}`,
              waitForClick: true
            };
            this.maxSize += 25;
            this.getCompressedImg(image, this.maxSize/1000);
          } else {
            let alert: Alert = {
              alertClass: 'Danger',
              text: `Error: ${error.error}`,
              comment: `${error.reason}`,
              waitForClick: true
            };
            this.alertService.addAlert(alert);
            this.editImageCancel();
            this.inventoryService.inventoryToEdit.image.loading = false;
            this.inventoryService.inventoryToEdit.image.editing = true;
            this.inventoryService.inventoryToEdit.image.readyToSave = false;
            this.inventoryService.inventoryToEdit.image.data = this.inventoryService.inventoryToEdit.image.tempData;
            // console.log('😢 Oh no!', error);
          }

        }
      );
    }

    getImagePreview(file: any) {
      const reader: FileReader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => {
        this.inventoryService.inventoryToEdit.image.data = reader.result;

        this.turnCountHelper(this.turnCount);
        this.inventoryService.inventoryToEdit.image.readyToSave = true;
        // this.inventoryService.inventoryToEdit.image.loading = false;
        // console.log(this.inventoryService.inventoryToEdit.image.data);
      };
    }

    turnCountHelper(count) {
      console.log('helper ', this.turnCount, " count ", count);
      if (count) {
        this.changeOrientation(this.inventoryService.inventoryToEdit.image.data, 8, (resetBase64Image) => {
          this.inventoryService.inventoryToEdit.image.data = resetBase64Image;
          count -= 1;
          this.turnCountHelper(count);
        });
      } else {
        this.inventoryService.inventoryToEdit.image.loading = false;
      }
    }

    changeOrientation(srcBase64, srcOrientation, callback) {
      var img = new Image();	
    
      img.onload = function() {
        var width = img.width,
            height = img.height,
            canvas = document.createElement('canvas'),
            ctx = canvas.getContext("2d");
        
        // set proper canvas dimensions before transform & export
        if (4 < srcOrientation && srcOrientation < 9) {
          canvas.width = height;
          canvas.height = width;
        } else {
          canvas.width = width;
          canvas.height = height;
        }
      
        // transform context before drawing image
        switch (srcOrientation) {
          case 2: ctx.transform(-1, 0, 0, 1, width, 0); break;
          case 3: ctx.transform(-1, 0, 0, -1, width, height ); break;
          case 4: ctx.transform(1, 0, 0, -1, 0, height ); break;
          case 5: ctx.transform(0, 1, 1, 0, 0, 0); break;
          case 6: ctx.transform(0, 1, -1, 0, height , 0); break;
          case 7: ctx.transform(0, -1, -1, 0, height , width); break;
          case 8: ctx.transform(0, -1, 1, 0, 0, width); break;
          default: break;
        }
    
        // draw image
        ctx.drawImage(img, 0, 0);
    
        // export base64
        callback(canvas.toDataURL());
      };
    
      img.src = srcBase64;
    }

    rotateImage() {
      // 6 - orientation clockwise, 8 - clockunwise
      this.changeOrientation(this.inventoryService.inventoryToEdit.image.data, 8, (resetBase64Image) => {
        this.inventoryService.inventoryToEdit.image.data = resetBase64Image;
      });
      this.turnCount = (this.turnCount + 1) % 4;
      console.log('rotate+ ', this.turnCount);
    }


    updateImage(){
      this.inventoryService.inventoryToEdit.image.readyToSave = false;
      this.inventoryService.inventoryToEdit.image.loading = true;
      this.inventoryService.updateImage(this.inventoryService.inventoryToEdit.image.data, this.inventoryService.inventoryToEdit.id, (res)=>{
        // console.log(res);
        // this.image = res;
        this.inventoryService.inventoryToEdit.image.editing = false;
        this.inventoryService.inventoryToEdit.image.loading = false;
      })
    }

    editImageStart() {
      this.inventoryService.inventoryToEdit.image.editing = true;
      this.inventoryService.inventoryToEdit.image.tempData = this.inventoryService.inventoryToEdit.image.data;
    }

    editImageCancel() {
      this.inventoryService.inventoryToEdit.image.editing = false;
      this.inventoryService.inventoryToEdit.image.readyToSave = false;
      this.inventoryService.inventoryToEdit.image.data = this.inventoryService.inventoryToEdit.image.tempData;
    }
  }
