import { Component, OnInit, Output, EventEmitter, Input, SimpleChanges } from '@angular/core';

@Component({
  selector: 'app-upload',
  templateUrl: './upload.component.html',
  styleUrls: ['./upload.component.scss']
})

export class UploadComponent implements OnInit  {

  @Output() imageEmitter=new EventEmitter();


  public imagePath;
  @Input() imgURL: any=null;
  @Input() flag=1;
  public message: string;

  constructor() { }

  ngOnInit() {

  }

  ngOnchange(changes: SimpleChanges){
    console.log("imgae url change");
    console.log(changes.imgURL.currentValue);
    this.imgURL=changes.imgURL.currentValue;
    this.flag=changes.flag.currentValue;
  }
 
  preview(files) {
    if (files.length === 0)
      return;
 
    var mimeType = files[0].type;
    if (mimeType.match(/image\/*/) == null) {
      this.message = "Only images are supported.";
      return;
    }
 
    var reader = new FileReader();
    this.imagePath = files;
    reader.readAsDataURL(files[0]); 
    reader.onload = (_event) => { 
      this.imgURL = reader.result; 
      this.imageEmitter.emit(this.imgURL);
    }
  }
}
