import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { JobsService } from 'src/app/Services/jobs.service';
import { MatSort, MatPaginator, MatTableDataSource } from '@angular/material';


export interface PeriodicElement {
  name: string;
  id: number;
}

@Component({
  selector: 'app-job-listing',
  templateUrl: './job-listing.component.html',
  styleUrls: ['./job-listing.component.scss']
})

export class JobListingComponent implements OnInit  {

  @ViewChild(MatSort, {static: true}) sort: MatSort;
  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;
  jobOffers: PeriodicElement[];
  displayedColumns: string[] = ['id','name','actions'];
  dataSource ;

  constructor(private jobService:JobsService) { }

  @ViewChild ("name",{static: false})
   name: ElementRef;
   flag=true;

   jobs:any[]=[];

   ngOnInit() {
      this.loadPosts();
  }

  addJob(){
     var jobName=this.name.nativeElement.value;
     console.log("jobName");
     console.log(jobName);
     if(jobName){
         this.jobService.postJob({name:jobName})
            .subscribe(job=>{
                this.name.nativeElement.value=null;;
                 this.loadPosts();
            })
     }

  }

  loadPosts() {
    this.jobService.getJobs().subscribe(postes => {
      this.jobs = postes ;
      this.reloadDataSource(this.jobs);
    });
  }

  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  reloadDataSource(data) {
    this.dataSource = new MatTableDataSource(data);
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;

  }

  deleteJob(id){
    this.jobService.deleteJob(id)
      .subscribe(job=>{
          console.log("deleted Job");
          console.log(job);
          this.loadPosts();
      })
  }


}
