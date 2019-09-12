import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from 'src/app/Services/auth.service';
import { Router } from '@angular/router';
import { MatDialogRef } from '@angular/material';

@Component({
  selector: 'app-enterprise-creation',
  templateUrl: './enterprise-creation.component.html',
  styleUrls: ['./enterprise-creation.component.scss']
})
export class EnterpriseCreationComponent implements OnInit {
  username: string;
  password: string;
  signupEnterpriseForm: FormGroup;
  isSubmitted  =  false;
  constructor( private formBuilder: FormBuilder,
              private authService: AuthService,
              private router:Router,
               public dialogRef: MatDialogRef<EnterpriseCreationComponent>) 
    { 
      this.createEnterpriseForm();
  
     }

  ngOnInit() {
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

   signupEnterprise() {
    this.isSubmitted = true;
    this.authService.registerEnterprise(this.signupEnterpriseForm.value).subscribe(
      res => {
        console.log('registered');
        this.dialogRef.close(res);
       // this.router.navigate(['/Profile']);
      },
      err => {
        console.log('not registered');
      }
    );
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

}
