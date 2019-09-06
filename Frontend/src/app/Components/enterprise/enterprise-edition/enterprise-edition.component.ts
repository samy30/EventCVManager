import { Component ,Inject,OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from 'src/app/Services/auth.service';
import { Router } from '@angular/router';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { EnterpriseService } from 'src/app/Services/enterprise.service';

@Component({
  selector: 'app-enterprise-edition',
  templateUrl: './enterprise-edition.component.html',
  styleUrls: ['./enterprise-edition.component.scss']
})



export class EnterpriseEditionComponent implements OnInit {
  username: string;
  password: string;
  signupEnterpriseForm: FormGroup;
  isSubmitted  =  false;
  id;
  enterprise;
  constructor( private formBuilder: FormBuilder,
              private authService: AuthService,
              private router:Router,
               public dialogRef: MatDialogRef<EnterpriseEditionComponent>,
               @Inject(MAT_DIALOG_DATA) public data: any,
               private enterpriseService:EnterpriseService) 
    { 
       this.createEnterpriseForm();
       this.id=this.data.id;
     }

  ngOnInit() {
    this.loadEnterprise(this.id);
  }
  
  createEnterpriseForm(){
    this.signupEnterpriseForm = this.formBuilder.group({
      username: ['', Validators.required],
      password: ['', Validators.required],
      email: ['', Validators.required],
      name: ['', Validators.required],
      description: ['', Validators.required],
      activity: ['', Validators.required],
    });
  }

  loadEnterprise(id){
      this.authService.getUser(id)
         .subscribe(enterprise=>{
            this.enterprise=enterprise;
            this.displayData(enterprise);
         })
  }

  displayData(enterprise){
     this.signupEnterpriseForm.patchValue(enterprise);
  }

  isFieldInvalid(field: string) { // {6}
  return (
    (!this.signupEnterpriseForm.get(field).valid && this.signupEnterpriseForm.get(field).touched) ||
    (this.signupEnterpriseForm.get(field).untouched && this.isSubmitted)
  );
   }

   isFormValid(form: FormGroup): boolean {
     return( !this.isFieldInvalid('username') && !this.isFieldInvalid('password')
              && this.signupEnterpriseForm.get('username').valid && this.signupEnterpriseForm.get('password').valid);
   }

   updateEnterprise() {
    this.isSubmitted = true;
    this.enterpriseService.updateEnterprise(this.id,this.signupEnterpriseForm.value).subscribe(
      res => {
        this.dialogRef.close(true);
        console.log('updated');
       // this.router.navigate(['/Profile']);
      },
      err => {
        this.dialogRef.close(false);
        console.log('not registered');
      }
    );
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

}

