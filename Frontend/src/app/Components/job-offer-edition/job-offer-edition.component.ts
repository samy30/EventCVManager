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
  type_contrats=['Contract à durée déterminée','Contract à durée indéterminée','other options...'];
  genres=['Temps plein','Temps partiel'];
  towns=['Jendouba','Sfax','Tunisie','Sousse','Nabel','Bizerte'];
  diplomes=['diplôme d’études primaires','diplôme d’études secondaires','mastere','doctorat','bac'];
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
      activity:['',Validators.required],
      town: ['', Validators.required],
      type:['', Validators.required],
      time:['',Validators.required],
      wage:[''],
      description:['',Validators.required],
      minimumSchoolDegree:['',Validators.required],
      experience_years:['',Validators.required],
      startingDate:['',Validators.required],
      skills: this.formBuilder.array([])
      
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
  console.log(jobOffer);
  console.log("hmaar");
  console.log({id:jobOffer.enterprise.id,name:jobOffer.enterprise.name});
   this.offerFormGroup.patchValue({
    nom_poste:{id:jobOffer.job.id,name:jobOffer.job.name},
    nom_enterprise:{id:jobOffer.enterprise.id,name:jobOffer.enterprise.name},
    activity:jobOffer.activity,
    town:jobOffer.town,
    time:jobOffer.time,
    type:jobOffer.type,
    wage:jobOffer.wage,
    description:jobOffer.description,
    minimumSchoolDegree:jobOffer.minimumSchoolDegree,
    experience_years:jobOffer.experience_years,
    startingDate:jobOffer.startingDate,
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
    this.offer={
      job:{
        id:this.offerFormGroup.get('nom_poste').value.id,
      },
      enterprise: {
        id:this.offerFormGroup.get('nom_enterprise').value.id
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
