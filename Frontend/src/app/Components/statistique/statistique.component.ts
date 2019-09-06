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
  genders=['male','female'];
  users:any[]=[];
  public pieChartJobLabels:string[]=[];
  public pieChartJobData:number[]=[];
  public pieChartGenderLabels:string[]=[];
  public pieChartGenderData:number[]=[];
  public pieChartAgeLabels:string[]=[];
  public pieChartAgeData:number[]=[];
  readyGender:number=0;
  readyJob:number=0;
  readyAge:number=0;
  readyGenderFlag=false;
  readyJobFlag=false;
  constructor(private jobsService: JobsService,private statisticService:StatisticService){
    
  }

  ngOnInit(){
    this.setGenderStatistic();
    this.loadPosts();
   
  }
  

  labels =  ['JAdfgN', 'FEBfgdg', 'MAdfgdfgR', 'AdfgfdgPR','JgffdgfAN', 'FEfgdfgB', 'MgfdfgAR', 'AfgdfgPR', 'MAYdgfdg', 'JUfgfdgN', 'JUL', 'AUG', 'SEP', 'OCT', 'NOV', 'DEC','JAN', 'FEB', 'MAR', 'APR', 'MAY', 'JUN', 'JUL', 'AUG', 'SEP', 'OCT', 'NOV', 'DEC'];
  chartData = [
    {
      label: 'Nombre de candidats de cette Gouvernorat',
      data: [21, 56, 4, 31,21, 56, 4, 31, 45, 15, 57, 61, 9, 17, 24, 59,21, 56, 4, 31, 45, 15, 57, 61, 9, 17, 24, 59] 
    },
   
  ];

  loadPosts() {
   this.jobsService.getJobs().subscribe(postes => {
      this.postList = postes ;
      this.setJobStatistic(postes);
    });
  }

  setJobStatistic(postes){
      this.pieChartJobLabels=[];
      this.pieChartJobData=[];
      postes.forEach(p => {
         this.statisticService.getJobStatistic(p.id)
            .subscribe(nb=>{
              this.pieChartJobLabels.push(p.name);
              this.pieChartJobData.push(nb);
              this.readyJob++;
              if(this.readyJob==postes.length)this.readyJobFlag=true;
            })      
      });
  }


  setGenderStatistic(){
    this.pieChartGenderLabels=[];
    this.pieChartGenderData=[];
    this.genders.forEach(g=>{
     
      this.statisticService.getGenderStatistic(g)
      .subscribe(nb=>{
        this.pieChartGenderLabels.push(g);
        this.pieChartGenderData.push(nb);
           this.readyGender++;
           if(this.readyGender==2)this.readyGenderFlag=true;
         }) 
    })
       
}

}