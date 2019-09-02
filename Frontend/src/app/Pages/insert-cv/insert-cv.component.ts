import { Component, OnInit ,Inject, Input} from '@angular/core';
import { FormBuilder, Validators, FormGroup, FormArray, FormControl } from '@angular/forms';
import {CVService} from '../../Services/cv.service';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import _ from "lodash"
@Component({
  selector: 'app-insert-cv',
  templateUrl: './insert-cv.component.html',
  styleUrls: ['./insert-cv.component.scss']
})
export class InsertCVComponent implements OnInit {
  items;
  CVForm:FormGroup;
  user={
    image:''
  };
  Uploading :boolean= false;
  Uploaded:boolean= true;
  uploadedFiles: any[] = [];
  softwares:FormArray;
  languages:FormArray;
  interests:FormArray;
  professionalExperiences:FormArray;
  studies:FormArray;
  socialMedias:FormArray;
  image;
  @Input()cv;
  constructor(
    private cvService: CVService,
    private formBuilder: FormBuilder,
    public dialogRef: MatDialogRef<InsertCVComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    this.CVForm = this.formBuilder.group({  
      firstName: ['', [Validators.required, Validators.minLength(2), Validators.maxLength(8)]],  
      lastName: ['', [Validators.required, Validators.minLength(2), Validators.maxLength(8)]],  
      address: ['', [Validators.required]], 
      phone: ['', [Validators.required]], 
      email: ['', [Validators.required,Validators.email]], 
      softwares:this.formBuilder.array([ this.createLogiciel()]),
      languages:this.formBuilder.array([ this.createLangue()]),
      interests:this.formBuilder.array([ this.createInteret()]),
      professionalExperiences:this.formBuilder.array([ this.createExperience()]),
      studies:this.formBuilder.array([ this.createFormation()]),
      socialMedias:this.formBuilder.array([ this.createSocialMedia()]),
    });
  }


  ngOnInit() {
     if(this.cv)this.fillCVForm();
      
  }
  
  fillCVForm(){
       this.CVForm.patchValue({
        firstName: this.cv.firstName, 
        lastName: this.cv.lastName,  
        address:this.cv.address, 
        phone: this.cv.phone,  
        email: this.cv.email ,
        softwares:this.cv.softwares,
        languages:this.formBuilder.array([ this.createLangue()]),
        interests:this.formBuilder.array([ this.createInteret()]),
        professionalExperiences:this.formBuilder.array([ this.createExperience()]),
        studies:this.formBuilder.array([ this.createFormation()]),
        socialMedias:this.formBuilder.array([ this.createSocialMedia()]),
       });
  }

 createLogiciel():FormGroup{  
    return this.formBuilder.group({  
      name: ['', Validators.required],  
      level: ['', Validators.required],
    });  
  }  
 
  addLogicielClick(): void {  
    this.softwares=this.CVForm.get('softwares') as FormArray;
    this.softwares.push(this.createLogiciel());
  }  

  deleteLogicielClick(i){
    console.log(i);
    this.softwares.removeAt(i);
  }

  createSocialMedia():FormGroup{  
    return this.formBuilder.group({  
      type: ['', Validators.required],  
      path: ['', Validators.required],  
    });  
  }  
 
  addSocialMediaClick(): void {  
    this.socialMedias=this.CVForm.get('socialMedias') as FormArray;
    this.socialMedias.push(this.createSocialMedia());
  }  

  deleteSocialMediaClick(i){
    console.log(i);
    this.socialMedias.removeAt(i);
  }

  createLangue():FormGroup{  
    return this.formBuilder.group({  
      name: ['', Validators.required],  
      level: ['', Validators.required],  
    });  
  }  
 
  addLangueClick(): void {  
    this.languages=this.CVForm.get('languages') as FormArray;
    this.languages.push(this.createLangue());
  }  

  deleteLangueClick(i){
    console.log(i);
    this.languages.removeAt(i);
  }

  createInteret():FormGroup{  
    return this.formBuilder.group({  
      name: ['', Validators.required],  
      description: [''], 
    });  
  }  
 
  addInteretClick(): void {  
    this.interests=this.CVForm.get('interests') as FormArray;
    this.interests.push(this.createInteret());
  }  

  deleteInteretClick(i){
    console.log(i);
    this.interests.removeAt(i);
  }
  
  createExperience():FormGroup{  
    return this.formBuilder.group({  
      enterprise: ['', Validators.required],  
      post:['', Validators.required],
      startingDate:['',Validators.required],
      finishingDate:['',Validators.required]
    });  
  }  
 
  addExperienceClick(): void {  
    this.professionalExperiences=this.CVForm.get('professionalExperiences') as FormArray;
    this.professionalExperiences.push(this.createExperience());
  }  

  deleteExperienceClick(i){
    console.log(i);
    if(i==null)i=0;
    this.professionalExperiences.removeAt(i);
  }

  createFormation():FormGroup{  
    return this.formBuilder.group({  
      name: ['', Validators.required], 
      institution :['', Validators.required], 
      date:['', Validators.required], 
      mention:['', Validators.required],
    });  
  }  
 
  addFormationClick(): void {  
    this.studies=this.CVForm.get('studies') as FormArray;
    this.studies.push(this.createFormation());
  }  

  deleteFormationClick(i){
    console.log(i);
    this.studies.removeAt(i);
  }

  onSubmit() {
    // Process checkout data here
   /* this.cvService.postCV(customerData).subscribe(data => {
      this.fetchData()
    });*/
    console.log("voila");
   
    var resultCV=_.merge(this.CVForm.value,{photo:this.image});
    console.log(resultCV);
    this.dialogRef.close(resultCV);
  }

  fetchData() {

    this.cvService.getCVs().subscribe(data => {

      this.items = data;
      
      console.log(this.items);

    });   


  }



  
onUpload(event) {
  this.Uploading = true;
  this.Uploaded = false;

  for(let file of event.files) {

      this.uploadedFiles.push(file);
  }

}
changeListener(event) : void {
  this.Uploading = true;
  this.Uploaded = false;
  for(let file of event.files) {

    this.readThis(file);
}



}

updateImage(ImageUrl){
  this.user.image=ImageUrl;
}

readThis(inputValue: any): void {
  var file:File = inputValue;
  var myReader:FileReader = new FileReader();

  myReader.onloadend = (e) => {
    this.image = myReader.result;
   this.updateImage(myReader.result);

  }
  myReader.readAsDataURL(file);
}

}
