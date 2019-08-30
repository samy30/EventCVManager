import { Component, OnInit, Input } from '@angular/core';
import { Router } from '@angular/router';
import { JobOfferService } from 'src/app/Services/job-offer.service';
import { MatDialog } from '@angular/material';
import { InsertCVComponent } from 'src/app/Pages/insert-cv/insert-cv.component';
import { CVService } from 'src/app/Services/cv.service';
import { JobDemandeService } from 'src/app/Services/job-demande.service';
import {JobsService} from '../../Services/jobs.service';

@Component({
  selector: 'app-job-offer',
  templateUrl: './job-offer.component.html',
  styleUrls: ['./job-offer.component.scss']
})
export class JobOfferComponent implements OnInit {
  constructor(private router: Router,
              private jobOfferService: JobOfferService,
              private jobsService: JobsService,
              public dialog: MatDialog,
              private cvService: CVService,
              private jobDemandeService: JobDemandeService) {

   }
  jobOffers: any[] = [];
  selectedJob: any;
  createdCV: any;
  jobDemande: any;
  currentUser;

  ngOnInit() {
    this.jobsService.eventCallback$.subscribe(postes => {
      console.log('postes here');
      this.selectedJob = postes; // 2
      // get offers based on selectedPostes
      this.jobOfferService.getOffers(this.selectedJob).subscribe(offers => {
            // list of jobOffers
             this.jobOffers = offers;
             console.log('offers');
             console.log(offers);
           });
    });
  }
  //
  getJob(offer) {
    const dialogRef = this.dialog.open(InsertCVComponent, {
      width: '95%',
      height: '100%',
      data: offer
    });

    dialogRef.afterClosed().subscribe(result => {
      this.createdCV = result;
      console.log('The dialog was closed');
      console.log(result);
      // save created CV in database
      this.cvService.postCV(this.createdCV).subscribe(cv => {
           this.createdCV = cv;
           console.log('cvCreated');
           // create Job-demande
           this.jobDemande = {
                 id: 0,
                 cv: this.createdCV,
                 entreprise: offer.entreprise,
                 sender: this.currentUser
            };
            // post job-demande
           this.jobDemandeService.postJobDemande(this.jobDemande)
                 .subscribe(demande => {
                   this.jobDemande = demande;
                 });
      });
    });

  }

}
