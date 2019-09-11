import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {Message} from 'primeng/api';
import {UserService} from '../../Services/user.service';
import {MyErrorStateMatcher} from '../../Errors/my-error-state-matcher';


@Component({
  selector: 'app-change-password',
  templateUrl: './change-password.component.html',
  styleUrls: ['./change-password.component.scss']
})
export class ChangePasswordComponent implements OnInit {

  changePasswordFormGroup: FormGroup;
  messages: Message[] = [];
  submitted = false;
  matcher = new MyErrorStateMatcher();
  constructor( private formBuilder: FormBuilder,
               private userService: UserService) {
    this.changePasswordFormGroup = this.formBuilder.group({
      oldPassword: ['', Validators.required],
      password: ['', [Validators.required, Validators.minLength(6)]],
      confirmedPassword: ['', Validators.required]
    }, {
      validator: this.MustMatch('password', 'confirmedPassword')
    });
  }

  ngOnInit() {
  }

  // convenience getter for easy access to form fields
  get f() { return this.changePasswordFormGroup.controls; }

  updatePassword() {
    this.submitted = true;
    // stop here if form is invalid
    if (this.changePasswordFormGroup.invalid) {
      return;
    }

    const {password, oldPassword} = this.changePasswordFormGroup.value;
    const data = {
      password,
      oldPassword
    };
    console.log(data);
    this.userService.updatePassword(data).subscribe(user => {
      this.showSuccess('Votre mot de passe a été mis a jour', 'Mot De Passe Modifié' , 'success' );
    }, err => {
      this.showSuccess('Erreur ', err.error.message, 'error');
    });
  }

  showSuccess( title , message, type) {
    this.messages = [];
    this.messages.push({severity: type, summary: title, detail: message });
    setTimeout(() => {
      this.messages = [];
    }, 2000);
  }

  checkPasswords(group: FormGroup) { // here we have the 'passwords' group
    let pass = group.get('password').value;
    let confirmPass = group.get('confirmedPassword').value;

    return pass === confirmPass ? null : { notSame: true }
  }

  MustMatch(controlName: string, matchingControlName: string) {
    return (formGroup: FormGroup) => {
      const control = formGroup.controls[controlName];
      const matchingControl = formGroup.controls[matchingControlName];

      if (matchingControl.errors && !matchingControl.errors.mustMatch) {
        // return if another validator has already found an error on the matchingControl
        return;
      }

      // set error on matchingControl if validation fails
      if (control.value !== matchingControl.value) {
        matchingControl.setErrors({ mustMatch: true });
      } else {
        matchingControl.setErrors(null);
      }
    }
  }
}


