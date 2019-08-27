import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from  '@angular/forms';
import { Router } from  '@angular/router';
import  User  from  'src/app/Models/user';
import { AuthService } from  'src/app/Services/auth.service';
@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignupComponent implements OnInit {

  constructor(private router: Router,private formBuilder:FormBuilder,private authService:AuthService) { }
  username: string;
  password: string;
  signupForm: FormGroup;
  isSubmitted  =  false;

  ngOnInit() {
    this.signupForm  =  this.formBuilder.group({
      username: ['', Validators.required],
      password: ['', Validators.required]
     });
  }

  isFieldInvalid(field: string) { // {6}
  return (
    (!this.signupForm.get(field).valid && this.signupForm.get(field).touched) ||
    (this.signupForm.get(field).untouched && this.isSubmitted)
  );
   }

   isFormValid(form:FormGroup):boolean{
     return( !this.isFieldInvalid("username")&&!this.isFieldInvalid("password")
              &&this.signupForm.get("username").valid &&this.signupForm.get("password").valid);
   }


  signup(){
    this.isSubmitted=true;
    this.authService.register(this.signupForm.value).subscribe(
      res=>{
        console.log("logged in");
        console.log(res);
           this.authService.setToken(res.token);
            this.router.navigate(['/Profil']);
          },
      err=>{
         console.log("not toekn");
      }
    )
    console.log(this.signupForm.value);
  
  }
 
 
 
 


  }
