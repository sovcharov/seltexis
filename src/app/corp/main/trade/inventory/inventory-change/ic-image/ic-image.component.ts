import { Component, OnInit } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { Ng2ImgMaxService } from 'ng2-img-max';
import { imageProcessor, rotate } from 'ts-image-processor';

import { InventoryService } from '../../../../../../services/inventory.service';
import { AlertService, Alert } from '../../../../../../services/alert.service';
import heic2any from "heic2any";

@Component({
  selector: 'app-ic-image',
  templateUrl: './ic-image.component.html',
  styleUrls: ['./ic-image.component.css']
})
export class IcImageComponent implements OnInit {
  
  image: any;
  uploadedImage: File;
  imageLoading: boolean = false;
  maxSize: number = 200;
  turnCount: number = 0;
  changingMain: boolean = false;

  constructor(
    public inventoryService: InventoryService,
    public domSanitizer: DomSanitizer,
    private ng2ImgMax: Ng2ImgMaxService,
    private alertService: AlertService
  ) { }

  ngOnInit(): void {
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
        // this.uploadedImage = new File([result], result.name);
        this.getImagePreview(result);
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
    // console.log(file)
    const reader: FileReader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => {
      this.inventoryService.inventoryToEdit.image.data = reader.result;
      this.turnCount = (4 + this.turnCount) % 4;
      this.turnCountHelper(this.turnCount);
      this.inventoryService.inventoryToEdit.image.readyToSave = true;
      // this.inventoryService.inventoryToEdit.image.loading = false;
      // console.log(this.inventoryService.inventoryToEdit.image.data);
    };
  }

  turnCountHelper(count) {
    // console.log('helper ', this.turnCount, " count ", count);
    if (count) {
      imageProcessor.src(this.inventoryService.inventoryToEdit.image.data)
      .pipe(
        rotate({clockwise: true})
      )
      .then(img=>{
        this.inventoryService.inventoryToEdit.image.data = img;
        count -= 1;
        this.turnCountHelper(count);
      })
    } else {
      this.inventoryService.inventoryToEdit.image.loading = false;
      console.log((this.inventoryService.inventoryToEdit.image.data.length));
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
      console.log(canvas);
  
      // export base64
      callback(canvas.toDataURL());
    };
  
    img.src = srcBase64;
  }

  rotateImage(clockwise) {
    this.inventoryService.inventoryToEdit.image.rotating = true;
    imageProcessor.src(this.inventoryService.inventoryToEdit.image.data)
    .pipe(
      rotate({clockwise: clockwise})
    )
    .then(img=>{
      this.inventoryService.inventoryToEdit.image.data = img;
      this.inventoryService.inventoryToEdit.image.rotating = false;
      console.log((this.inventoryService.inventoryToEdit.image.data.length));
    })
    // rotate(this.inventoryService.inventoryToEdit.image.data);
    // 6 - orientation clockwise, 8 - clockunwise
    // this.changeOrientation(this.inventoryService.inventoryToEdit.image.data, 8, (resetBase64Image) => {
    //   console.log(resetBase64Image);
    //   this.inventoryService.inventoryToEdit.image.rotating = false;
    //   this.inventoryService.inventoryToEdit.image.data = resetBase64Image;
    //   console.log((this.inventoryService.inventoryToEdit.image.data.length));

    // });
    if(clockwise) {
      this.turnCount = (this.turnCount + 1) % 4;
    } else {
      this.turnCount = (this.turnCount - 1) % 4;
    }
    console.log('rotate+ ', this.turnCount);
  }


  saveImage(){
    this.inventoryService.inventoryToEdit.image.readyToSave = false;
    this.inventoryService.inventoryToEdit.image.loading = true;
    this.inventoryService.saveInventoryImage(this.inventoryService.inventoryToEdit.image.data, this.inventoryService.inventoryToEdit.id, (res)=>{
      console.log(res);
      res.image = this.inventoryService.inventoryToEdit.image.data;
      this.inventoryService.inventoryToEdit.images.data[this.inventoryService.inventoryToEdit.images.data.length] = res;
      this.inventoryService.inventoryToEdit.image.data = "";
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

  deleteImageStart(i) {
    this.inventoryService.inventoryToEdit.images.data[i].deleting = true;
    // this.inventoryService.inventoryToEdit.image.tempData = this.inventoryService.inventoryToEdit.image.data;
  }

  deleteImageCancel(i) {
    this.inventoryService.inventoryToEdit.images.data[i].deleting = false;
    // this.inventoryService.inventoryToEdit.image.readyToSave = false;
    // this.inventoryService.inventoryToEdit.image.data = this.inventoryService.inventoryToEdit.image.tempData;
  }
  
  deleteImage(i) {
    this.inventoryService.inventoryToEdit.images.data[i].delete = true;
    this.inventoryService.deleteInventoryImage(this.inventoryService.inventoryToEdit.images.data[i].id, this.inventoryService.inventoryToEdit.id, (res)=>{
      console.log(res);
      this.inventoryService.inventoryToEdit.images.data.splice(i, 1);
    })
  }

  changeMainBegin(index){
    this.inventoryService.inventoryToEdit.images.data[index].changeMain=true;
  }

  changeMainSave(index){
    this.inventoryService.inventoryToEdit.images.data[index].updatingMain = true;
    this.inventoryService.inventoryToEdit.images.data[index].changeMain=false;
    this.changingMain = true;
    this.inventoryService.updateInventoryMainImage(this.inventoryService.inventoryToEdit.images.data[index].id, this.inventoryService.inventoryToEdit.id, (res) => {
      // console.log(res);
      for (let i = 0; i < this.inventoryService.inventoryToEdit.images.data.length; i += 1){
        if(this.inventoryService.inventoryToEdit.images.data[i].main) {
          this.inventoryService.inventoryToEdit.images.data[i].main = 0;
        }
      }
      this.inventoryService.inventoryToEdit.images.data[index].updatingMain = false;
      this.inventoryService.inventoryToEdit.images.data[index].main = 1;
      if(index) {
        this.inventoryService.inventoryToEdit.images.data.unshift(this.inventoryService.inventoryToEdit.images.data[index]);
        this.inventoryService.inventoryToEdit.images.data.splice(index + 1, 1);
      }
      // this.inventoryService.inventoryToEdit.images.data[index].saving = false;
      // this.changingMain = false;
    });
  }

  changeMainCancel(index){
    this.inventoryService.inventoryToEdit.images.data[index].changeMain=false;
  }

  // saveImage(): void {
  //   this.inventoryService.saveInventoryImage(1, 1110, data => {
  //     console.log(data);
  //   });
  // }


}
