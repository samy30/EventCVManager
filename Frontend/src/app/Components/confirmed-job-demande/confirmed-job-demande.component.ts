import { Component, OnInit } from '@angular/core';
import { JobDemandeService } from 'src/app/Services/job-demande.service';
import { AuthService } from 'src/app/Services/auth.service';
import { NotificationService } from 'src/app/Services/notification.service';

@Component({
  selector: 'app-confirmed-job-demande',
  templateUrl: './confirmed-job-demande.component.html',
  styleUrls: ['./confirmed-job-demande.component.scss']
})
export class ConfirmedJobDemandeComponent implements OnInit {

  constructor(private jobDemandeService:JobDemandeService,
              private authService:AuthService,
              private notificationService:NotificationService) { }

  jobDemandes:any[]=[];
  senders:any[]=[];
  sender;
  jobDemandeCV;
  ngOnInit() {
       this.loadConfirmedJobDemandes();
       this.getNotification();
  }

 
  loadConfirmedJobDemandes(){
    this.senders=[];
      this.jobDemandeService.getMyConfirmedJobDemandes()
         .subscribe(jobDemandes=>{
            this.jobDemandes=jobDemandes;
             this.loadSenders(jobDemandes);         
             console.log("job demandes zzzzzzz");
             this.getNotification();
             console.log(jobDemandes);
             console.log(this.senders);
         })
   }

   loadSenders(jobDemandes){
    jobDemandes.map(j=>this.getSender(j));
    
 }

getSender(jobDemande){
  this.authService.getUser(jobDemande.createdBy)
     .subscribe(user=>{
      this.senders.push(user);
     })
}

getNotification(){
  console.log("hello NOT");
  this.notificationService.eventCallback$
     .subscribe(notification=>{
       console.log("notificatopn rec")
           this.jobDemandeService.getJobDemande(notification.jobDemandeID)
              .subscribe(jb=>{
                console.log("jb loaded")
                 this.getConfirmedJobDemandeDetails(jb);
              })
     })
}
confirmedJobDemande;
getConfirmedJobDemandeDetails(confirmedJobDemande){
    this.confirmedJobDemande=confirmedJobDemande;
    this.getJobSender(confirmedJobDemande);
}

getJobSender(jobDemande){
  this.authService.getUser(jobDemande.createdBy)
  .subscribe(user=>{
     this.sender=user;
  })
}




}
