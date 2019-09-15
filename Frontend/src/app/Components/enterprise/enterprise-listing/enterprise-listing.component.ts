import { Component, OnInit, ViewChild } from '@angular/core';
import { MatSort, MatPaginator, MatDialog, MatTableDataSource } from '@angular/material';
import { EnterpriseService } from 'src/app/Services/enterprise.service';
import { Message } from 'primeng/components/common/message';
import { EnterpriseCreationComponent } from '../enterprise-creation/enterprise-creation.component';
import { EnterpriseEditionComponent } from '../enterprise-edition/enterprise-edition.component';

export interface PeriodicElement {
  name: string;
  id: number;
}

@Component({
  selector: 'app-enterprise-listing',
  templateUrl: './enterprise-listing.component.html',
  styleUrls: ['./enterprise-listing.component.scss']
})
export class EnterpriseListingComponent implements OnInit {
  @ViewChild(MatSort, {static: true}) sort: MatSort;
  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;
  enterprises: PeriodicElement[];
  msgs: Message[] = [];
  displayedColumns: string[] = ['id', 'name','email','actions'];
  dataSource ;
  constructor(private enterpriseService:EnterpriseService,
                  public dialog: MatDialog) { }

  ngOnInit() {
    this.loadEnterprises();

  }

  loadEnterprises(){
     this.enterpriseService.getEnterprises()
      .subscribe(enterprises=>{
         this.enterprises=enterprises;
         console.log("enterprises");
         console.log(enterprises);
         this.reloadDataSource(enterprises);
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

  addEnterprise()  {
    const dialogRef = this.dialog.open(EnterpriseCreationComponent, {
      width: '700px',
    });
    dialogRef.afterClosed().subscribe( result => {
        if ( result) {
        this.loadEnterprises();
         this.showSuccess( 'Entreprise ajoutée', 'Entreprise a été ajoutée avec succé' );
         }
     });
  }

  deleteEnterprise(id){
     this.enterpriseService.deleteEnterprise(id)
         .subscribe(res=>{
            this.loadEnterprises();
             console.log("enterprise deleted");
             this.loadEnterprises();
         })
  }

 updateEnterprise(id){
  const dialogRef = this.dialog.open(EnterpriseEditionComponent, {
    width: '700px',
    data:{id:id}
  });
  dialogRef.afterClosed().subscribe(async result => {
      if ( result) {
          this.loadEnterprises();
          this.showSuccess( 'Entreprise ajoutée', 'Entreprise a été ajoutée avec success' );
       }
   });
 }

/*
  openDialog(id): void {
    const dialogRef = this.dialog.open(ConfirmationDialogComponent, {
      width: '350px',
      data: 'Êtes vous sûr de vouloir supprimer ce Produit ?'
    });
    dialogRef.afterClosed().subscribe(result => {
    if (result) {
      this.deleteProduct(id);
      this.showSuccess('Client Effacé', 'Client avec id : ' + id + ' a été supprimé' ); 
     }
  });
  }*/

}
