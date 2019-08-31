import { Component, OnInit } from '@angular/core';
import { JobDemandeService } from 'src/app/Services/job-demande.service';
import { NotificationService } from 'src/app/Services/notification.service';

@Component({
  selector: 'app-job-demande-detail',
  templateUrl: './job-demande-detail.component.html',
  styleUrls: ['./job-demande-detail.component.scss']
})
export class JobDemandeDetailComponent implements OnInit {

  constructor(private jobDemandeService:JobDemandeService,
              private notificationService:NotificationService) { }

  jobDemande;
  
  ngOnInit() {
    this.loadJobDetail();
  }

  loadJobDetail(){
      this.jobDemandeService.eventCallback$
         .subscribe(jobDemande=>{
             this.jobDemande=jobDemande;
         })
  }

  acceptDemande(){
    //create notification with sender entreprise receiver demandesender and poste 
    var notification={};
    //post it in database
    this.notificationService.postNotification(notification)
       .subscribe(notif=>{
            console.log("notification created");
       })
  }

}