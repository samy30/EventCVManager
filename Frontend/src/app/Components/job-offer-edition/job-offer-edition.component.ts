import { Component, OnInit, Inject } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormArray } from '@angular/forms';
import { JobOfferService } from 'src/app/Services/job-offer.service';
import { JobsService } from 'src/app/Services/jobs.service';
import { AuthService } from 'src/app/Services/auth.service';
import _ from "lodash"
import {map} from 'rxjs/operators'
import { EnterpriseService } from 'src/app/Services/enterprise.service';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';

@Component({
  selector: 'app-job-offer-edition',
  templateUrl: './job-offer-edition.component.html',
  styleUrls: ['./job-offer-edition.component.scss']
})

export class JobOfferEditionComponent implements OnInit {

  offerFormGroup: FormGroup;
  offer;
  jobs:any[]=[];
  enterprises:any[]=[];
  skills:FormArray;
  id;
  constructor(  private formBuilder: FormBuilder,
    private jobOfferService:JobOfferService,
    private jobsService:JobsService,
    private authService:AuthService,
    private enterpriseService:EnterpriseService,
    public dialogRef: MatDialogRef<JobOfferEditionComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    this.offerFormGroup = this.formBuilder.group({
      nom_poste: ['', Validators.required],
      nom_enterprise: ['', Validators.required],
      town: ['', Validators.required],
      skills: this.formBuilder.array([]),
    });
    this.id=this.data.id;
   }

  ngOnInit() {
     this.loadJobs();
     this.loadEnterprises();
     this.loadJobOffer(this.id);
  }

  compareById(obj1, obj2) {
    return obj1 && obj2 && obj1.id === obj2.id;
 }
 compareById2(obj1, obj2) {
  return obj1 && obj2 && obj1.id === obj2.id;
}


  loadJobOffer(id){
     this.jobOfferService.getOffer(id)
        .subscribe(jobOffer=>{
            this.offer=jobOffer;
            this.displayData(jobOffer);
        })
  }

displayData(jobOffer){
  console.log("hmaar");
  console.log({id:jobOffer.enterprise.id,name:jobOffer.enterprise.name});
   this.offerFormGroup.patchValue({
    nom_poste:jobOffer.job,
    nom_enterprise:{id:jobOffer.enterprise.id,name:jobOffer.enterprise.name},
    town:jobOffer.town
   });
   this.patchSkills(jobOffer);
}

patchSkills(jobOffer){
  if(jobOffer.skills){
    this.skills=this.offerFormGroup.get('skills') as FormArray;
    this.skills.clear();
    var convertedSkills=[];
    jobOffer.skills.forEach(skill => {
       this.skills.push(this.formBuilder.group({  
         name: [''],  
       }));
       var s={
         name:skill
       }
       convertedSkills.push(s);

    });
    console.log("mapper jobs");
    console.log(convertedSkills)
    this.skills.patchValue(convertedSkills);
   }
 }

  loadJobs(){
    this.jobsService.getJobs()
       .subscribe(jobs=>{
          this.jobs=jobs;
          console.log(this.offerFormGroup.get('nom_poste').value);
        
       })
  }


  loadEnterprises(){
     this.enterpriseService.getEnterprises()
        .subscribe(enterprises=>{
             this.enterprises=enterprises;
        })
  }
   
   updateOffer(){
      //var skills:any[]=[];
    //  skills.push(this.offerFormGroup.get('skills').value);
     this.offer={
        job:{
          id:this.offerFormGroup.get('nom_poste').value.id,
        },
        enterprise: {
          id:this.offerFormGroup.get('nom_enterprise').value.id
        },
        town:this.offerFormGroup.get('town').value,
        skills:this.offerFormGroup.get('skills').value.map(s=>s.name)
     }
     console.log("offer");
     console.log(this.offer);
    this.jobOfferService.updateOffer(this.offer,this.id)
         .subscribe(offer=>{
                this.offer=offer;
                this.jobOfferService.getOffer(offer.id)
                   .subscribe(res=>{
                       console.log("final result");
                       console.log(res);
                       this.dialogRef.close();
                   })
                 this.dialogRef.close(true);
     })
   }

   onNoClick(): void {
    this.dialogRef.close();
  }
}
