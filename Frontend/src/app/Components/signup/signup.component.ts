import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService} from 'src/app/Services/auth.service';
@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignupComponent implements OnInit {

  constructor(private router: Router, private formBuilder: FormBuilder, private authService: AuthService) {
  }

  username: string;
  password: string;
  chosenSignupForm = 0;
  signupForm: FormGroup;
  isSubmitted = false;
  captchaResponse: string;

  ngOnInit() {
    this.signupForm = this.formBuilder.group({
      username: ['', Validators.required],
      password: ['', Validators.required],
      email: ['', Validators.required],
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      gender: ['', Validators.required],
      age: [0, Validators.required]
    });
  }

  chooseForm(index: number) {
    this.chosenSignupForm = index;
  }

  isFieldInvalid(field: string) { // {6}
    return (
      (!this.signupForm.get(field).valid && this.signupForm.get(field).touched) ||
      (this.signupForm.get(field).untouched && this.isSubmitted)
    );
  }

  isFormValid(form: FormGroup): boolean {
    return (!this.isFieldInvalid('username') && !this.isFieldInvalid('password')
      && this.signupForm.get('username').valid && this.signupForm.get('password').valid);
  }


  signup() {
    this.isSubmitted = true;
    this.authService.registerJobSeeker(this.signupForm.value, this.captchaResponse).subscribe(
      res => {
        console.log('registered');
        console.log(res);
        this.router.navigate(['/Profile']);
      },
      err => {
        console.log('not token');
      }
    );
  }

  resolved(captchaResponse: string) {
    console.log(`Resolved captcha with response ${captchaResponse}:`);
    this.captchaResponse = captchaResponse;
  }
}
