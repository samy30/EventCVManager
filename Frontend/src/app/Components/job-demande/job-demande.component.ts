import { Component, OnInit } from '@angular/core';
import { JobDemandeService } from 'src/app/Services/job-demande.service';
import { Router, ActivatedRoute } from '@angular/router';
import { AuthService } from 'src/app/Services/auth.service';
import { NotificationService } from 'src/app/Services/notification.service';

@Component({
  selector: 'app-job-demande',
  templateUrl: './job-demande.component.html',
  styleUrls: ['./job-demande.component.scss']
})
export class JobDemandeComponent implements OnInit {

  constructor(private jobDemandeService:JobDemandeService,
              private router:Router,
              private route:ActivatedRoute,
              private authService:AuthService,
              private notificationService:NotificationService) {           
              }

  jobDemandes:any[]=[];
  senders:any[]=[];
  selectedJobDemande;
  ngOnInit() {
     
      this.loadJobDemandes();
  }
   //load jobDemandes sended to me
  loadJobDemandes(){
    this.senders=[];
      this.jobDemandeService.getMyJobDemandes()
         .subscribe(jobDemandes=>{
            this.jobDemandes=jobDemandes.reverse();
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
                   this.getJobDemandeDetails(jb);
                })
       })
  }
    
   getJobDemandeDetails(jobDemande){
    //sending notification to component notification-details throug notification service
    this.selectedJobDemande=jobDemande;
     this.jobDemandeService.emitJobDemande(jobDemande);
  }

  getDecision(decision:boolean){
    var status="ACCEPTED";
     if(!decision)status="REFUSED";
    this.makeDecision(status);
  }

  makeDecision(status){
    //create notification with sender entreprise receiver demandesender and poste 
   console.log("demande acceptée")
    this.jobDemandeService.updateJobDemande(this.selectedJobDemande.id,{status:status})
       .subscribe(jb=>{
          console.log("job demande updated");
          console.log(jb);
          this.loadJobDemandes();
       })
  
 }
 
   

}
