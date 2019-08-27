import { Component, OnInit } from '@angular/core';
import { JobDemandeService } from 'src/app/Services/job-demande.service';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-job-demande',
  templateUrl: './job-demande.component.html',
  styleUrls: ['./job-demande.component.scss']
})
export class JobDemandeComponent implements OnInit {

  constructor(private jobDemandeService:JobDemandeService,
              private router:Router,
              private route:ActivatedRoute) { }
  jobDemandes:any[]=[];
  ngOnInit() {
    this.loadJobDemandes();
  }
   //load jobDemandes seded to me
  loadJobDemandes(){
      this.jobDemandeService.getJobDemandes()
         .subscribe(jobDemandes=>{
             this.jobDemandes=jobDemandes;
         })
   }

   getJobDemandeDetails(jobDemande){
    //sending notification to component notification-details throug notification service
     this.jobDemandeService.emitJobDemande(jobDemande);
     this.router.navigate(['JobDemandeDetail'],{relativeTo:this.route});
  }
 
   

}
