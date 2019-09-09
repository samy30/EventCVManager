import { Component, OnInit, Input, SimpleChanges, Output, EventEmitter } from '@angular/core';
import { NotificationService } from 'src/app/Services/notification.service';
import { EnterpriseService } from 'src/app/Services/enterprise.service';
import { AuthService } from 'src/app/Services/auth.service';
import { JobOfferService } from 'src/app/Services/job-offer.service';
import { JobDemandeService } from 'src/app/Services/job-demande.service';

@Component({
  selector: 'app-notification-detail',
  templateUrl: './notification-detail.component.html',
  styleUrls: ['./notification-detail.component.scss']
})
export class NotificationDetailComponent implements OnInit {

  constructor(private notificationService:NotificationService,
      private enterpriseService:EnterpriseService,
      private authService:AuthService,
      private jobOfferService:JobOfferService,
      private jobDemandeService:JobDemandeService) { }

  @Input() notification;
  @Output() confirmationEmitter= new EventEmitter();
  nameEnterprise;
  selectedJobOffer;
  selectedJobDemande;
  loggedUser;
  

  ngOnInit() {

   this.loadLoggedUser();

  }

  ngOnChanges(changes: SimpleChanges) {
    console.log("hhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhh");
    console.log(changes.notification.currentValue)
  if(changes.notification.currentValue)  this.loadInformation(changes.notification.currentValue);
   

}

loadLoggedUser() {
  this.loggedUser = JSON.parse(localStorage.getItem('currentUser'));
  console.log("logg")
}


loadInformation(notif){
        this.authService.getUser(notif.senderID)
         .subscribe(enterprise=>{
            this.nameEnterprise=enterprise.name;
         })
         this.jobOfferService.getOffer(notif.jobOfferID)
            .subscribe(jobOffer=>{
               this.selectedJobOffer=jobOffer;
               console.log("selectedJobOffer");
               console.log(this.selectedJobOffer);
            })
        this.jobDemandeService.getJobDemande(notif.jobDemandeID)
             .subscribe(jobDemande=>{
               console.log("selectedJobDemande");
               console.log(jobDemande);
                 this.selectedJobDemande=jobDemande;
             })
}

Confirmer(){
   this.confirmationEmitter.emit(true);
}

}
