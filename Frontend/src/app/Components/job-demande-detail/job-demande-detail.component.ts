import { Component, OnInit, SimpleChanges } from '@angular/core';
import { JobDemandeService } from 'src/app/Services/job-demande.service';
import { NotificationService } from 'src/app/Services/notification.service';
import { AuthService } from 'src/app/Services/auth.service';

@Component({
  selector: 'app-job-demande-detail',
  templateUrl: './job-demande-detail.component.html',
  styleUrls: ['./job-demande-detail.component.scss']
})
export class JobDemandeDetailComponent implements OnInit {

  constructor(private jobDemandeService:JobDemandeService,
              private notificationService:NotificationService,
              private authService:AuthService) { }

  jobDemande;
  sender;
  jobDemandeCV;
  ngOnInit() {
    this.loadJobDetail();
  }


  loadJobDetail(){
      this.jobDemandeService.eventCallback$
         .subscribe(jobDemande=>{
             this.jobDemande=jobDemande;
             this.getSender(jobDemande);
             this.jobDemandeCV=jobDemande.cv;
         })
  }

  getSender(jobDemande){
     this.authService.getUser(jobDemande.createdBy)
         .subscribe(user=>{
             this.sender=user;
         })
  }

  getDecision(decision:boolean){
       if(decision){
         this.acceptDemande();
       }
       else {
         console.log("demande refusée");
       }
  }

  acceptDemande(){
    //create notification with sender entreprise receiver demandesender and poste 
    var notification={};
    console.log("demande acceptée")
    //post it in database
   /* this.notificationService.postNotification(notification)
       .subscribe(notif=>{
            console.log("notification created");
       })*/
  }

}
