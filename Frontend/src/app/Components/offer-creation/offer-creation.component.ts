import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormArray } from '@angular/forms';
import { JobOfferService } from 'src/app/Services/job-offer.service';
import { JobsService } from 'src/app/Services/jobs.service';
import { AuthService } from 'src/app/Services/auth.service';
import _ from "lodash"
import {map} from 'rxjs/operators'
import { EnterpriseService } from 'src/app/Services/enterprise.service';
import { MatDialogRef } from '@angular/material';
@Component({
  selector: 'app-offer-creation',
  templateUrl: './offer-creation.component.html',
  styleUrls: ['./offer-creation.component.scss']
})
export class OfferCreationComponent implements OnInit {

  offerFormGroup: FormGroup;
  offer;
  jobs:any[]=[];
  enterprises:any[]=[];
  loggedEntreprise;
  skills:FormArray;
  constructor(  private formBuilder: FormBuilder,
    private jobOfferService:JobOfferService,
    private jobsService:JobsService,
    private authService:AuthService,
    private enterpriseService:EnterpriseService,
    public dialogRef: MatDialogRef<OfferCreationComponent>
  ) {
    this.offerFormGroup = this.formBuilder.group({
      nom_poste: ['', Validators.required],
      nom_enterprise: ['', Validators.required],
      town: ['', Validators.required],
      skills: this.formBuilder.array([ this.createSkill() ])
    });
   }

  ngOnInit() {
    this.loadLoggedEntreprise();
     this.loadJobs();
     this.loadEnterprises();
     
  }

  createSkill(): FormGroup {
    return this.formBuilder.group({
      name: '',
    });
  }
   
  addSkill(): void {
    this.skills = this.offerFormGroup.get('skills') as FormArray;
    this.skills.push(this.createSkill());
  }

  loadLoggedEntreprise(){
    this.authService.getCurrentUser()
      .subscribe(user=>{
        console.log("current");
        console.log(user);
        this.loggedEntreprise=user;
        this.offerFormGroup.get('nom_entreprise').setValue(this.loggedEntreprise.name);
     });
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
   
   createOffer(){
      //var skills:any[]=[];
    //  skills.push(this.offerFormGroup.get('skills').value);
     this.offer={
        job:{
          id:this.offerFormGroup.get('nom_poste').value,
        },
        enterprise: {
          id:this.offerFormGroup.get('nom_enterprise').value
        },
        town:this.offerFormGroup.get('town').value,
        skills:this.offerFormGroup.get('skills').value.map(s=>s.name)
     }
     console.log("offer");
     console.log(this.offer);
    this.jobOfferService.postOffer(this.offer)
         .subscribe(offer=>{
                this.offer=offer;
                this.jobOfferService.getOffer(offer.id)
                   .subscribe(res=>{
                       console.log("final result");
                       console.log(res);
                       this.dialogRef.close();
                   })
     })
   }

   onNoClick(): void {
    this.dialogRef.close();
  }
}
