import { Component, OnInit, ViewChild } from '@angular/core';
import { MatSort, MatPaginator, MatDialog, MatTableDataSource } from '@angular/material';
import { EnterpriseService } from 'src/app/Services/enterprise.service';
import { Message } from 'primeng/components/common/message';
import { OfferCreationComponent } from '../offer-creation/offer-creation.component';
import { JobOfferService } from 'src/app/Services/job-offer.service';
import { JobOfferEditionComponent } from '../job-offer-edition/job-offer-edition.component';


export interface PeriodicElement {
  name: string;
  id: number;
}

@Component({
  selector: 'app-job-offer-listing',
  templateUrl: './job-offer-listing.component.html',
  styleUrls: ['./job-offer-listing.component.scss']
})

export class JobOfferListingComponent implements OnInit {
  @ViewChild(MatSort, {static: true}) sort: MatSort;
  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;
  jobOffers: PeriodicElement[];
  msgs: Message[] = [];
  displayedColumns: string[] = ['id','enterprise', 'job','town','actions'];
  dataSource ;
  constructor(private jobOfferService:JobOfferService,
                  public dialog: MatDialog) { }

  ngOnInit() {
    this.loadJobOffers();

  }

  loadJobOffers(){
     this.jobOfferService.getJobOffers()
      .subscribe(jobOffers=>{
         this.jobOffers=jobOffers;
         console.log("jobOffers");
         console.log(jobOffers);
         this.reloadDataSource(jobOffers);
      })
  }

  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  reloadDataSource(data) {
    this.dataSource = new MatTableDataSource(data);
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;

  }


  showSuccess( title , message) {
    this.msgs = [];
    this.msgs.push({severity: 'success', summary: title, detail: message });
    setTimeout(() => {
    this.msgs = [];
      }, 2000);
  }

  addJobOffer()  {
    const dialogRef = this.dialog.open(OfferCreationComponent, {
      width: '800px',
    });
    dialogRef.afterClosed().subscribe(async result => {
        if ( result) {
        this.loadJobOffers();
         this.showSuccess( 'jobOffer ajoutée', 'jobOffer a été ajoutée avec success' );
         }
     });
  }

 deleteJobOffer(id){
   console.log("attempt to delete")
    this.jobOfferService.deleteOffer(id)
       .subscribe(res=>{
           console.log("jobOffer deleted");
           console.log(res);
       })
 }

 updateOffer(id)  {
  const dialogRef = this.dialog.open(JobOfferEditionComponent, {
    width: '800px',
    data:{id:id}
  });
  dialogRef.afterClosed().subscribe(async result => {
      if ( result) {
      this.loadJobOffers();
       this.showSuccess( 'jobOffer ajoutée', 'jobOffer a été ajoutée avec success' );
       }
   });
}

}