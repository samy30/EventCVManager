import { Component, OnInit,ViewChild,ElementRef } from '@angular/core';
import { JobsService } from 'src/app/Services/jobs.service';
import { StatisticService } from 'src/app/Services/statistic.service';
import { UserService } from 'src/app/Services/user.service';

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

  @ViewChild ("age",{static: false})
  age: ElementRef;

  constructor(private jobsService: JobsService,
    private statisticService:StatisticService,
    private userService:UserService){
    
  }

  ngOnInit(){
    this.setGenderStatistic();
    this.loadPosts();
    this.loadUsers();

  }
  
  searchByAge(){
    var age=this.age.nativeElement.value;
    console.log("age entré");
    console.log(age);
    if(age && age >15 ){
        this.setAgeStatistic(age);
    }

 }

 ageLabels =  ['moin que','egal a','plus que'];
 chartAgeData = [
  {
    label: 'Nombre de candidats selon age',
     data: [] 
  },
 ];

  

 setAgeStatistic(age:number){
  this.ageLabels.forEach(label=>{
    var count=0;
    console.log("users");
    console.log(age);
    console.log(this.users);
    this.users.forEach(user=>{
         //if(user.age&&user.town===town)count++;
         if(label==='moin que'&& user.age!=0 && user.age<age)count++;
         if(label==='egal a'&& user.age!=0 && user.age==age)count++;
         if(label==='plus que'&& user.age!=0 && user.age>age)count++;
    })
    this.chartAgeData[0].data.push(count);
   })
 }

   

  labels =  ['Ariana', 'Baja', 'Ben Arous', 'Bizerte','Gabes', 'Gafsa', 'Jendouba', 'Kairouan', 'Kasserine', 'Kébili',
             'Mahdia', 'Manouba', 'Medenine', 'Monastir', 'Nabeul', 'Sfax','Sidi Bouzid', 'Siliana', 'Sousse', 'Tataouine',
              'Tozeur', 'Tunis', 'Zaghouan'];
  chartData = [
    {
      label: 'Nombre de candidats de cette Gouvernorat',
      data: [] 
    },
  ];

  loadUsers(){
      this.userService.getUsers()
         .subscribe(users=>{
              this.users=users;
              this.setTownStatistic(users);
         })
  }

    setTownStatistic(users){
        this.labels.forEach(town=>{
             var count=0;
             this.users.forEach(user=>{
                  if(user.town&&user.town===town)count++;
                
             })
             this.chartData[0].data.push(count);
        })
    }

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