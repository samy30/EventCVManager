
import { Component, OnInit ,Inject, Input, SimpleChanges, Output, EventEmitter} from '@angular/core';
import { FormBuilder, Validators, FormGroup, FormArray, FormControl } from '@angular/forms';
import {CVService} from '../../Services/cv.service';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import _ from "lodash"
import { NgForOf } from '@angular/common';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
@Component({
  selector: 'app-cv-display',
  templateUrl: './cv-display.component.html',
  styleUrls: ['./cv-display.component.scss']
})
export class CvDisplayComponent implements OnInit {
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
  image:any;
  @Input()cv;
  @Input()jobDemande;
  @Output() decisionEmitter = new EventEmitter();
  constructor(
    private cvService: CVService,
    private formBuilder: FormBuilder,
    private sanitization: DomSanitizer
  ) {
    this.CVForm = this.formBuilder.group({  
      firstName: [''],  
      lastName: [''],  
      address: [''], 
      phone: [''], 
      email: [''], 
      softwares:this.formBuilder.array([]),
      languages:this.formBuilder.array([]),
      interests:this.formBuilder.array([]),
      professionalExperiences:this.formBuilder.array([]),
      studies:this.formBuilder.array([]),
      socialMedias:this.formBuilder.array([]),
    });
  }


  ngOnInit() {
     if(this.cv)this.fillCVForm();
      
  }

  ngOnChanges(changes: SimpleChanges) {

    if(changes.cv.currentValue && changes.jobDemande.currentValue)this.fillCVForm();
   
}

  
  fillCVForm(){
       this.CVForm.patchValue({
        firstName: this.cv.firstName, 
        lastName: this.cv.lastName,  
        address:this.cv.address, 
        phone: this.cv.phone,  
        email: this.cv.email 
       });
      
       this.patchSoftwares();
       this.patchLanguages();
       this.patchInterests();
       this.patchSocialMedias();
       this. patchProfessionalExperiences();
       this.patchStudies();
     //  this.image = this.sanitization.bypassSecurityTrustStyle(this.cv.photo);
     this.image=this.cv.photo;
  }

 patchSoftwares(){
  if(this.cv.softwares){
    this.softwares=this.CVForm.get('softwares') as FormArray;
    this.softwares.clear();
    this.cv.softwares.forEach(software => {
       this.softwares.push(this.formBuilder.group({  
         name: [''],  
         level: [''],
       }));
    });
    this.softwares.patchValue(this.cv.softwares);
   }
 }

 patchLanguages(){
  if(this.cv.languages){
    this.languages=this.CVForm.get('languages') as FormArray;
    this.languages.clear();
    this.cv.languages.forEach(language => {
       this.languages.push(this.formBuilder.group({  
         name: [''],  
         level: [''],
       }));
    });
    this.languages.patchValue(this.cv.languages);
   }
 }

 
 patchInterests(){
  if(this.cv.interests){
    this.interests=this.CVForm.get('interests') as FormArray;
    this.interests.clear();
    this.cv.interests.forEach(i => {
       this.interests.push(this.formBuilder.group({  
         name: [''],  
         description: [''],
       }));
    });
    this.interests.patchValue(this.cv.interests);
   }
 }

 patchProfessionalExperiences(){
  if(this.cv.professionalExperiences){
    this.professionalExperiences=this.CVForm.get('professionalExperiences') as FormArray;
    this.professionalExperiences.clear();
    this.cv.professionalExperiences.forEach(sc => {
       this.professionalExperiences.push(this.formBuilder.group({  
         enterprise: [''],  
         finishingDate: [''],
         post:[''],
         startingDate:['']
       }));
    });
    this.professionalExperiences.patchValue(this.cv.professionalExperiences);
   }
 }

 patchSocialMedias(){
  if(this.cv.socialMedias){
    this.socialMedias=this.CVForm.get('socialMedias') as FormArray;
    this.socialMedias.clear();
    this.cv.socialMedias.forEach(sc => {
       this.socialMedias.push(this.formBuilder.group({  
         type: [''],  
         path: [''],
       }));
    });
    this.socialMedias.patchValue(this.cv.socialMedias);
   }
 }

 patchStudies(){
  if(this.cv.studies){
    this.studies=this.CVForm.get('studies') as FormArray;
    this.studies.clear();
    this.cv.studies.forEach(sc => {
       this.studies.push(this.formBuilder.group({  
        institution: [''],  
        mention: [''],
        name:[''],
        date:['']
       }));
    });
    this.studies.patchValue(this.cv.studies);
   }
 }


 Accepter(){
    this.decisionEmitter.emit(true);
 }

 Refuser(){
    this.decisionEmitter.emit(false);
 }

  fetchData() {

    this.cvService.getCVs().subscribe(data => {

      this.items = data;
      
      console.log(this.items);

    });   


  }



  


}
