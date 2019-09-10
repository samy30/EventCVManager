import { Component, OnInit, Input } from '@angular/core';
import { Router } from '@angular/router';
import { JobOfferService } from 'src/app/Services/job-offer.service';
import { MatDialog } from '@angular/material';
import { InsertCVComponent } from 'src/app/Pages/insert-cv/insert-cv.component';
import { CVService } from 'src/app/Services/cv.service';
import { JobDemandeService } from 'src/app/Services/job-demande.service';
import {JobsService} from '../../Services/jobs.service';
import { AuthService } from 'src/app/Services/auth.service';
import { Subscription} from 'rxjs';
import { NotificationService } from 'src/app/Services/notification.service';


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
              private jobDemandeService: JobDemandeService,
              private authService: AuthService,
              private notificationService:NotificationService) {
                this.loadSelectedPost();

   }
  jobOffers: any[] = [];
  selectedJob: any;
  createdCV: any;
  jobDemande: any;
  currentUser;
  notifications=[];
  sub: Subscription;
  ngOnInit() {
   // this.loadSelectedPost();
     this.loadLoggedUser();

  }

     loadSelectedPost(){
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

     loadLoggedUser(){
          this.authService.getCurrentUser()
             .subscribe(user=>{
                this.currentUser=user;
                this.notificationService.getNotifications(this.currentUser.id)
                     .subscribe(notifs=>{
                        this.notifications=notifs;
                        console.log("notifications here");
                        console.log(notifs);
                })
             })
     }

     isToken(offer){

           var offersId=this.notifications.map(notif=>notif.jobOfferID);
           console.log("offersIDs");
           console.log(this.notifications);
           console.log(offersId);
           return (offersId.indexOf(offer.id)!==-1);
              
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
           console.log('offre selected');
           console.log(offer);
           this.jobDemande = {
                 cv: {id:this.createdCV.id},
                 jobOffer: {id:offer.id},
                 sender:{id:this.currentUser.id},
                 enterprise:{id:offer.enterprise.id},
                 status:'PENDING',
                 confirmedByUser:false
            };
            console.log('job demande');
            console.log(this.jobDemande);
            // post job-demande
           this.jobDemandeService.postJobDemande(this.jobDemande)
                 .subscribe(demande => {
                   this.jobDemande = demande;
                  
                 });
           });
    });

  }

}
