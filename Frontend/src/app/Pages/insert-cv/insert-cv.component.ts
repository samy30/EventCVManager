import { Component, OnInit ,Inject} from '@angular/core';
import { FormBuilder, Validators, FormGroup, FormArray } from '@angular/forms';
import {CVService} from '../../Services/cv.service';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
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
  experience_professionnelle:FormArray;
  studies:FormArray;
  image ;
  constructor(
    private cvService: CVService,
    private formBuilder: FormBuilder,
    public dialogRef: MatDialogRef<InsertCVComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
   
  }


  ngOnInit() {
    this.CVForm = this.formBuilder.group({  
      firstName: ['', [Validators.required, Validators.minLength(2), Validators.maxLength(8)]],  
      lastName: ['', [Validators.required, Validators.minLength(2), Validators.maxLength(8)]], 
      poste: ['', [Validators.required]],   
      adress: ['', [Validators.required]], 
      phone: ['', [Validators.required]], 
      email: ['', [Validators.required]], 
      softwares:this.formBuilder.array([ this.createLogiciel()]),
      languages:this.formBuilder.array([ this.createLangue()]),
      interests:this.formBuilder.array([ this.createInteret()]),
      experience_professionnelle:this.formBuilder.array([ this.createExperience()]),
      studies:this.formBuilder.array([ this.createFormation()]),
    });
   // this.fetchData();
  }
  
 createLogiciel():FormGroup{  
    return this.formBuilder.group({  
      name: ['', Validators.required],  
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

  createLangue():FormGroup{  
    return this.formBuilder.group({  
      name: ['', Validators.required],  
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
      entreprise: ['', Validators.required],  
      poste:['', Validators.required],
      starting_date:['',Validators.required],
      finishing_date:['',Validators.required]
    });  
  }  
 
  addExperienceClick(): void {  
    this.experience_professionnelle=this.CVForm.get('experience_professionnelle') as FormArray;
    this.experience_professionnelle.push(this.createExperience());
  }  

  deleteExperienceClick(i){
    console.log(i);
    if(i==null)i=0;
    this.experience_professionnelle.removeAt(i);
  }

  createFormation():FormGroup{  
    return this.formBuilder.group({  
      diplome: ['', Validators.required], 
      university :['', Validators.required], 
      pays:['', Validators.required], 
      date:['', Validators.required],
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
    console.log(this.CVForm.value);
    this.dialogRef.close(this.CVForm.value);
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
