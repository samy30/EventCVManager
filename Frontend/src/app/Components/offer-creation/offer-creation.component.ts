import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { JobOfferService } from 'src/app/Services/job-offer.service';

@Component({
  selector: 'app-offer-creation',
  templateUrl: './offer-creation.component.html',
  styleUrls: ['./offer-creation.component.scss']
})
export class OfferCreationComponent implements OnInit {

  offerFormGroup: FormGroup;
  offer;
  constructor(  private formBuilder: FormBuilder,
    private jobOfferService:JobOfferService
  ) {
    this.offerFormGroup = this.formBuilder.group({
      nom_poste: ['', Validators.required],
      nom_entreprise: ['', Validators.required],
      adress: ['', Validators.required],
      competences: ['', Validators.required],
   });
   }

  ngOnInit() {
     
  }
   
   createOffer(){
     this.offer=this.offerFormGroup.value;
    this.jobOfferService.postOffer(this.offer)
    .subscribe(offer=>{
      this.offer=offer;
     })
   }
}
