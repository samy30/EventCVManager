import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/Services/auth.service';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  constructor(private router: Router, private formBuilder: FormBuilder, private authService: AuthService) { }
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

  isFormValid(): boolean {
    return( !this.isFieldInvalid('username') && !this.isFieldInvalid('password')
      && this.loginForm.get('username').valid && this.loginForm.get('password').valid);
  }

  login() {
    this.isSubmitted = true;
    this.authService.login(this.loginForm.value).subscribe(
      res => {
        console.log('logged in');
        console.log(res);
        this.authService.setToken(res.accessToken);
        this.authService.getCurrentUser()
          .subscribe(user => {
            this.authService.setCurrentUser(user);
            // inform sidebar with new authentication
            this.authService.informUserAuthentication(1);
            this.router.navigate(['/JobSearch']).then(r => console.log(r));
          });
      },
      err => {
        console.log(err + 'not token');
      }
    );
    console.log(this.loginForm.value);

  }
}
