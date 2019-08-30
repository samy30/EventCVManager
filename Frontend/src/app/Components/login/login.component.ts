import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from  '@angular/forms';
import { Router } from  '@angular/router';
import  User  from  'src/app/Models/user';
import { AuthService } from  'src/app/Services/auth.service';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  constructor(private router: Router,private formBuilder:FormBuilder,private authService:AuthService) { }
  username: string;
  password: string;
  loginForm: FormGroup;
  isSubmitted  =  false;

  ngOnInit() {
    this.loginForm  =  this.formBuilder.group({
      username: ['', Validators.required],
      password: ['', Validators.required]
     });
  }

  isFieldInvalid(field: string) { // {6}
  return (
    (!this.loginForm.get(field).valid && this.loginForm.get(field).touched) ||
    (this.loginForm.get(field).untouched && this.isSubmitted)
  );
   }

   isFormValid(form:FormGroup):boolean{
    return( !this.isFieldInvalid("username")&&!this.isFieldInvalid("password")
             &&this.loginForm.get("username").valid &&this.loginForm.get("password").valid);
  }

  login(){
    this.isSubmitted=true;
    this.authService.login(this.loginForm.value).subscribe(
      res=>{
        console.log("logged in");
        console.log(res);
           this.authService.setToken(res.accessToken);
            this.router.navigate(['/Profil']);
          },
      err=>{
         console.log("not toekn");
      }
    )
    console.log(this.loginForm.value);

  }



















 /*
  login() : void {

    if(this.username == 'admin' && this.password == 'admin'){

          this.router.navigate(["user"]);

      }else {

         alert("Invalid credentials");

      }

  }*/

  }
