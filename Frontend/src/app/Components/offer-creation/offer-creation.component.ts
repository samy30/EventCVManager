import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { JobOfferService } from 'src/app/Services/job-offer.service';
import { JobsService } from 'src/app/Services/jobs.service';
import { AuthService } from 'src/app/Services/auth.service';

@Component({
  selector: 'app-offer-creation',
  templateUrl: './offer-creation.component.html',
  styleUrls: ['./offer-creation.component.scss']
})
export class OfferCreationComponent implements OnInit {

  offerFormGroup: FormGroup;
  offer;
  jobs:any[]=[];
  loggedEntreprise;
  constructor(  private formBuilder: FormBuilder,
    private jobOfferService:JobOfferService,
    private jobsService:JobsService,
    private authService:AuthService
  ) {
    this.offerFormGroup = this.formBuilder.group({
      nom_poste: ['', Validators.required],
      nom_entreprise: ['', Validators.required],
      adress: ['', Validators.required],
      competences: ['', Validators.required],
   });
   }

  ngOnInit() {
    this.loadLoggedEntreprise();
     this.loadJobs();
     
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

   createOffer(){
     this.offer={
        job:{
          id:this.offerFormGroup.get('nom_poste').value,
        },
        enterprise: {
          id:this.loggedEntreprise.id
        }
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
                   })
     })
   }
}
