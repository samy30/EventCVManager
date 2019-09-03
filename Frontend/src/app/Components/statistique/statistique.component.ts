import { Component, OnInit } from '@angular/core';
import { JobsService } from 'src/app/Services/jobs.service';
import { StatisticService } from 'src/app/Services/statistic.service';

@Component({
  selector: 'app-statistique',
  templateUrl: './statistique.component.html',
  styleUrls: ['./statistique.component.scss']
})
export class StatistiqueComponent implements OnInit {
  public pieChartType = 'pie';
  postList:any[]=[];
  public pieChartJobLabels:any[]=[];
  public pieChartJobData:any[]=[];
  constructor(private jobsService: JobsService,private statisticService:StatisticService){

  }

  ngOnInit(){
    this.loadPosts();
  }
  
  loadPosts() {
    this.jobsService.getJobs().subscribe(postes => {
      this.postList = postes ;

    });
  }

  setJobStatistic(postes){
      this.pieChartJobLabels=[];
      this.pieChartJobData=[];
      postes.forEach(p => {
         this.pieChartJobLabels.push(p.name);
         this.statisticService.getJobStatistic(p.id)
            .subscribe(nb=>{
              this.pieChartJobData.push(nb);
              console.log(nb);
            })
        
      });
  }

}