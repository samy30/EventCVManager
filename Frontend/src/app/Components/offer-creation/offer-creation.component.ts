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
  type_contrats=['Contract à durée déterminée','Contract à durée indéterminée','other options...'];
  genres=['Temps plein','Temps partiel'];
  towns=['Jendouba','Sfax','Tunisie','Sousse','Nabel','Bizerte'];
  skills:FormArray;
  diplomes=['diplôme d’études primaires','diplôme d’études secondaires','mastere','doctorat'];
  constructor(  private formBuilder: FormBuilder,
    private jobOfferService:JobOfferService,
    private jobsService:JobsService,
    private authService:AuthService,
    private enterpriseService:EnterpriseService,
    public dialogRef: MatDialogRef<OfferCreationComponent>
  ) {
    this.offerFormGroup = this.formBuilder.group({
      nom_poste: [''],
      nom_enterprise: [''],
      activity:['',Validators.required],
      town: [''],
      type:[''],
      time:['',Validators.required],
      wage:[''],
      description:['',Validators.required],
      minimumSchoolDegree:['',Validators.required],
      experience_years:['',Validators.required],
      startingDate:['',Validators.required],
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
        this.offerFormGroup.get('nom_enterprise').setValue(this.loggedEntreprise.name);
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
     this.offer={
        job:{
          id:this.offerFormGroup.get('nom_poste').value,
        },
        enterprise: {
          id:this.offerFormGroup.get('nom_enterprise').value
        },
        town:this.offerFormGroup.get('town').value,
        skills:this.offerFormGroup.get('skills').value.map(s=>s.name),
        activity:this.offerFormGroup.get('activity').value,
        type:this.offerFormGroup.get('type').value,
        wage:this.offerFormGroup.get('wage').value,
        time:this.offerFormGroup.get('time').value,
        description:this.offerFormGroup.get('description').value,
        minimumSchoolDegree:this.offerFormGroup.get('minimumSchoolDegree').value,
        experience_years:this.offerFormGroup.get('experience_years').value,
        startingDate:this.offerFormGroup.get('startingDate').value,
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
