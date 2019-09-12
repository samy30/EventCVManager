import { Component, OnInit ,Inject, Input} from '@angular/core';
import { FormBuilder, Validators, FormGroup, FormArray, FormControl } from '@angular/forms';
import {CVService} from '../../Services/cv.service';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import _ from "lodash"
import { JobDemandeService } from 'src/app/Services/job-demande.service';
import { InsertCVComponent } from 'src/app/Pages/insert-cv/insert-cv.component';
import { AuthService } from 'src/app/Services/auth.service';
@Component({
  selector: 'app-job-offer-display',
  templateUrl: './job-offer-display.component.html',
  styleUrls: ['./job-offer-display.component.scss']
})
export class JobOfferDisplayComponent implements OnInit {

  constructor( private cvService: CVService,
    private formBuilder: FormBuilder,
    public dialogRef: MatDialogRef<JobOfferDisplayComponent>,
    public dialog: MatDialog,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private jobDemandeService:JobDemandeService,
    private authService: AuthService,) { }
    isToken=false;
    offer;
    createdCV;
    jobDemande;
    currentUser;
  ngOnInit() {
    this.loadLoggedUser();
    this.isToken=this.data.isToken;
    this.offer=this.data.offer;
    console.log("isToken");
    console.log(this.data.isToken);
  }



loadLoggedUser(){
  this.currentUser = JSON.parse(localStorage.getItem('currentUser'));
}

close(){
  this.dialogRef.close(false);
 }

getJob(offer) {
  const dialogRef = this.dialog.open(InsertCVComponent, {
    width: '80%',
    height: '90%',
    data:offer
  });
  
 
  dialogRef.afterClosed().subscribe(result => {
      if(result){
        this.isToken=true;
        this.createdCV = result;
        console.log('The dialog was closed');
        console.log(result);
        // save created CV in database
        this.cvService.postCV(this.createdCV).subscribe(cv => {
             this.createdCV = cv;
             console.log('cvCreated');
             // create Job-demande
             console.log('offre selected');
             console.log(offer);
             this.jobDemande = {
                   cv: {id:this.createdCV.id},
                   jobOffer: {id:offer.id},
                   sender:{id:this.currentUser.id},
                   enterprise:{id:offer.enterprise.id},
                   status:'PENDING',
                   confirmedByUser:false
              };
              console.log('job demande');
              console.log(this.jobDemande);
              // post job-demande
             this.jobDemandeService.postJobDemande(this.jobDemande)
                   .subscribe(demande => {
                     this.jobDemande = demande;
                    
                   });
             });
         }
  });

 }
}
