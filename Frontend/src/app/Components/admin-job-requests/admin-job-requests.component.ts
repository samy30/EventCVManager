import { Component, OnInit } from '@angular/core';
import {JobDemandeService} from "../../Services/job-demande.service";
import JobDemande from "../../Models/job-demande";
import JobRequest from "../../Models/jobRequest";

@Component({
  selector: 'app-admin-job-requests',
  templateUrl: './admin-job-requests.component.html',
  styleUrls: ['./admin-job-requests.component.scss']
})
export class AdminJobRequestsComponent implements OnInit {

  private jobRequests: Array<JobRequest> = [];
  private jobRequestsGroups: Map<number, Array<JobRequest>> = new Map<number, Array<JobRequest>>();
  private groupRange = [0, 1, 2, 3];
  constructor(private jobRequestService: JobDemandeService) { }

  ngOnInit() {
    this.jobRequestService
      .getJobRequestsConfirmedByEnterpriseAndUser()
      .subscribe(jobRequests => {
        this.jobRequests = jobRequests;
        this.divideInFourGroups();
      });
  }

  divideInFourGroups() {
    const l = this.jobRequests.length;
    for (let i = 0; i < 3; i++) {
      this.jobRequestsGroups.set(i, this.jobRequests.slice(Math.floor(l / 4) * i, Math.floor(l / 4) * (i + 1)));
    }
    this.jobRequestsGroups.set(3, this.jobRequests.slice(Math.floor(l / 4) * 3, l));
  }

}
