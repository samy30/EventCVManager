import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {Message} from 'primeng/api';
import {UserService} from '../../Services/user.service';

@Component({
  selector: 'app-change-password',
  templateUrl: './change-password.component.html',
  styleUrls: ['./change-password.component.scss']
})
export class ChangePasswordComponent implements OnInit {

  changePasswordFormGroup: FormGroup;
  msgs: Message[] = [];
  constructor( private formBuilder: FormBuilder,
               private userService: UserService) {
    this.changePasswordFormGroup = this.formBuilder.group({
      oldPassword: ['', Validators.required],
      password: ['', Validators.required],
      confirmedPassword: ['', Validators.required]
    }, {validator: this.checkPasswords });
  }

  ngOnInit() {
  }

  updatePassword() {
    const {password, oldPassword, confirmedPassword} = this.changePasswordFormGroup.value;
    const data = {
      password,
      oldPassword
    };
    console.log(data);
    this.userService.updatePassword(data).subscribe(user => {
      this.showSuccess('Votre mot de passe a été mis a jour', 'Mot De Passe Modifie' , 'success' );
    }, err => {
      this.showSuccess('Erreur ', err.error.message, 'error');
    });
  }

  showSuccess( title , message, type) {
    this.msgs = [];
    this.msgs.push({severity: type, summary: title, detail: message });
    setTimeout(() => {
      this.msgs = [];
    }, 2000);
  }

  checkPasswords(group: FormGroup) { // here we have the 'passwords' group
    const password = group.get('password').value;
    const confirmedPassword = group.get('confirmedPassword').value;

    return password === confirmedPassword ? null : { notSame: true };
  }

}
